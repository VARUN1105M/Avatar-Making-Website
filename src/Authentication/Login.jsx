import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/Supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle session and logging to login_audit
  useEffect(() => {
    async function checkSessionAndLog() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error.message);
          return;
        }

        if (session?.user) {
          const userId = session.user.id;
          const userEmail = session.user.email;

          console.log('Session userId:', userId);
          console.log('Session userEmail:', userEmail);

          // Insert audit log
          const { error: auditError } = await supabase.from('login_audit').insert({
            user_id: userId,
            email: userEmail,
          });

          if (auditError) {
            console.error('Failed to insert login audit:', auditError.message);
          } else {
            console.log('Login audit inserted');
          }

          // Redirect to home or dashboard
          navigate('/home');
        }
      } catch (e) {
        console.error('Unexpected error in checkSessionAndLog:', e);
      }
    }

    checkSessionAndLog();
  }, [navigate]);

  async function signInWithGoogle() {
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/login', // this should be the URL of this login page
      },
    });

    if (error) {
      setErrorMsg('Google sign-in failed: ' + error.message);
      setLoading(false);
    } else {
      setInfoMsg('Redirecting to Google for authentication...');
      // No need to unset loading – redirect will occur
    }
  }

 return (
    <div
      style={{
        background:
          'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6">Login with Google</h2>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        {infoMsg && <p style={{ color: 'green' }}>{infoMsg}</p>}

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className={`w-full py-3 rounded-full text-white text-lg font-semibold transition-colors ${
            loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        <p className="mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
