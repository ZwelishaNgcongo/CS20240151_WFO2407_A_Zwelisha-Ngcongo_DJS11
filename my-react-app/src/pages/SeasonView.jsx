// src/components/SeasonView.jsx

import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FavoritesContext } from '../context/FavoritesContext';
import { AudioContext } from '../context/AudioContext';

/**
 * Renders the episode list for a single selected season, with a season
 * toggle (to jump to another season without leaving this view) and a
 * "Back to show" control.
 */
const SeasonView = ({ show, seasons, selectedSeasonIndex, onChangeSeason, onBack }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { playEpisode, currentEpisode, isEpisodeListened, getEpisodeProgress } =
    useContext(AudioContext);

  const selectedSeason = seasons[selectedSeasonIndex];
  const seasonId = selectedSeason.id ?? selectedSeasonIndex;

  return (
    <div className="show-details-container">
      <button onClick={onBack} className="back-button">
        ← Back to show
      </button>

      <div className="season-header">
        <img
          src={selectedSeason.image || show.image}
          alt={selectedSeason.title}
          className="season-header-image"
        />
        <div>
          <h2>{show.title}</h2>
          <h3>{selectedSeason.title}</h3>
          <p>{selectedSeason.episodes?.length || 0} episodes</p>
        </div>
      </div>

      {/* Season toggle - quick switch without going back to show overview */}
      {seasons.length > 1 && (
        <select
          value={selectedSeasonIndex}
          onChange={(e) => onChangeSeason(Number(e.target.value))}
          className="season-toggle-select"
          aria-label="Switch season"
        >
          {seasons.map((s, idx) => (
            <option key={s.id ?? idx} value={idx}>
              {s.title}
            </option>
          ))}
        </select>
      )}

      <ul className="episode-list">
        {(selectedSeason.episodes || []).map((episode, epIdx) => {
          const episodeId = episode.id ?? epIdx;
          const fav = isFavorite(show.id, seasonId, episodeId);
          const listened = isEpisodeListened(show.id, seasonId, episodeId);
          const progress = getEpisodeProgress(show.id, seasonId, episodeId);
          const isCurrent =
            currentEpisode &&
            currentEpisode.showId === show.id &&
            currentEpisode.seasonId === seasonId &&
            currentEpisode.episodeId === episodeId;

          return (
            <li key={episodeId} className={`episode-item ${isCurrent ? 'episode-item-active' : ''}`}>
              <div className="episode-item-main">
                <span className="episode-item-title">
                  {epIdx + 1}. {episode.title}
                </span>
                {listened && <span className="episode-listened-badge">✓ Listened</span>}
                {!listened && progress?.currentTime > 0 && (
                  <span className="episode-progress-badge">In progress</span>
                )}
              </div>
              <div className="episode-item-actions">
                <button
                  onClick={() =>
                    playEpisode({
                      showId: show.id,
                      showTitle: show.title,
                      seasonId,
                      seasonTitle: selectedSeason.title,
                      episodeId,
                      episodeTitle: episode.title,
                    })
                  }
                  className="episode-play-button"
                >
                  ▶ Play
                </button>
                <button
                  onClick={() =>
                    toggleFavorite({
                      showId: show.id,
                      showTitle: show.title,
                      showImage: show.image,
                      seasonId,
                      seasonTitle: selectedSeason.title,
                      episodeId,
                      episodeTitle: episode.title,
                      episodeFile: episode.file,
                    })
                  }
                  className="episode-favorite-button"
                  aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {fav ? '★ Favorited' : '☆ Favorite'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

SeasonView.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  seasons: PropTypes.array.isRequired,
  selectedSeasonIndex: PropTypes.number.isRequired,
  onChangeSeason: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default SeasonView;