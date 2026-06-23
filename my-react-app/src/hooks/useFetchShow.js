// src/hooks/useFetchShow.js

import { useState, useEffect } from 'react';
import { fetchShow } from '../utils/api';

const useFetchShow = (id) => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getShow = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchShow(id);
        if (isMounted) setShow(data);
      } catch (err) {
        if (isMounted) setError('Could not load this show. Please try again later.');
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) getShow();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { show, loading, error };
};

export default useFetchShow;