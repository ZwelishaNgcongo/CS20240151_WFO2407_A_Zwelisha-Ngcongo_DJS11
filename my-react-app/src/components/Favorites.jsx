import { useContext, useState, useMemo } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const [sortOption, setSortOption] = useState('recentlyAdded');

  const sortedFavorites = useMemo(() => {
    let sorted = [...favorites];
    switch (sortOption) {
      case 'titleAsc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'titleDesc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'recentlyAdded':
        return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case 'oldestAdded':
        return sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      default:
        return sorted;
    }
  }, [favorites, sortOption]);

  return (
    <div className="favorites-container">
      <h2>My Favorites</h2>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="favorites-sort-select"
      >
        <option value="titleAsc">Title A-Z</option>
        <option value="titleDesc">Title Z-A</option>
        <option value="recentlyAdded">Recently Added</option>
        <option value="oldestAdded">Oldest Added</option>
      </select>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul className="favorites-list">
          {sortedFavorites.map((podcast) => (
            <li key={podcast.id} className="favorites-item">
              <img 
                src={podcast.image} 
                alt={podcast.title} 
                className="favorites-item-image"
              />
              <div className="favorites-item-details">
                <span className="favorites-item-title">{podcast.title}</span>
                <span className="favorites-item-date">
                  <div> Added: {new Date(podcast.dateAdded).toLocaleString()}</div>
                 
                </span>
              </div>
              <button 
                onClick={() => removeFavorite(podcast.id)} 
                className="favorites-remove-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;