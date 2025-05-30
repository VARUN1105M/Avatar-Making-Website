import { Routes, Route } from 'react-router-dom';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import Home from './Pages/Home';
import UserDetails from './Pages/UserDetails';
import MagicRedirect from './Pages/MagicRedirect';  // <-- import here
import Navigation from './Components/Navigation';
import SkinToneSelector from './Pages/SkinToneSelector';
import OutfitSelector from './Pages/OutfitSelector';
import HaircolorSelector from './Pages/Haircolor';
import Shirtcolor from './Pages/Shirtcolor';
import Pantcolor from './Pages/Pantcolor';
import ShoeColor from './Pages/Shoecolor';
import About from './Pages/About';
import ErrorBoundary from './Components/ErrorBoundary';

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
        <Route path="/haircolorselector" element={<HaircolorSelector />} />
        <Route path="/shirtcolorselector" element={<Shirtcolor />} />
        <Route path="/pantcolorselector" element={<Pantcolor/>}/>
        <Route path="/shoecolorselector" element={<ShoeColor/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/errorboundary' element={<ErrorBoundary/>}/>
      </Routes>
    </>
  );
}

export default App;
