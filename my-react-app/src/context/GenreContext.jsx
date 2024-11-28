import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchPreviews } from '../utils/api';

export const genreMapping = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const previews = await fetchPreviews();
        const uniqueGenreIds = [...new Set(previews.flatMap(preview => preview.genreIds))];
        
        const genreList = uniqueGenreIds.map(id => ({
          id: Number(id),
          name: genreMapping[id] || 'Unknown Genre'
        }));

        setGenres(genreList);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    loadGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres }}>
      {children}
    </GenreContext.Provider>
  );
};

GenreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};