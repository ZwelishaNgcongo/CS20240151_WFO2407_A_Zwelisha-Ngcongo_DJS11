import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  /*  Load favorites from localStorage on initial render */
  useEffect(() => {
    const savedFavorites = localStorage.getItem('podcastFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

   /* Save favorites to localStorage whenever they change */
  useEffect(() => {
    localStorage.setItem('podcastFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (podcast) => {
    /*  Check if podcast is already in favorites */
    const exists = favorites.some(fav => fav.id === podcast.id);
    
    if (!exists) {
      /* Add dateAdded when adding to favorites */
      const favoriteWithDate = {
        ...podcast,
        dateAdded: new Date().toISOString()
      };
      
      setFavorites([...favorites, favoriteWithDate]);
    }
  };

  const removeFavorite = (podcastId) => {
    setFavorites(favorites.filter(podcast => podcast.id !== podcastId));
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};