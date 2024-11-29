import { genreMapping } from "../context/GenreContext";

const GenreFilter = ({ onFilterChange }) => {
  return (
    <select onChange={(e) => onFilterChange(e.target.value)}>
      <option value="">All Genres</option>
      {Object.entries(genreMapping).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;