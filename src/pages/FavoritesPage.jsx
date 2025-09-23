import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2 } from 'lucide-react';
import FavoriteCard from '../components/FavoriteCard';
import AddFavorite from '../components/AddFavorite';
import { useFavorites } from '../hooks/useFavorites';
import { useWeather } from '../hooks/useWeather';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import TemperatureChart from '../components/TemperatureChart';
import Toast from '../components/Toast';

const FavoritesPage = ({ onBack, onSelectLocation, currentWeather }) => {
  const { favorites, addFavorite, removeFavorite, clearFavorites } = useFavorites();
  const { weatherData, forecastData, hourlyTemps, fetchWeatherData, loading } = useWeather();
  const [showAddForm, setShowAddForm] = useState(false);
  const [pendingAdd, setPendingAdd] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleAddFavorite = () => {
    if (currentWeather) {
      addFavorite(currentWeather);
      setShowAddForm(false);
    }
  };

  const handleSearchAndAdd = async (query) => {
    try {
      setPendingAdd(true);
      await fetchWeatherData(query);
    } catch (error) {
      console.error('Error searching for location:', error);
      setPendingAdd(false);
    }
  };

  useEffect(() => {
    if (pendingAdd && weatherData) {
      addFavorite(weatherData);
      setShowAddForm(false);
      setPendingAdd(false);
      setToastOpen(true);
    }
  }, [pendingAdd, weatherData, addFavorite]);

  const handleSelectLocation = (favorite) => {
    fetchWeatherData(favorite.location);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="container">
      <Toast open={toastOpen} onClose={() => setToastOpen(false)} message="Saved to Favorites" />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="header"
      >
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="back-btn"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </motion.button>
          <div>
            <h1 className="title">Favorite Locations</h1>
            <p className="subtitle">Your saved weather locations</p>
          </div>
        </div>
        
        {favorites.length > 0 && (
          <motion.button
            onClick={clearFavorites}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="clear-favorites-btn"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </motion.button>
        )}
      </motion.div>

      {/* Add Favorite Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="add-favorite-section"
      >
        {!showAddForm ? (
          <motion.button
            onClick={() => setShowAddForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Add New Favorite
          </motion.button>
        ) : (
          <AddFavorite
            onAdd={handleAddFavorite}
            onSearch={handleSearchAndAdd}
            loading={loading}
          />
        )}
      </motion.div>

      {/* Favorites + Details */}
      <div className="weather-content">
        <div>
          <AnimatePresence>
            {favorites.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="favorites-grid"
              >
                {favorites.map((favorite) => (
                  <motion.div
                    key={favorite.id}
                    variants={itemVariants}
                    layout
                  >
                    <FavoriteCard
                      favorite={favorite}
                      onRemove={removeFavorite}
                      onSelect={handleSelectLocation}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-favorites"
              >
                <p>No favorite locations yet. Add some to get started!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {weatherData && (
          <motion.div variants={itemVariants}>
            <WeatherCard weatherData={weatherData} />
            <div className="forecast-section" style={{ marginTop: '1rem' }}>
              <h2 className="forecast-title">5-Day Forecast</h2>
              <div className="forecast-grid">
                {forecastData.map((day) => (
                  <ForecastCard key={day.day} day={day} />
                ))}
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <TemperatureChart hourly={hourlyTemps} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
