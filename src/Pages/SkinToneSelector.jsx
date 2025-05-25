import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/Supabase'; // update path if needed

function SkinToneSelector() {
  const navigate = useNavigate();
  const [selectedTone, setSelectedTone] = useState(null);
  const [userId, setUserId] = useState(null);

  const skinTones = [
    '#F9E4E4', '#F9D5D3', '#FCE8E8', '#FBE3D1', '#F6C28B', '#D2964A', '#A96923',
    '#7D4810', '#5B2F05', '#381D01', '#E4D2BD', '#D4BFAA', '#B6967E',
    '#9C754D', '#7F5D39', '#A97C50', '#7F5B31', '#5C3D19', '#3F2710', '#291B09'
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

  const handleSelectTone = (colorCode) => {
    console.log("Selected Skin Tone:", colorCode);
    setSelectedTone(colorCode);
  };

  const handleNext = async () => {
    if (!selectedTone) {
      alert('Please select a skin tone before continuing.');
      return;
    }

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    console.log("Storing in Supabase -> user_id:", userId, " | skincolorcode:", selectedTone);

    const { error } = await supabase
      .from('user_profiles')
      .upsert({ id: userId, skincolorcode: selectedTone }, { onConflict: ['id'] });

    if (error) {
      console.error('Failed to save to Supabase:', error.message);
      alert('Failed to save skin tone.');
    } else {
      console.log('Skin tone saved successfully!');
      navigate('/outfitselector');  // <-- no state passed here
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-purple-600 font-bold text-2xl mb-4">TWEAK</h1>
        <h2 className="font-semibold mb-6">Select Your Skin Tone</h2>
        <div className="grid grid-cols-7 gap-3 justify-center mb-6">
          {skinTones.map((color, index) => (
            <button
              key={index}
              onClick={() => handleSelectTone(color)}
              style={{
                backgroundColor: color,
                border: selectedTone === color ? '2px solid #9333ea' : '1px solid #ccc'
              }}
              className="w-8 h-8 rounded-full hover:border-purple-500 transition-colors"
              aria-label={`Select skin tone ${index + 1}`}
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

export default SkinToneSelector;
