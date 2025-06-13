import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/moviesSlice.js';

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
});
