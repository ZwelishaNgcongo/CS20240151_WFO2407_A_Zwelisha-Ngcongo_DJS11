import { useContext } from 'react';
import PropTypes from 'prop-types';
import { GenreContext } from "../context/GenreContext";

const GenreFilter = ({ onFilterChange }) => {
  const { genres } = useContext(GenreContext);

  return (
    <select onChange={(e) => onFilterChange(e.target.value)}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

GenreFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default GenreFilter;