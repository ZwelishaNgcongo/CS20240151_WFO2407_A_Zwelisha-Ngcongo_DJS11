import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchShow } from "../utils/api";
import { genreMapping } from "../context/GenreContext";
import PlaybackControls from "./PlaybackControls";

const PodcastDetails = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const getPodcastDetails = async () => {
      try {
        const data = await fetchShow(id);
        setPodcast(data);
      } catch (err) {
        setError("Error fetching podcast details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPodcastDetails();
  }, [id]);

  // Map genreIds to genre names using genreMapping
  const getGenreNames = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return "No Genres Available";
    return genreIds
      .map((id) => genreMapping[id] || "Unknown Genre")
      .join(", ");
  };

  if (loading) return <p>Loading podcast details...</p>;

  if (error) return <p>{error}</p>;

  if (!podcast) return <p>No podcast found.</p>;

  return (
    <div className="podcast-details-container">
      <h1>{podcast.title}</h1>
      <img src={podcast.image} alt={podcast.title} className="podcast-image" />
      <p>{podcast.description}</p>
      <p>
        <strong>Genres:</strong> {getGenreNames(podcast.genreIds)}
      </p>

      {/* Display Seasons */}
      {podcast.seasons && podcast.seasons.length > 0 && (
        <div className="podcast-seasons">
          <h3>Seasons:</h3>
          <ul>
            {podcast.seasons.map((season) => (
              <li key={season.season}>
                <strong>Season {season.season}:</strong> {season.title}
                <p>Episodes: {season.episodes}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Audio Player */}
      <audio ref={audioRef} controls>
        <source src={podcast.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <PlaybackControls audioRef={audioRef} />
    </div>
  );
};

export default PodcastDetails;
