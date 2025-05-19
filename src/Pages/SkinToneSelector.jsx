import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SkinToneSelector() {
  const navigate = useNavigate();
  const [selectedTone, setSelectedTone] = useState(null);

  const gradientBackground = {
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  };

  const skinTones = [
    '#F9E4E4', '#F9D5D3', '#FCE8E8', '#FBE3D1', '#F6C28B', '#D2964A', '#A96923',
    '#7D4810', '#5B2F05', '#381D01', '#E4D2BD', '#D4BFAA', '#B6967E',
    '#9C754D', '#7F5D39', '#A97C50', '#7F5B31', '#5C3D19', '#3F2710', '#291B09'
  ];

  const handleSelectTone = (colorCode) => {
    console.log("Selected Skin Tone:", colorCode);
    setSelectedTone(colorCode);
  };

  const handleNext = () => {
    if (selectedTone) {
      navigate('/outfitselector', { state: { skinTone: selectedTone } });
    } else {
      alert('Please select a skin tone before continuing.');
    }
  };

  return (
    <div style={gradientBackground}>
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
