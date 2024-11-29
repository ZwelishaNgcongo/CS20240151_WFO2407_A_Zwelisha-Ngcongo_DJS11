import { useContext, useState, useEffect, useMemo } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import SearchBar from "./SearchBar";
import useFetchPodcasts from "../hooks/useFetchPodcasts";

 /* Static Genre Mapping (Hardcoded as instructed) */
const genreMapping = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

const PodcastList = () => {
  const { addFavorite } = useContext(FavoritesContext);  /* Favorites functionality */
  const { podcasts, loading } = useFetchPodcasts();  /* Fetch podcasts */

  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("alphabeticalAsc");

   /* Initialize filteredPodcasts with all podcasts */
  useEffect(() => {
    setFilteredPodcasts(podcasts);
  }, [podcasts]);

   /* Filter podcasts based on the selected genre */
  const handleFilter = (genreId) => {
    setSelectedGenre(genreId);
    if (!genreId) {
      setFilteredPodcasts(podcasts);  /* Show all podcasts if no genre selected */
    } else {
      const filtered = podcasts.filter((podcast) =>
        podcast.genreIds.includes(Number(genreId))
      );
      setFilteredPodcasts(filtered);
    }
  };

   /* Search podcasts by title and filter by selected genre */
  const handleSearch = (term) => {
    const filtered = podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(term.toLowerCase()) &&
        (selectedGenre
          ? podcast.genreIds.includes(Number(selectedGenre))
          : true)
    );
    setFilteredPodcasts(filtered);
  };

  /* Sort podcasts based on the selected sorting option */
  const sortedPodcasts = useMemo(() => {
    let sorted = [...filteredPodcasts];
    switch (sortOption) {
      case "alphabeticalAsc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "alphabeticalDesc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "recentlyUpdated":
        return sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case "oldestUpdated":
        return sorted.sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return sorted;
    }
  }, [filteredPodcasts, sortOption]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="podcast-list-container">
      <h2>Podcasts</h2>

      {/* Genre Filter */}
      <select
        value={selectedGenre}
        onChange={(e) => handleFilter(e.target.value)}
        className="podcast-genre-select"
      >
        <option value="">All Genres</option>
        {Object.entries(genreMapping).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Sort Option */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="podcast-sort-select"
      >
        <option value="alphabeticalAsc">A-Z</option>
        <option value="alphabeticalDesc">Z-A</option>
        <option value="recentlyUpdated">Recently Updated</option>
        <option value="oldestUpdated">Oldest Updated</option>
      </select>

      {/* Podcast List */}
      <ul>
        {sortedPodcasts.map((podcast) => (
          <li key={podcast.id} className="podcast-item">
            <img
              src={podcast.image}
              alt={podcast.title}
              className="podcast-image"
            />
            <h3>{podcast.title}</h3>
            <p>Seasons: {podcast.seasons}</p>
            <p>Last Updated: {new Date(podcast.updated).toLocaleDateString()}</p>
            <p>
            Genres:{" "}
             {Array.isArray(podcast.genreIds)
                 ? podcast.genreIds
                 .map((id) => genreMapping[id] || "Unknown Genre")
                 .join(", ")
                 : "No Genres Available"}
              
            </p>
            <button
              onClick={() => addFavorite(podcast)}
              className="podcast-add-favorite-button"
            >
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastList