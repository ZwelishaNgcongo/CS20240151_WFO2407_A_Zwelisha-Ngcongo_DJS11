// src/context/FavoritesContext.jsx

import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const FavoritesContext = createContext();

const STORAGE_KEY = 'podcastApp.favorites';

/**
 * A favorite entry represents a single EPISODE, with enough context
 * about its parent SEASON and SHOW to be displayed and grouped.
 *
 * Shape:
 * {
 *   key: `${showId}-${seasonId}-${episodeId}`,
 *   showId, showTitle, showImage,
 *   seasonId, seasonTitle,
 *   episodeId, episodeTitle, episodeFile,
 *   dateAdded: ISOString
 * }
 */
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const makeKey = (showId, seasonId, episodeId) =>
    `${showId}-${seasonId}-${episodeId}`;

  const isFavorite = (showId, seasonId, episodeId) =>
    favorites.some((f) => f.key === makeKey(showId, seasonId, episodeId));

  const addFavorite = (entry) => {
    const key = makeKey(entry.showId, entry.seasonId, entry.episodeId);
    setFavorites((prev) => {
      if (prev.some((f) => f.key === key)) return prev;
      return [...prev, { ...entry, key, dateAdded: new Date().toISOString() }];
    });
  };

  const removeFavorite = (showId, seasonId, episodeId) => {
    const key = makeKey(showId, seasonId, episodeId);
    setFavorites((prev) => prev.filter((f) => f.key !== key));
  };

  const toggleFavorite = (entry) => {
    const key = makeKey(entry.showId, entry.seasonId, entry.episodeId);
    if (favorites.some((f) => f.key === key)) {
      removeFavorite(entry.showId, entry.seasonId, entry.episodeId);
    } else {
      addFavorite(entry);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};