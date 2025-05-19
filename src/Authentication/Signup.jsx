import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/Supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // On mount, check if user just logged in via OAuth redirect
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

          const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('id', userId)
            .maybeSingle();

          if (userError) {
            console.error('Error fetching user from users table:', userError.message);
            return;
          }

          if (!existingUser) {
            console.log('User not found in users table, inserting...');
            const { error: insertError } = await supabase.from('users').insert({
              id: userId,
              email: userEmail,
              user_type: 'user', // default user_type
            });

            if (insertError) {
              console.error('Error inserting user into users table:', insertError);
              return;
            } else {
              console.log('User inserted successfully');
            }
          } else {
            console.log('User already exists in users table');
          }
        }
      } catch (e) {
        console.error('Unexpected error in checkSessionAndLog:', e);
      }
    }

    checkSessionAndLog();
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const error = params.get('error');
    const errorCode = params.get('error_code');
    if (error === 'access_denied' && errorCode === 'otp_expired') {
      setErrorMsg('Your magic link has expired. Please try logging in again.');
    }
  }, []);

  async function signInWithGoogle() {
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/userdetails', // your redirect URL
      },
    });

    if (error) {
      setErrorMsg('Google sign-in failed: ' + error.message);
      setLoading(false);
    } else {
      setInfoMsg('Redirecting to Google for authentication...');
      // User is redirected, no need to unset loading here
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
        <h2 className="text-2xl font-bold mb-6">Sign Up / Login with Google</h2>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        {infoMsg && <p style={{ color: 'green' }}>{infoMsg}</p>}

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className={`w-full py-3 rounded-full text-white text-lg font-semibold transition-colors ${
            loading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        <p className="mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
