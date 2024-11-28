import { useState, useEffect } from 'react';
import { fetchPreviews } from '../utils/api';

const useFetchPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPodcasts = async () => {
      try {
        const data = await fetchPreviews();
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    getPodcasts();
  }, []);

  return { podcasts, loading };
};

export default useFetchPodcasts;