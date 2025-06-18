import axios from 'axios';
import { loadConfig } from './config.js';

let api = null;
let token = null;
let config = null;

const initApi = async () => {
    if (api) return;

    config = await loadConfig();

    api = axios.create({
        baseURL: config.VITE_API_URL
    });
};

export const login = async () => {
    if (token) return;

    await initApi();

    try {
        const res = await api.post('/sessions', {
            email: config.VITE_API_USER,
            password: config.VITE_API_PASS,
        });

        if (res.data.status === 0) {
            const userRes = await api.post('/users', {
                email: config.VITE_API_USER,
                name: config.VITE_API_NAME || 'User',
                password: config.VITE_API_PASS,
                confirmPassword: config.VITE_API_PASS,
            });
            token = userRes.data.token;
        } else {
            token = res.data.token;
        }

        api.defaults.headers.common['Authorization'] = `${token}`;

    } catch (err) {
        console.error('Error authorizing', err);
        throw err;
    }
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
    await login();

    const formData = new FormData();
    formData.append('movies', file, file.name || 'movies.txt');

    await api.post('/movies/import', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
