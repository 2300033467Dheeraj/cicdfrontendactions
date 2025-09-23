import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';

const AddFavorite = ({ onAdd, onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleAddCurrent = () => {
    onAdd();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="add-favorite-card"
    >
      <div className="add-favorite-header">
        <h3 className="add-favorite-title">Add Favorite Location</h3>
      </div>

      <form onSubmit={handleSubmit} className="add-favorite-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            disabled={loading}
            className="search-input"
          />
          <div className="search-icon">
            <Search className="h-5 w-5" />
          </div>
        </div>
        <div className="add-favorite-buttons">
          <motion.button
            type="submit"
            disabled={loading || !query.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            {loading ? 'Searching...' : 'Search & Add'}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={handleAddCurrent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-add-current"
          >
            <Plus className="h-4 w-4" />
            Add Current
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddFavorite;
