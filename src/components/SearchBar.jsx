import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Heart } from 'lucide-react';

const SearchBar = ({ onSearch, onLocationSearch, onFavoritesClick, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleLocationClick = () => {
    if (onLocationSearch) {
      onLocationSearch();
    }
  };

  const handleFavoritesClick = () => {
    if (onFavoritesClick) {
      onFavoritesClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="search-container"
    >
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name..."
            disabled={loading}
            className="search-input"
          />
          <div className="search-icon">
            <Search className="h-5 w-5" />
          </div>
          <div className="location-icon">
            <MapPin className="h-5 w-5" />
          </div>
        </div>
        <div className="button-group">
          <motion.button
            type="submit"
            disabled={loading || !query.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            {loading ? 'Searching...' : 'Get Weather'}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={handleLocationClick}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-location"
          >
            <MapPin className="h-4 w-4" />
            My Location
          </motion.button>
          
          <motion.button
            type="button"
            onClick={handleFavoritesClick}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-favorites"
          >
            <Heart className="h-4 w-4" />
            Favorites
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;
