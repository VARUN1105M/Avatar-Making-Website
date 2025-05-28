import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/Supabase';

function UserDetails() {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        alert('User not found. Please log in again.');
        navigate('/login');
      } else {
        setUserId(user.id);
        console.log('User ID:', user.id);
      }
    };

    getUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    // Make sure gender is in lowercase as required by the DB
    const lowercaseGender = gender.toLowerCase();

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([
        {
          id: userId,
          age: parseInt(age),
          gender: lowercaseGender,
        },
      ]);

    if (error) {
      console.error('Insert failed:', error.message);
      alert('Profile update failed: ' + error.message);
    } else {
      alert('Details saved successfully!');
      navigate('/skintoneselector');
    }
  };

  w

  return (
    <div style={gradientBackground}>
      <div className="bg-white p-10 rounded-3xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">TWEAK</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option> {/* ✅ Lowercase only */}
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
