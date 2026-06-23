// src/context/AudioContext.jsx

import { createContext, useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PLACEHOLDER_AUDIO_URL } from '../utils/api';

export const AudioContext = createContext();

const PROGRESS_KEY = 'podcastApp.listeningProgress';

/**
 * Progress map shape, keyed by `${showId}-${seasonId}-${episodeId}`:
 * {
 *   currentTime: number,
 *   duration: number,
 *   completed: boolean,
 *   showId, showTitle, seasonId, seasonTitle, episodeId, episodeTitle
 * }
 */
export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [progressMap, setProgressMap] = useState(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));
  }, [progressMap]);

  const makeKey = (showId, seasonId, episodeId) =>
    `${showId}-${seasonId}-${episodeId}`;

  /* Warn the user before closing the tab while audio is actively playing */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isPlaying]);

  const playEpisode = useCallback((episodeMeta) => {
    /* episodeMeta: { showId, showTitle, seasonId, seasonTitle, episodeId, episodeTitle } */
    setCurrentEpisode(episodeMeta);
    setIsPlaying(true);

    /* Resume from saved progress, if any */
    const key = makeKey(episodeMeta.showId, episodeMeta.seasonId, episodeMeta.episodeId);
    const saved = progressMap[key];

    requestAnimationFrame(() => {
      if (audioRef.current) {
        audioRef.current.src = PLACEHOLDER_AUDIO_URL;
        audioRef.current.load();
        if (saved?.currentTime && !saved.completed) {
          audioRef.current.currentTime = saved.currentTime;
        }
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressMap]);

  const togglePlayPause = () => {
    if (!audioRef.current || !currentEpisode) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const seek = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const skip = (delta) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + delta)
      );
    }
  };

  /* Persist progress on every timeupdate */
  const handleTimeUpdate = () => {
    if (!audioRef.current || !currentEpisode) return;
    const time = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCurrentTime(time);
    setDuration(dur);

    const key = makeKey(currentEpisode.showId, currentEpisode.seasonId, currentEpisode.episodeId);
    setProgressMap((prev) => ({
      ...prev,
      [key]: {
        ...currentEpisode,
        currentTime: time,
        duration: dur,
        completed: prev[key]?.completed || false,
      },
    }));
  };

  const handleEnded = () => {
    if (!currentEpisode) return;
    setIsPlaying(false);
    const key = makeKey(currentEpisode.showId, currentEpisode.seasonId, currentEpisode.episodeId);
    setProgressMap((prev) => ({
      ...prev,
      [key]: {
        ...currentEpisode,
        currentTime: prev[key]?.duration || 0,
        duration: prev[key]?.duration || 0,
        completed: true,
      },
    }));
  };

  const getEpisodeProgress = (showId, seasonId, episodeId) =>
    progressMap[makeKey(showId, seasonId, episodeId)] || null;

  const isEpisodeListened = (showId, seasonId, episodeId) =>
    !!progressMap[makeKey(showId, seasonId, episodeId)]?.completed;

  const resetAllProgress = () => {
    setProgressMap({});
    localStorage.removeItem(PROGRESS_KEY);
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        playEpisode,
        togglePlayPause,
        seek,
        skip,
        handleTimeUpdate,
        handleEnded,
        getEpisodeProgress,
        isEpisodeListened,
        resetAllProgress,
      }}
    >
      {children}
      {/* Single persistent audio element, lives for the whole app lifetime */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};