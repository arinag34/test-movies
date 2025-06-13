import React from 'react';

import styles from './MovieSearch.module.css'

const MovieSearch = ({ searchQuery, setSearchQuery, searchBy, setSearchBy }) => {
    return (
        <div style={{ marginBottom: '15px' }}>
            <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search by ${searchBy === 'title' ? 'title' : 'actor'}`}
                style={{ padding: '5px', marginRight: '10px' }}
            />
            <select
                value={searchBy}
                onChange={e => setSearchBy(e.target.value)}
                style={{ padding: '5px' }}
            >
                <option value="title">Title</option>
                <option value="actor">Actor</option>
            </select>
        </div>
    );
};

export default MovieSearch;
