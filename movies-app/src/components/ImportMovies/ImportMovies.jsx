import React, { useState } from 'react';
import { importMovies } from '../../moviesAPI.js';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../store/movies/moviesSlice.js';

import styles from './ImportMovies.module.css'

const ImportMovies = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus('');
    };

    const handleImport = async () => {
        if (!file) {
            setStatus('Choose file');
            return;
        }

        try {
            await importMovies(file);
            setStatus('Success');
            dispatch(fetchMovies());
        } catch (err) {
            console.error(err);
            setStatus('Error');
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>Import movies from .txt file</h2>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <button onClick={handleImport}>Import!</button>
            <p>{status}</p>
        </div>
    );
}

export default ImportMovies;
