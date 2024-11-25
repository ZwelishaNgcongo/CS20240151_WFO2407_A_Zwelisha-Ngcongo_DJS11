import { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const value = {
    currentTrack,
    isPlaying,
    progress,
    play: (track) => {
      setCurrentTrack(track);
      setIsPlaying(true);
    },
    pause: () => setIsPlaying(false),
    resume: () => setIsPlaying(true),
    updateProgress: (value) => setProgress(value)
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
