import React from 'react';

const SearchBar = ({ search, handleInput, handleSearch, handleKeyDown }) => (
    <div className='searchBar'>
        <input
            type='text'
            placeholder="Buscar noticias"
            value={search}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Buscar</button>
    </div>
);

export default SearchBar;
