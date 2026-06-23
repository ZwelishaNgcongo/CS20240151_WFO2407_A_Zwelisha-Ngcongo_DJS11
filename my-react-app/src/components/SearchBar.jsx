// src/components/SearchBar.jsx

import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search podcasts by title..."
      className="search-bar-input"
      aria-label="Search podcasts"
    />
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;