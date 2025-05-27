import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/Supabase';

const Navigation = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) setSession(data.session);
    };

    getSession();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate('/login');
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white/60 backdrop-blur-md rounded-2xl shadow-xl flex justify-between items-center py-4 px-8 z-50 space-x-4">
      <Link
        to="/"
        className="text-black font-bold hover:text-purple-300 transition mx-2"
      >
        Home
      </Link>
      {session ? (
        <button
          onClick={handleLogout}
          className="text-black font-bold hover:text-purple-300 transition mx-2"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="text-black font-bold hover:text-purple-300 transition mx-2"
        >
          Login/Signup
        </Link>
      )}
      <Link
        to="/outfitselector"
        className="text-black font-bold hover:text-purple-300 transition mx-2"
      >
        Avathar
      </Link>
      <Link
        to="/haircolorselector"
        className="text-black font-bold hover:text-purple-300 transition mx-2"
      >
        Hair Color
      </Link>
      <Link
        to="/skintoneselector"
        className="text-black font-bold hover:text-purple-300 transition mx-2"
      >
        Skin Tone
      </Link>
      <Link
        to="/shirtcolorselector"
        className="text-black font-bold hover:text-purple-300 transition mx-2"
      >
        shirt color
      </Link>
      <Link
        to="/pantcolorselector"
        className="text-black font-bold hover:text-purple-300 transition mx-2"
      >
        Pant color
      </Link>
      <Link 
        to="/shoecolorselector"
        className="text-black font-bold hover:text-purple-300 transition mx-2"
      >
        Shoe color
      </Link>
    </nav>
  );
};

export default Navigation;
