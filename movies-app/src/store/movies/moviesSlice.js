import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllMovies } from '../../moviesAPI.js';

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const data = await fetchAllMovies();
        return data;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addMovieLocal: (state, action) => {
            state.list.push(action.payload);
        },
        removeMovieLocal: (state, action) => {
            state.list = state.list.filter(movie => movie.id !== action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { removeMovieLocal } = moviesSlice.actions;
export const { addMovieLocal } = moviesSlice.actions;
export default moviesSlice.reducer;
