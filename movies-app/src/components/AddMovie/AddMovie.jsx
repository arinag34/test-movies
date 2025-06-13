import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../moviesAPI.js';
import {addMovieLocal, fetchMovies} from '../../store/movies/moviesSlice.js';
import StatusMessage from "../../assets/StatusMessage.jsx";

const AddMovie = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [format, setFormat] = useState('DVD');
    const [actors, setActors] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const actorsArray = actors.split(',').map(s => s.trim());
            const newMovie = await addMovie({ title, year: Number(year), format, actors: actorsArray });
            setStatus('Added successfully');
            dispatch(addMovieLocal(newMovie));
            setTitle(''); setYear(''); setFormat('DVD'); setActors('');
        } catch (err) {
            console.error(err);
            setStatus('Error adding');
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>Add movie</h2>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
                <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Year" required />
                <select value={format} onChange={e => setFormat(e.target.value)}>
                    <option>VHS</option>
                    <option>DVD</option>
                    <option>Blu-Ray</option>
                </select>
                <input value={actors} onChange={e => setActors(e.target.value)} placeholder="Actors(separated by comma)" required />
                <button type="submit">Add</button>
            </form>

            <StatusMessage status={status} />

        </div>
    );
};

export default AddMovie;
