import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './store/movies/moviesSlice.js';
import ImportMovies from "./components/ImportMovies/ImportMovies.jsx";
import AddMovie from "./components/AddMovie/AddMovie.jsx";
import MovieList from "./components/MovieList/MovieList.jsx";

function App() {
    const dispatch = useDispatch();
    const { list, status } = useSelector(state => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <div>
            <h1>Movie list</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <MovieList />
            )}

            <ImportMovies />
            <AddMovie />
            {status === 'failed' && <p>Failed to load movies</p>}
        </div>
    );
}

export default App;
