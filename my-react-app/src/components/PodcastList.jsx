import { useContext, useState, useEffect, useMemo } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { GenreContext } from '../context/GenreContext';
import SearchBar from './SearchBar';
import useFetchPodcasts from '../hooks/useFetchPodcasts';

const PodcastList = () => {
  const { addFavorite } = useContext(FavoritesContext);
  const { genres } = useContext(GenreContext);
  const { podcasts, loading } = useFetchPodcasts();
  
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('alphabeticalAsc');

  useEffect(() => {
    setFilteredPodcasts(podcasts);
  }, [podcasts]);

  const handleFilter = (genreId) => {
    setSelectedGenre(genreId);
    if (!genreId) {
      setFilteredPodcasts(podcasts);
    } else {
      const filtered = podcasts.filter(podcast => 
        podcast.genres.includes(Number(genreId))
      );
      setFilteredPodcasts(filtered);
    }
  };

  const handleSearch = (term) => {
    const filtered = podcasts.filter(podcast =>
      podcast.title.toLowerCase().includes(term.toLowerCase()) &&
      (selectedGenre ? podcast.genres.includes(Number(selectedGenre)) : true)
    );
    setFilteredPodcasts(filtered);
  };

  const sortedPodcasts = useMemo(() => {
    let sorted = [...filteredPodcasts];
    switch (sortOption) {
      case 'alphabeticalAsc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'alphabeticalDesc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'recentlyUpdated':
        return sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case 'oldestUpdated':
        return sorted.sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return sorted;
    }
  }, [filteredPodcasts, sortOption]);

  if (loading) return <p>Loading...</p>;

  // Create a mapping from genre IDs to genre names
  const genreMapping = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  return (
    <div>
      <h2>Podcasts</h2>
      <select 
        value={selectedGenre} 
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <SearchBar onSearch={handleSearch} />
      <select 
        value={sortOption} 
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="alphabeticalAsc">A-Z</option>
        <option value="alphabeticalDesc">Z-A</option>
        <option value="recentlyUpdated">Recently Updated</option>
        <option value="oldestUpdated">Oldest Updated</option>
      </select>
      <ul>
        {sortedPodcasts.map((podcast) => (
          <li key={podcast.id}>
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <p>Seasons: {podcast.seasons}</p>
            <p>Last Updated: {new Date(podcast.updated).toLocaleDateString()}</p>
            <p>Genres: {podcast.genres.map(id => genreMapping[id]).join(', ')}</p>
            <button onClick={() => addFavorite(podcast)}>
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastList;