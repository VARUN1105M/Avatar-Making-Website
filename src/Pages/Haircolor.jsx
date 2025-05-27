import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate
import { supabase } from '../../supabase/Supabase'; // Update the path if needed

const gradientBackground = {
  background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
};

function HairToneSelector() {
  const navigate = useNavigate(); // ✅ Hook to handle navigation
  const [selectedTone, setSelectedTone] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const hairTones = [
    '#2C1F4A', '#4A2A6B', '#7D4C9E', '#9F4C9D', '#D0579E', '#F67B6F',
    '#FC9C82', '#E8B38B', '#D68C68', '#C77449', '#B85E2F', '#8C4421',
    '#5E3420', '#3A1E13', '#271312', '#18100C'
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error('Error fetching user:', error?.message || 'No user logged in');
        alert('User not logged in.');
        return;
      }

      setUserId(user.id);
    };

    fetchUser();
  }, []);

  const handleSelectTone = (colorCode) => {
    console.log(`🎨 Selected hair tone: ${colorCode}`);
    setSelectedTone(colorCode);
  };

  const handleSubmit = async () => {
    if (!selectedTone) {
      alert('Please select a hair tone before submitting.');
      return;
    }

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    setLoading(true);

    console.log(`Storing in Supabase -> user_id: ${userId}  | haircolorcode: ${selectedTone}`);

    const { error } = await supabase
      .from('user_profiles')
      .upsert(
        { id: userId, haircolorcode: selectedTone },
        { onConflict: ['id'] }
      );

    setLoading(false);

    if (error) {
      console.error('❌ Failed to submit hair tone:', error.message);
      alert('Failed to submit hair tone.');
    } else {
      console.log('✅ Hair tone submitted successfully!');
      alert('Hair tone saved successfully!');
      navigate('/outfitselector'); // ✅ Navigate after success
    }
  };

  return (
    <div style={gradientBackground}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-purple-600 font-bold text-2xl mb-4">TWEAK</h1>
        <h2 className="font-semibold mb-6">Select Your Hair Tone</h2>
        <div className="grid grid-cols-7 gap-3 justify-center mb-6">
          {hairTones.map((color, index) => (
            <button
              key={index}
              onClick={() => handleSelectTone(color)}
              style={{
                backgroundColor: color,
                border: selectedTone === color ? '2px solid #9333ea' : '1px solid #ccc'
              }}
              className="w-8 h-8 rounded-full hover:border-purple-500 transition-colors"
              aria-label={`Select hair tone ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-purple-600 text-white rounded-full px-12 py-2 hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default HairToneSelector;
