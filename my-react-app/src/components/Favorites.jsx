import { useContext, useState, useMemo } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const [sortOption, setSortOption] = useState('titleAsc');

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
      >
        
          
        <option value="titleAsc">Title A-Z</option>
        <option value="titleDesc">Title Z-A</option>
        <option value="recentlyAdded">Recently Added</option>
        <option value="oldestAdded">Oldest Added</option>
        
      </select>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {sortedFavorites.map((podcast) => (
            <li key={podcast.id}>
              <img src={podcast.image} alt={podcast.title} style={{ width: '50px', marginRight: '10px' }} />
              <span>{podcast.title}</span>
              <button onClick={() => removeFavorite(podcast.id)} className="favorites-remove-button">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;