import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
        setFavorites((prev) => {
            const isAlreadyFavorite = prev.some(fav => fav.id === episode.id);
            return isAlreadyFavorite ? prev : [...prev, episode];
        });
    };

    const removeFavorite = (episodeId) => {
        setFavorites((prev) => prev.filter((episode) => episode.id !== episodeId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired
};