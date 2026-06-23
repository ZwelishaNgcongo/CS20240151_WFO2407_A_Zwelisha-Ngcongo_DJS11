// src/components/AudioPlayer.jsx

import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

const formatTime = (seconds = 0) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AudioPlayer = () => {
  const { currentEpisode, isPlaying, currentTime, duration, togglePlayPause, seek, skip } =
    useContext(AudioContext);

  if (!currentEpisode) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player-bar">
      <div className="audio-player-info">
        <span className="audio-player-show">{currentEpisode.showTitle}</span>
        <span className="audio-player-episode">{currentEpisode.episodeTitle}</span>
      </div>

      <div className="audio-player-controls">
        <button onClick={() => skip(-10)} className="audio-player-btn" aria-label="Rewind 10 seconds">
          ⏪ 10s
        </button>
        <button onClick={togglePlayPause} className="audio-player-btn audio-player-btn-main">
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={() => skip(10)} className="audio-player-btn" aria-label="Forward 10 seconds">
          10s ⏩
        </button>
      </div>

      <div className="audio-player-progress-row">
        <span className="audio-player-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime || 0}
          onChange={(e) => seek(Number(e.target.value))}
          className="audio-player-progress-bar"
          style={{ '--progress': `${progressPercent}%` }}
          aria-label="Playback progress"
        />
        <span className="audio-player-time">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;