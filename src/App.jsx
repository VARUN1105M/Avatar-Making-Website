import { Routes, Route } from 'react-router-dom';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import Home from './Pages/Home';
import UserDetails from './Pages/UserDetails';
import MagicRedirect from './Pages/MagicRedirect';  // <-- import here
import Navigation from './Components/Navigation';
import SkinToneSelector from './Pages/SkinToneSelector';
import OutfitSelector from './Pages/OutfitSelector';

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/magic" element={<MagicRedirect />} />  {/* <-- Add this */}
        <Route path="/" element={<Home />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/skintoneselector" element={<SkinToneSelector />} />
        <Route path="/outfitselector" element={<OutfitSelector />} />
      </Routes>
    </>
  );
}

export default App;
