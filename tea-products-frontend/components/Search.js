import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by name or type"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-control"
            />
            <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
        </div>
    );
};

export default Search;
