import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AvatarBody from '../Components/AvatharBody'; // Correct path

const costumes = [
  { id: 1, component: AvatarBody, label: 'Costume 1' },
  { id: 2, file: '/assets/man.svg', label: 'Costume 2' },
  { id: 3, file: '/assets/man1.svg', label: 'Costume 3' },
];

export default function OutfitSelector() {
  const location = useLocation();
  const skinTone = location.state?.skinTone || null;

  const [selectedSVG, setSelectedSVG] = useState('');
  const [SelectedComponent, setSelectedComponent] = useState(null);
  const [selectedCostumeId, setSelectedCostumeId] = useState(null);

  useEffect(() => {
    console.log('Skin Tone from previous page:', skinTone);
    handleCostumeClick(costumes[0]); // Load first costume initially
  }, []);

  const gradientBackground = {
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  };

  const handleCostumeClick = async (costume) => {
    if (costume.component) {
      setSelectedSVG('');
      setSelectedComponent(() => costume.component);
    } else {
      try {
        const response = await fetch(costume.file);
        const svgText = await response.text();
        setSelectedSVG(svgText);
        setSelectedComponent(null);
      } catch (error) {
        console.error('Failed to fetch SVG:', error);
      }
    }
    setSelectedCostumeId(costume.id);
  };

  return (
    <div style={gradientBackground}>
      <div className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-md text-center space-y-6">
        <div className="space-y-1">
          <h1 className="text-purple-600 font-extrabold text-3xl">TWEAK</h1>
          <h2 className="font-semibold text-lg text-gray-700">Try Out Your Outfit</h2>
        </div>

        <div className="flex justify-center items-center h-56 mb-4">
          <div className="w-40 h-56">
            {SelectedComponent ? (
              <SelectedComponent skintone={skinTone} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: selectedSVG }} />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">Select Costume</h3>
          <div className="flex justify-center gap-6">
            {costumes.map((costume) => {
              const CostumePreview = costume.component ? costume.component : null;
              return (
                <button
                  key={costume.id}
                  onClick={() => handleCostumeClick(costume)}
                  className={`border-2 rounded-lg p-2 transition-colors ${
                    selectedCostumeId === costume.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200'
                  }`}
                  aria-label={`Select ${costume.label}`}
                >
                  <div className="w-16 h-24 flex items-center justify-center">
                    {CostumePreview ? (
                      <CostumePreview skintone={skinTone} />
                    ) : (
                      <img
                        src={costume.file}
                        alt={costume.label}
                        className="object-contain max-w-full max-h-full"
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-700">{costume.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
