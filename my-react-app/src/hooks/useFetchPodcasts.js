// src/hooks/useFetchPodcasts.js

import { useState, useEffect } from 'react';
import { fetchPreviews } from '../utils/api';

const useFetchPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getPodcasts = async () => {
      try {
        setLoading(true);
        const data = await fetchPreviews();
        if (isMounted) setPodcasts(data);
      } catch (err) {
        if (isMounted) setError('Could not load podcasts. Please try again later.');
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getPodcasts();
    return () => {
      isMounted = false;
    };
  }, []);

  return { podcasts, loading, error };
};

export default useFetchPodcasts;