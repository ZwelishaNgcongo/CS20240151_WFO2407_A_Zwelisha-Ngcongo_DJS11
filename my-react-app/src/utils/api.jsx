const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchPreviews = async () => {
    const response = await fetch(BASE_URL);
    return response.json();
};

export const fetchShow = async (id) => {
    const response = await fetch(`${BASE_URL}/id/${id}`);
    return response.json();
};

export const fetchGenre = async (id) => {
    const response = await fetch(`${BASE_URL}/genre/${id}`);
    return response.json();
};

