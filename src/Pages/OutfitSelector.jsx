import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AvatarBody from '../Components/AvatharBodymale'; // Costume 1
import AvatarBody1 from '../Components/Avathar1male';   // Costume 2
import Womenavathar from '../Components/Womenavathar';  // Costume 3
import { supabase } from '../../supabase/Supabase';

const allCostumes = [
  { id: 1, component: AvatarBody, label: 'Costume 1 (Male)' },
  { id: 2, component: AvatarBody1, label: 'Costume 2 (Male)' },
  { id: 3, component: Womenavathar, label: 'Costume 3 (Female)' },
];

export default function OutfitSelector() {
  const location = useLocation();
  const skinToneFromState = location.state?.skinTone || null;

  const [selectedSVG, setSelectedSVG] = useState('');
  const [SelectedComponent, setSelectedComponent] = useState(null);
  const [selectedCostumeId, setSelectedCostumeId] = useState(null);

  const [skinTone, setSkinTone] = useState(skinToneFromState);
  const [hairColor, setHairColor] = useState(null);
  const [shirtColor, setShirtColor] = useState(null);
  const [pantColor, setPantColor] = useState(null);
  const [shoecolor, setShoecolor] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);

  const [filteredCostumes, setFilteredCostumes] = useState([]);

  useEffect(() => {
    fetchUserColors();
  }, []);

  useEffect(() => {
    if (age !== null && gender !== null) {
      let newFiltered;
      if (gender === 'male') {
        if (age >= 25 && age <= 40) {
          newFiltered = allCostumes.filter(c => c.id === 1 || c.id === 2);
        } else {
          newFiltered = allCostumes.filter(c => c.id === 1 || c.id === 2);
        }
      } else if (gender === 'female') {
        newFiltered = allCostumes.filter(c => c.id === 3);
      } else {
        newFiltered = allCostumes; // fallback
      }
      setFilteredCostumes(newFiltered);
      if (newFiltered.length > 0) handleCostumeClick(newFiltered[0]);
    }
  }, [age, gender]);

  const fetchUserColors = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('User not found:', userError?.message);
      return;
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('skincolorcode, haircolorcode, shirtcolorcode, pantcolorcode, shoecolorcode, age, gender')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error.message);
    } else {
      setSkinTone(data.skincolorcode);
      setHairColor(data.haircolorcode);
      setShirtColor(data.shirtcolorcode);
      setPantColor(data.pantcolorcode);
      setShoecolor(data.shoecolorcode);
      setAge(data.age);
      setGender(data.gender);
    }
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

  const gradientBackground = {
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
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
              <SelectedComponent
                skintone={skinTone}
                haircolor={hairColor}
                shirtcolor={shirtColor}
                pantcolor={pantColor}
                shoecolor={shoecolor}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: selectedSVG }} />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">Select Costume</h3>
          <div className="flex justify-center gap-6">
            {filteredCostumes.map((costume) => {
              const CostumePreview = costume.component ?? null;
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
                  <div className="w-10 h-24 flex items-center justify-center">
                    {CostumePreview ? (
                      <CostumePreview
                        skintone={skinTone}
                        haircolor={hairColor}
                        shirtcolor={shirtColor}
                        pantcolor={pantColor}
                        shoecolor={shoecolor}
                      />
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
