import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/Supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert('Login failed: ' + error.message);
      return;
    }

    if (data.user) {
      try {
        // Try to fetch profile
        let { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('age, gender')
          .eq('id', data.user.id)
          .single();

        // If profile doesn't exist, create it with minimal info
        if (profileError) {
          if (
            profileError.code === 'PGRST116' ||
            profileError.message.includes('No rows found')
          ) {
            const { error: insertError } = await supabase.from('profiles').insert({
              id: data.user.id,
              // Optionally, add default values here
            });

            if (insertError) {
              throw insertError;
            }

            // Fetch profile again after insert
            const { data: newProfile, error: newProfileError } = await supabase
              .from('profiles')
              .select('age, gender')
              .eq('id', data.user.id)
              .single();

            if (newProfileError) throw newProfileError;

            profile = newProfile;
          } else {
            throw profileError;
          }
        }

        // Redirect based on profile completeness
        if (profile.age && profile.gender) {
          navigate('/skintoneselector');
        } else {
          navigate('/userdetails');
        }
      } catch (err) {
        alert('Unexpected error: ' + err.message);
        navigate('/userdetails');
      }
    }

    setLoading(false);
  };

  const gradientBackground = {
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={gradientBackground}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
