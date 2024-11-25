import { useEffect } from 'react';
import { useAudio } from '../context/AudioContext';

export default function AudioPlayer() {
  const { currentTrack, isPlaying, progress, updateProgress, pause, resume } = useAudio();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isPlaying]);

  if (!currentTrack) return null;

  return (
    <div>
      <h3>{currentTrack.title}</h3>
      <p>{currentTrack.seasonTitle}</p>
      <button onClick={() => isPlaying ? pause() : resume()}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={e => updateProgress(Number(e.target.value))}
      />
    </div>
  );
}