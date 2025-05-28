import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/Supabase';

const Navigation = () => {
  const [session, setSession] = useState(null);
  const [customizingOpen, setCustomizingOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) setSession(data.session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔴 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCustomizingOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate('/login');
  };

  const handleNavigate = (path) => {
    setCustomizingOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-5xl bg-white/60 backdrop-blur-md rounded-2xl shadow-xl flex justify-between items-center py-4 px-8 z-50 space-x-4">
      <Link to="/" className="text-black font-bold hover:text-purple-300 transition mx-2">Home</Link>

      {session ? (
        <button onClick={handleLogout} className="text-black font-bold hover:text-purple-300 transition mx-2">
          Logout
        </button>
      ) : (
        <Link to="/login" className="text-black font-bold hover:text-purple-300 transition mx-2">
          Login/Signup
        </Link>
      )}

      <Link to="/outfitselector" className="text-black font-bold hover:text-purple-300 transition mx-2">
        Avathar
      </Link>

      {/* Customizing Dropdown */}
      <div className="relative mx-2" ref={dropdownRef}>
        <button
          onClick={() => setCustomizingOpen(!customizingOpen)}
          className="text-black font-bold hover:text-purple-300 transition focus:outline-none"
        >
          Customizing
        </button>
        {customizingOpen && (
          <div className="absolute flex flex-col bg-white/90 backdrop-blur-sm shadow-lg rounded-md mt-2 py-3 px-5 space-y-2 z-50 min-w-[160px]">
            <button onClick={() => handleNavigate('/haircolorselector')} className="text-left text-black hover:text-purple-400 transition whitespace-nowrap">
              Hair Color
            </button>
            <button onClick={() => handleNavigate('/skintoneselector')} className="text-left text-black hover:text-purple-400 transition whitespace-nowrap">
              Skin Tone
            </button>
            <button onClick={() => handleNavigate('/shirtcolorselector')} className="text-left text-black hover:text-purple-400 transition whitespace-nowrap">
              Shirt Color
            </button>
            <button onClick={() => handleNavigate('/pantcolorselector')} className="text-left text-black hover:text-purple-400 transition whitespace-nowrap">
              Pant Color
            </button>
            <button onClick={() => handleNavigate('/shoecolorselector')} className="text-left text-black hover:text-purple-400 transition whitespace-nowrap">
              Shoe Color
            </button>
          </div>
        )}
      </div>

      <Link to="/about" className="text-black font-bold hover:text-purple-300 transition mx-2">
        About
      </Link>
    </nav>
  );
};

export default Navigation;
