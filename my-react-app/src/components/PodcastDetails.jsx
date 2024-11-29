import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShow } from '../utils/api'; // Import the fetchShow function
import PlaybackControls from './PlaybackControls'; // Import PlaybackControls

const PodcastDetails = () => {
  const { id } = useParams(); // Get the podcast ID from the URL
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null); // Create a ref for the audio element

  useEffect(() => {
    const getPodcastDetails = async () => {
      try {
        const data = await fetchShow(id); // Fetch podcast details using the ID
        setPodcast(data);
      } catch (err) {
        setError('Error fetching podcast details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPodcastDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!podcast) {
    return <div>No podcast found.</div>;
  }

  return (
    <div className="podcast-details-container">
      <h1>{podcast.title}</h1>
      <img src={podcast.image} alt={podcast.title} />
      <p>{podcast.description}</p>
      <audio ref={audioRef} controls>
        <source src={podcast.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {/* Use the PlaybackControls component here */}
      <PlaybackControls audioRef={audioRef} />
    </div>
  );
};

export default PodcastDetails;