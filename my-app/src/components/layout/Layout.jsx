// Layout.jsx
import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Audio warning before unload
    const handleBeforeUnload = (e) => {
      if (currentAudio && !currentAudio.paused) {
        e.preventDefault();
        e.returnValue = 'Audio is still playing. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentAudio]);

  const handleSortChange = (sortType) => {
    // Pass sorting to child components via context or props
  };

  const handleGenreSelect = (genreId) => {
    // Pass genre filter to child components via context or props
  };

  return (
    <div className="app-layout">
      <Header 
        onSortChange={handleSortChange}
        onGenreSelect={handleGenreSelect}
      />
      
      <main className="main-content">
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : (
          children
        )}
      </main>

      <Footer />

      {/* Persistent Audio Player */}
      <div className="persistent-audio-player">
        <audio
          ref={(audio) => setCurrentAudio(audio)}
          controls
          className="audio-element"
        >
          <source src="placeholder-audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};
export{Layout}