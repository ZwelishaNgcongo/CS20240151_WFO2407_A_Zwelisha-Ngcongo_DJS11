// src/pages/ShowDetails.jsx

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchShow from '../hooks/useFetchShow';
import LoadingIndicator from '../components/LoadingIndicator';
import SeasonView from './SeasonView';
import { getGenreNames } from '../data/genres';

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const ShowDetails = () => {
  const { id } = useParams();
  const { show, loading, error } = useFetchShow(id);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(null);

  if (loading) return <LoadingIndicator label="Loading show..." />;
  if (error) return <p className="error-message">{error}</p>;
  if (!show) return <p>Show not found.</p>;

  const seasons = show.seasons || [];

  /* ---------- Season-specific episode view ---------- */
  if (selectedSeasonIndex !== null && seasons[selectedSeasonIndex]) {
    return (
      <SeasonView
        show={show}
        seasons={seasons}
        selectedSeasonIndex={selectedSeasonIndex}
        onChangeSeason={setSelectedSeasonIndex}
        onBack={() => setSelectedSeasonIndex(null)}
      />
    );
  }

  /* ---------- Show overview (default) view ---------- */
  return (
    <div className="show-details-container">
      <Link to="/" className="back-button">← Back to all podcasts</Link>

      <div className="show-header">
        <img src={show.image} alt={show.title} className="show-header-image" />
        <div>
          <h1>{show.title}</h1>
          <p className="show-genres">{getGenreNames(show.genreIds).join(', ')}</p>
          {show.updated && <p className="show-updated">Updated {formatDate(show.updated)}</p>}
          <p className="show-description">{show.description}</p>
        </div>
      </div>

      <h2>Seasons</h2>
      <div className="season-grid">
        {seasons.map((season, idx) => (
          <button
            key={season.id ?? idx}
            onClick={() => setSelectedSeasonIndex(idx)}
            className="season-card"
          >
            <img
              src={season.image || show.image}
              alt={season.title}
              className="season-card-image"
            />
            <h3>{season.title}</h3>
            <p>{season.episodes?.length || 0} episodes</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowDetails;