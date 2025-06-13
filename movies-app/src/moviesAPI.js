import axios from 'axios';
import config from '../src/config.js';

const api = axios.create({
    baseURL: config.API_URL
});

let token = null;

export const login = async () => {
    if (token) return;

    try {
        const res = await api.post('/sessions', {
            email: import.meta.env.VITE_API_USER,
            password: import.meta.env.VITE_API_PASS,
        });
        token = res.data.token;
    } catch (err) {
        const res = await api.post('/users', {
            email: import.meta.env.VITE_API_USER,
            name: import.meta.env.VITE_API_NAME || 'User',
            password: import.meta.env.VITE_API_PASS,
            confirmPassword: import.meta.env.VITE_API_PASS,
        });
        token = res.data.token;
    }

    api.defaults.headers.common['Authorization'] = `${token}`;
};


export const fetchAllMovies = async () => {
    await login();
    const response = await api.get('/movies');
    return response.data.data;
};

export const fetchMovieById = async (id) => {
    await login();
    const response = await api.get(`/movies/${id}`);
    return response.data;
};

export const deleteMovie = async (id) => {
    await login();
    await api.delete(`/movies/${id}`);
};

export const addMovie = async (movieData) => {
    await login();

    const response = await api.post('/movies', movieData);
    return response.data.data;
};

export const importMovies = async (file) => {
    const formData = new FormData();
    formData.append('movies', file, file.name || 'movies.txt');

    await api.post('/movies/import', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


