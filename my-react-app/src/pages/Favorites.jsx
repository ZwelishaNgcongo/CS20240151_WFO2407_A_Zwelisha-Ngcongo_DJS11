// src/pages/Favorites.jsx

import { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { AudioContext } from '../context/AudioContext';
import SortSelect from '../components/SortSelect';

const SORT_OPTIONS = [
  { value: 'titleAsc', label: 'Title A-Z' },
  { value: 'titleDesc', label: 'Title Z-A' },
  { value: 'recentlyAdded', label: 'Recently Added' },
  { value: 'oldestAdded', label: 'Oldest Added' },
];

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const { playEpisode, resetAllProgress } = useContext(AudioContext);
  const [sortOption, setSortOption] = useState('recentlyAdded');

  /* Group favorites by show, then by season, per spec requirement */
  const groupedFavorites = useMemo(() => {
    let sorted = [...favorites];

    switch (sortOption) {
      case 'titleAsc':
        sorted.sort((a, b) => a.episodeTitle.localeCompare(b.episodeTitle));
        break;
      case 'titleDesc':
        sorted.sort((a, b) => b.episodeTitle.localeCompare(a.episodeTitle));
        break;
      case 'recentlyAdded':
        sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'oldestAdded':
        sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      default:
        break;
    }

    const showMap = new Map();
    sorted.forEach((fav) => {
      if (!showMap.has(fav.showId)) {
        showMap.set(fav.showId, {
          showId: fav.showId,
          showTitle: fav.showTitle,
          showImage: fav.showImage,
          seasons: new Map(),
        });
      }
      const showEntry = showMap.get(fav.showId);
      if (!showEntry.seasons.has(fav.seasonId)) {
        showEntry.seasons.set(fav.seasonId, {
          seasonId: fav.seasonId,
          seasonTitle: fav.seasonTitle,
          episodes: [],
        });
      }
      showEntry.seasons.get(fav.seasonId).episodes.push(fav);
    });

    return Array.from(showMap.values());
  }, [favorites, sortOption]);

  const handleReset = () => {
    if (window.confirm('This will erase your entire listening history. Continue?')) {
      resetAllProgress();
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <button onClick={handleReset} className="reset-progress-button">
          Reset Listening History
        </button>
      </div>

      {favorites.length > 0 && (
        <SortSelect value={sortOption} onChange={setSortOption} options={SORT_OPTIONS} />
      )}

      {favorites.length === 0 ? (
        <p>No favorites added yet. Go find something to love.</p>
      ) : (
        groupedFavorites.map((showGroup) => (
          <div key={showGroup.showId} className="favorites-show-group">
            <div className="favorites-show-header">
              <img src={showGroup.showImage} alt={showGroup.showTitle} />
              <Link to={`/show/${showGroup.showId}`}>
                <h2>{showGroup.showTitle}</h2>
              </Link>
            </div>

            {Array.from(showGroup.seasons.values()).map((seasonGroup) => (
              <div key={seasonGroup.seasonId} className="favorites-season-group">
                <h3>{seasonGroup.seasonTitle}</h3>
                <ul className="favorites-list">
                  {seasonGroup.episodes.map((fav) => (
                    <li key={fav.key} className="favorites-item">
                      <div className="favorites-item-details">
                        <span className="favorites-item-title">{fav.episodeTitle}</span>
                        <span className="favorites-item-date">
                          Added {new Date(fav.dateAdded).toLocaleString()}
                        </span>
                      </div>
                      <div className="favorites-item-actions">
                        <button
                          onClick={() =>
                            playEpisode({
                              showId: fav.showId,
                              showTitle: fav.showTitle,
                              seasonId: fav.seasonId,
                              seasonTitle: fav.seasonTitle,
                              episodeId: fav.episodeId,
                              episodeTitle: fav.episodeTitle,
                            })
                          }
                          className="episode-play-button"
                        >
                          ▶ Play
                        </button>
                        <button
                          onClick={() => removeFavorite(fav.showId, fav.seasonId, fav.episodeId)}
                          className="favorites-remove-button"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;