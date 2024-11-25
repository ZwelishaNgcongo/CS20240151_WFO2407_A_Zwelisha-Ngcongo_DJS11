const API_BASE_URL = "https://podcast-api.netlify.app";

export const fetchShows = async () => {
  const response = await fetch(API_BASE_URL);
  return response.json();
};

export const fetchShowById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/id/${id}`);
  return response.json();
};

export const fetchGenreById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/genre/${id}`);
  return response.json();
};
