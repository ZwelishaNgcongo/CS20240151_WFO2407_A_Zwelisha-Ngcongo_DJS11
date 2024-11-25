import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('podcastFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('podcastFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (episode) => {
    const favorite = {
      ...episode,
      addedAt: new Date().toISOString()
    };
    setFavorites(prev => [...prev, favorite]);
  };

  const removeFavorite = (episodeId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== episodeId));
  };

  const isFavorite = (episodeId) => {
    return favorites.some(fav => fav.id === episodeId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);