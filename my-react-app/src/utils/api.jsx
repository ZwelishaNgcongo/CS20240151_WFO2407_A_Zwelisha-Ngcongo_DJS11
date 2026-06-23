// src/utils/api.js

const BASE_URL = 'https://podcast-api.netlify.app';

/* Placeholder audio track used for every episode, per spec note.
   SoundHelix hosts freely-licensed MP3s commonly used for exactly this
   kind of testing/demo purpose, and serves them with CORS enabled. */
export const PLACEHOLDER_AUDIO_URL =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

/* Returns an array of PREVIEW objects */
export const fetchPreviews = async () => {
  const response = await fetch(BASE_URL);
  return handleResponse(response);
};

/* Returns a SHOW object, with SEASON and EPISODE objects embedded */
export const fetchShow = async (id) => {
  const response = await fetch(`${BASE_URL}/id/${id}`);
  return handleResponse(response);
};

/* Returns a GENRE object */
export const fetchGenre = async (id) => {
  const response = await fetch(`${BASE_URL}/genre/${id}`);
  return handleResponse(response);
};