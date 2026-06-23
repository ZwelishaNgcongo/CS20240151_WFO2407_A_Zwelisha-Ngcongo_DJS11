// src/components/PodcastCard.jsx

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getGenreNames } from '../data/genres';

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const PodcastCard = ({ podcast }) => {
  return (
    <Link to={`/show/${podcast.id}`} className="podcast-card">
      <img src={podcast.image} alt={podcast.title} className="podcast-card-image" />
      <div className="podcast-card-body">
        <h3 className="podcast-card-title">{podcast.title}</h3>
        <p className="podcast-card-seasons">
          {podcast.seasons} season{podcast.seasons === 1 ? '' : 's'}
        </p>
        <p className="podcast-card-genres">{getGenreNames(podcast.genreIds).join(', ')}</p>
        <p className="podcast-card-updated">Updated {formatDate(podcast.updated)}</p>
      </div>
    </Link>
  );
};

PodcastCard.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    seasons: PropTypes.number,
    genreIds: PropTypes.array,
    updated: PropTypes.string,
  }).isRequired,
};

export default PodcastCard;