import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/Supabase'; // update path if needed

const gradientBackground = {
  background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
};

function PantColorSelector() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [userId, setUserId] = useState(null);

  // Example pant colors
  const pantColors = [
    '#4E342E', '#6D4C41', '#8D6E63', '#A1887F', '#BCAAA4', '#D7CCC8',
    '#E0E0E0', '#9E9E9E', '#616161', '#424242', '#212121', '#37474F',
    '#455A64', '#607D8B', '#90A4AE', '#B0BEC5', '#CFD8DC', '#ECEFF1'
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
      } else if (user) {
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  const handleSelectColor = (colorCode) => {
    console.log("Selected Pant Color:", colorCode);
    setSelectedColor(colorCode);
  };

  const handleNext = async () => {
    if (!selectedColor) {
      alert('Please select a pant color before continuing.');
      return;
    }

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    console.log("Storing in Supabase -> user_id:", userId, " | pantcolorcode:", selectedColor);

    const { error } = await supabase
      .from('user_profiles')
      .upsert({ id: userId, pantcolorcode: selectedColor }, { onConflict: ['id'] });

    if (error) {
      console.error('Failed to save to Supabase:', error.message);
      alert('Failed to save pant color.');
    } else {
      console.log('Pant color saved successfully!');
      navigate('/outfitselector');  // navigate to next page
    }
  };

  return (
    <div style={gradientBackground}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-purple-600 font-bold text-2xl mb-4">TWEAK</h1>
        <h2 className="font-semibold mb-6">Select Your Pant Color</h2>
        <div className="grid grid-cols-7 gap-3 justify-center mb-6">
          {pantColors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleSelectColor(color)}
              style={{
                backgroundColor: color,
                border: selectedColor === color ? '2px solid #9333ea' : '1px solid #ccc'
              }}
              className="w-8 h-8 rounded-full hover:border-purple-500 transition-colors"
              aria-label={`Select pant color ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="bg-purple-600 text-white rounded-full px-12 py-2 hover:bg-purple-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PantColorSelector;
