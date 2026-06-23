// src/data/genres.js

/* Hardcoded genre id -> title mapping, as recommended by the spec */
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

export const getGenreNames = (genreIds = []) => {
  if (!Array.isArray(genreIds) || genreIds.length === 0) return ['Unknown'];
  return genreIds.map((id) => genreMapping[id] || 'Unknown');
};