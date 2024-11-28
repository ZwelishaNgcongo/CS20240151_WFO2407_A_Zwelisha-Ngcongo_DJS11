import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GenreFilter from './components/GenreFilter';
import Favorites from './components/Favorites';
import PodcastDetails from './components/PodcastDetails';
import PodcastList from './components/PodcastList';
import SearchBar from './components/SearchBar';
import PlaybackControls from './components/PlaybackControls';
import { FavoritesProvider } from './context/FavoritesContext';
import { GenreProvider } from './context/GenreContext';
import { fetchPreviews } from './utils/api';
import LoadingIndicator from './components/LoadingIndicator';
import './App.css';

const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create a ref for the audio element
  const audioRef = useRef(null);

  const getPodcasts = async () => {
    try {
      setLoading(true);
      const data = await fetchPreviews();
      // Sort alphabetically as per requirement P3.5
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
      setPodcasts(sortedData);
      setFilteredPodcasts(sortedData);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      // Optional: Add error state to show user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPodcasts();
  }, []);

  // Combined filtering function
  useEffect(() => {
    let result = podcasts;

    // Filter by genre
    if (selectedGenre) {
      result = result.filter(podcast => 
        podcast.genres.includes(Number(selectedGenre))
      );
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(podcast =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPodcasts(result);
  }, [podcasts, selectedGenre, searchTerm]);

  

  return (
    <FavoritesProvider>
      <GenreProvider>
        <Router>
          <div className="app-container">
            <header className="app-header">
              <Navbar />
           
            </header>
            {/* Pass the audioRef to PlaybackControls */}
            <PlaybackControls audioRef={audioRef} />
            <div className="content-container">
              {loading ? (
                <LoadingIndicator />
              ) : (
                <Routes>
                  <Route
                    path="/"
                    element={<PodcastList podcasts={filteredPodcasts} />}
                  />
                  <Route path="/" element={<PodcastList />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/podcast/:id" element={<PodcastDetails />} />
                </Routes>
              )}
            </div>
          </div>
        </Router>
      </GenreProvider>
    </FavoritesProvider>
  );
};

export default App;