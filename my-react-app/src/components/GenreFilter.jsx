// src/components/GenreFilter.jsx

import PropTypes from 'prop-types';
import { genreMapping } from '../data/genres';

const GenreFilter = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="podcast-genre-select"
      aria-label="Filter by genre"
    >
      <option value="">All Genres</option>
      {Object.entries(genreMapping).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

GenreFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GenreFilter;