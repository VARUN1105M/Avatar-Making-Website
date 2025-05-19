import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/60 backdrop-blur-md rounded-xl shadow-lg flex justify-around py-3 px-6 z-50">
      <Link
        to="/"
        className="text-black font-bold hover:text-purple-300 transition"
      >
        Home
      </Link>
      <Link
        to="/login"
        className="text-Black font-bold hover:text-purple-300 transition"
      >
        Login/signup
      </Link>
    </nav>
  );
};

export default Navigation;
