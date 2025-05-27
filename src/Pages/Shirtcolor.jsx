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

function ShirtColorSelector() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [userId, setUserId] = useState(null);

  // Example shirt colors (feel free to update)
  const shirtColors = [
    '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC',
    '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4', '#FFECB3',
    '#FFE0B2', '#FFCCBC', '#D7CCC8', '#CFD8DC'
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
    console.log("Selected Shirt Color:", colorCode);
    setSelectedColor(colorCode);
  };

  const handleNext = async () => {
    if (!selectedColor) {
      alert('Please select a shirt color before continuing.');
      return;
    }

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    console.log("Storing in Supabase -> user_id:", userId, " | shirtcolorcode:", selectedColor);

    const { error } = await supabase
      .from('user_profiles')
      .upsert({ id: userId, shirtcolorcode: selectedColor }, { onConflict: ['id'] });

    if (error) {
      console.error('Failed to save to Supabase:', error.message);
      alert('Failed to save shirt color.');
    } else {
      console.log('Shirt color saved successfully!');
      navigate('/outfitselector');  // navigate to next page
    }
  };

  return (
    <div style={gradientBackground}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-purple-600 font-bold text-2xl mb-4">TWEAK</h1>
        <h2 className="font-semibold mb-6">Select Your Shirt Color</h2>
        <div className="grid grid-cols-7 gap-3 justify-center mb-6">
          {shirtColors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleSelectColor(color)}
              style={{
                backgroundColor: color,
                border: selectedColor === color ? '2px solid #9333ea' : '1px solid #ccc'
              }}
              className="w-8 h-8 rounded-full hover:border-purple-500 transition-colors"
              aria-label={`Select shirt color ${index + 1}`}
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

export default ShirtColorSelector;
