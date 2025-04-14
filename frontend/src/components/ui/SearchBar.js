import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useDebounce from '../../hooks/useDebounce';
import './SearchBar.scss';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search...', 
  delay = 300,
  showSuggestions = false,
  suggestions = []
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, delay);
  const inputRef = useRef();

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    inputRef.current.focus();
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="search-input"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        <span className="search-icon">🔍</span>
      </div>
      
      {showSuggestions && isFocused && query && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  delay: PropTypes.number,
  showSuggestions: PropTypes.bool,
  suggestions: PropTypes.arrayOf(PropTypes.string)
};

export default SearchBar;