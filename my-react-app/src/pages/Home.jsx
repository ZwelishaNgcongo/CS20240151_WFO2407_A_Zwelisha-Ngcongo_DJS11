// src/pages/Home.jsx

import { useState, useMemo } from 'react';
import useFetchPodcasts from '../hooks/useFetchPodcasts';
import LoadingIndicator from '../components/LoadingIndicator';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import SortSelect from '../components/SortSelect';
import PodcastCard from '../components/PodcastCard';

const SORT_OPTIONS = [
  { value: 'titleAsc', label: 'Title A-Z' },
  { value: 'titleDesc', label: 'Title Z-A' },
  { value: 'recentlyUpdated', label: 'Newly Updated' },
  { value: 'oldestUpdated', label: 'Oldest Updated' },
];

const Home = () => {
  const { podcasts, loading, error } = useFetchPodcasts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  /* Default sort is alphabetical ascending, per spec */
  const [sortOption, setSortOption] = useState('titleAsc');

  const visiblePodcasts = useMemo(() => {
    let result = [...podcasts];

    if (selectedGenre) {
      result = result.filter((p) => {
        const ids = p.genreIds || p.genres || [];
        return ids.map(String).includes(String(selectedGenre));
      });
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(term));
    }

    switch (sortOption) {
      case 'titleAsc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'recentlyUpdated':
        result.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case 'oldestUpdated':
        result.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      default:
        break;
    }

    return result;
  }, [podcasts, selectedGenre, searchTerm, sortOption]);

  if (loading) return <LoadingIndicator label="Loading podcasts..." />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="home-container">
      <h1>All Podcasts</h1>

      <div className="home-controls">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <GenreFilter value={selectedGenre} onChange={setSelectedGenre} />
        <SortSelect value={sortOption} onChange={setSortOption} options={SORT_OPTIONS} />
      </div>

      {visiblePodcasts.length === 0 ? (
        <p>No podcasts match your search.</p>
      ) : (
        <div className="podcast-grid">
          {visiblePodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;