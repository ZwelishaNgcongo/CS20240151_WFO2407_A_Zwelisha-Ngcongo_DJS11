import  { createContext,useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (episode) => {
    const newFavorite = {
      ...episode,
      dateAdded: new Date().toISOString()
    };
    setFavorites((prev) => [...prev, newFavorite]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((episode) => episode.id !== id));
  };
  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite,
      clearFavorites: () => {
        setFavorites([]);
        localStorage.removeItem('favorites');
      }
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a required node
};