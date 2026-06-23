// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import Home from './pages/Home';
import ShowDetails from './pages/ShowDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <AudioPlayer />
    </div>
  );
}

export default App;