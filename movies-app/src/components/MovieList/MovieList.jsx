import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchMovies, removeMovieLocal} from '../../store/movies/moviesSlice.js';
import {deleteMovie, fetchMovieById} from "../../moviesAPI.js";
import MovieSearch from "../MovieSearch/MovieSearch.jsx";

import styles from './MovieList.module.css'

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.list);
    const status = useSelector(state => state.movies.status);

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('title');
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const filter = async () => {
            const query = searchQuery.toLowerCase();

            if (searchBy === 'title') {
                const result = movies.filter(movie =>
                    movie.title.toLowerCase().includes(query)
                );
                setFilteredMovies(result);
            } else if (searchBy === 'actor') {
                const result = [];

                for (const movie of movies) {
                    try {
                        const fullMovie = await fetchMovieById(movie.id);
                        const hasActor = fullMovie.data.actors.some(actor =>
                            actor.name.toLowerCase().includes(query)
                        );
                        if (hasActor) result.push(movie);
                    } catch (err) {
                        console.error(`Error fetching ${movie.id}:`, err);
                    }
                }

                setFilteredMovies(result);
            }
        };

        if (searchQuery.trim() === '') {
            setFilteredMovies(movies);
        } else {
            filter();
        }
    }, [searchQuery, searchBy, movies]);

    const handleDelete = async (id) => {
        try {
            await deleteMovie(id);
            dispatch(removeMovieLocal(id));
            dispatch(fetchMovies());
        } catch (err) {
            console.error('Error deleting:', err);
        }
    };

    const handleInfo = async (id) => {
        try {
            const movie = await fetchMovieById(id);
            setSelectedMovie(movie);
        } catch (err) {
            console.error('Error fetching info:', err);
        }
    };

    return (
        <div>

            <MovieSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
            />

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error loading movies</p>}
            {status === 'succeeded' && (
                <ul>
                    {[...filteredMovies]
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map(movie => (
                        <li key={movie.id} style={{ marginBottom: '10px' }}>
                            <strong>{movie.title}</strong> ({movie.year}) — {movie.format}
                            <button
                                onClick={() => handleDelete(movie.id)}
                                style={{
                                    marginLeft: '10px',
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleInfo(movie.id)}
                                style={{
                                    marginLeft: '10px',
                                    background: 'blue',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer'
                                }}
                            >
                                +
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {selectedMovie && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>Detailed information</h3>
                    <p><strong>Title:</strong> {selectedMovie.data.title}</p>
                    <p><strong>Year:</strong> {selectedMovie.data.year}</p>
                    <p><strong>Format:</strong> {selectedMovie.data.format}</p>
                    <p><strong>Actors:</strong> {selectedMovie.data.actors?.map(a => a.name).join(', ')}</p>
                    <button onClick={() => setSelectedMovie(null)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default MovieList;
