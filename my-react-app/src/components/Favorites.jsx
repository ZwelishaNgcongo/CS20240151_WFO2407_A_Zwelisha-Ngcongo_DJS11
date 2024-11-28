// src/components/Favorites.jsx
import  { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import './Favorites.css'; // You can also merge this into app.css if preferred

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">My Favorites</h2>
            {favorites.length === 0 ? (
                <p className="no-favorites">No favorites added yet.</p>
            ) : (
                <ul className="favorites-list">
                    {favorites.map((show) => (
                        <li key={show.id} className="favorites-item">
                            <Link to={`/shows/${show.id}`}>{show.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;