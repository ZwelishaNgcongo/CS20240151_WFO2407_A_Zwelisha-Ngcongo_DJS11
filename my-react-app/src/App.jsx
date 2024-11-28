
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import Header from './components/Header'; // Import your Header component
import ShowList from './components/ShowList'; // Import ShowList component
import ShowDetail from './components/ShowDetail'; // Import ShowDetail component
import Favorites from './components/Favorites'; // Import Favorites component
import LoadingIndicator from './components/LoadingIndicator'; // Import LoadingIndicator component
import GenreFilter from './components/GenreFilter'; // Import GenreFilter component
import { FavoritesProvider } from './context/FavoritesContext'; // Import Favorites context provider
import './App.css'

const App = () => {
  const [shows, setShows] = useState([]); // State to hold the full list of shows
  const [filteredShows, setFilteredShows] = useState([]); // State to hold filtered shows
  const [genres, setGenres] = useState([]); // State to hold genres
  const [previews, setPreviews] = useState([]); // State to hold previews
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch genres, shows, and previews
  useEffect(() => {
      const fetchGenresAndShows = async () => {
          try {
              // Fetch genres
              const genreResponse = await fetch('/my-react-app/src/utils/api.jsx'); // Adjust the endpoint as needed
              const genreData = await genreResponse.json();
              setGenres(genreData);

              // Fetch shows
              const showResponse = await fetch('/my-react-app/src/utils/api.jsx'); // Adjust the endpoint as needed
              const showData = await showResponse.json();
              setShows(showData);
              setFilteredShows(showData); // Initialize filtered shows with all shows

              // Fetch previews from the provided API
              const previewResponse = await fetch('https://podcast-api.netlify.app'); // Fetch previews
              const previewData = await previewResponse.json();
              setPreviews(previewData); // Set fetched previews
          } catch (error) {
              console.error('Error fetching data:', error);
          } finally {
              setLoading(false); // Set loading to false after fetching
          }
      };

      fetchGenresAndShows();
  }, []);

  // Filter handler
  const handleFilter = (selectedGenre) => {
      console.log('Filter applied:', selectedGenre);
      if (selectedGenre) {
          const filtered = shows.filter(show => show.genre === selectedGenre);
          setFilteredShows(filtered);
      } else {
          setFilteredShows(shows); // Reset to the full list if no genre is selected
      }
  };

  if (loading) {
      return <LoadingIndicator />; // Show loading indicator while fetching data
  }

  return (
      <FavoritesProvider>
          <Router>
              <div className="container">
                  <Header />
                  <GenreFilter onFilter={handleFilter} genres={genres} /> {/* Pass genres to GenreFilter */}
                  <Routes>
                      <Route path="/" element={<ShowList shows={filteredShows} previews={previews} />} /> {/* Pass filtered shows and previews */}
                      <Route path="/shows/:id" element={<ShowDetail />} /> {/* Use element prop */}
                      <Route path="/favorites" element={<Favorites />} /> {/* Use element prop */}
                      <Route path="/loading" element={<LoadingIndicator />} /> {/* Use element prop */}
                      <Route path="*" element={<div>404 Not Found</div>} /> {/* Handle unmatched routes */}
                  </Routes>
              </div>
          </Router>
      </FavoritesProvider>
  );
};

export default App;