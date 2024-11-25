import { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { sortByTitle } from '../utils/helpers';

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const [sortKey, setSortKey] = useState('title-asc');

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch(sortKey) {
      case 'title-desc': return sortByTitle(b, a);
      case 'date-asc': return new Date(a.addedAt) - new Date(b.addedAt);
      case 'date-desc': return new Date(b.addedAt) - new Date(a.addedAt);
      default: return sortByTitle(a, b);
    }
  });

  return (
    <div>
      <h1>Favorites</h1>
      <select onChange={e => setSortKey(e.target.value)} value={sortKey}>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="date-desc">Recently Added</option>
        <option value="date-asc">Oldest Added</option>
      </select>

      {sortedFavorites.map(episode => (
        <div key={episode.id}>
          <h3>{episode.title}</h3>
          <p>{episode.seasonTitle}</p>
          <button onClick={() => removeFavorite(episode.id)}>
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );
}