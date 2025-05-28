import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/Supabase'; // Adjust path if needed

import avatharright from '../assets/react.svg';
import avatharleft from '../assets/react.svg';

export default function Home() {
  const navigate = useNavigate();
  const characterSectionRef = useRef(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleStartDesigningClick = () => {
    characterSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePersonalizeClick = () => {
    if (session) {
      navigate('/outfitselector');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-12 px-6 py-10 space-y-12">
      {/* Hero Section */}
      <section className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-8 w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-2">Tweak — Design Your Unique Avatar</h1>
        <p className="text-md mb-4 text-purple-800">
          Bring your digital self to life. Customize your avatar's appearance from head to toe and
          experiment with endless styles, all in real time.
        </p>
        <button
          onClick={handleStartDesigningClick}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Start Designing Now
        </button>
      </section>

      {/* Create Avatar Section */}
      <section className="flex flex-col md:flex-row items-center bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-8 w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-8">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">Create Your Avatar and Choose Your Fashion</h2>
          <p className="text-sm text-purple-800 mb-4">
            Dive into the creative process by building your avatar from scratch. Select your skin tone,
            pick the perfect hairstyle, and choose colors for your shirt, pants, and shoes. Mix and match
            styles and colors to see what looks best on you. Express yourself without limits — fashion is
            all about personal flair!
          </p>
          <button 
          onClick={handleStartDesigningClick}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition">
            Customize Your Look
          </button>
        </div>
        <div className="w-40 h-40 bg-white/50 border border-purple-300 rounded-lg flex items-center justify-center text-sm italic text-pink-600">
          <img src={avatharright} alt="avatar right" />
        </div>
      </section>

      {/* Turn Into Character Section */}
      <section
        ref={characterSectionRef}
        className="flex flex-col-reverse md:flex-row items-center bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-8 w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-8"
      >
        <div className="w-40 h-40 bg-white/50 border border-purple-300 rounded-lg flex items-center justify-center text-sm italic text-pink-600">
          <img src={avatharleft} alt="avatar left" />
        </div>
        <div className="flex-1 text-right md:text-left">
          <h2 className="text-xl font-bold mb-2">Turn Yourself Into a Character</h2>
          <p className="text-sm text-purple-800 mb-4">
            Our tool helps you create a digital character that truly represents you. Adjust facial features,
            hairstyle, and clothing colors to create a unique digital persona. Whether for gaming, social media,
            or just fun, your personalized avatar is ready to step into any virtual world.
          </p>
          <button
            onClick={handlePersonalizeClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition"
          >
            Personalize Now
          </button>
        </div>
      </section>

      {/* How Tweak Helps Section */}
      <section className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-8 w-full max-w-4xl text-center space-y-4">
        <h2 className="text-xl font-bold">How Tweak Helps You</h2>
        <div className="text-sm text-purple-800 space-y-2">
          <p>
            <strong>Save Time & Experiment Freely:</strong> Instead of guessing what style fits you best,
            instantly preview your look with different skin tones, hairstyles, and outfit colors.
            No wasted time or money on trial-and-error.
          </p>
          <p>
            <strong>Express Your Unique Style:</strong> With endless customization options, Tweak lets you
            express your creativity and personality in every detail of your avatar’s design.
          </p>
          <p>
            <strong>Perfect for Gaming, Social Media, and More:</strong> Create a character you love using Tweak,
            and use it across platforms or simply enjoy the fun of styling.
          </p>
          <p>
            <strong>Easy and Fun Interface:</strong> Our user-friendly platform makes customization enjoyable and
            straightforward — no complicated software needed.
          </p>
        </div>
      </section>
    </div>
  );
}
