import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import TemperatureChart from '../components/TemperatureChart';
import ForecastCard from '../components/ForecastCard';
import AlertBanner from '../components/AlertBanner';
import LoadingSpinner from '../components/LoadingSpinner';
import AQICard from '../components/AQICard';
import WeatherAlerts from '../components/WeatherAlerts';
import { useWeather } from '../hooks/useWeather';

const WeatherPage = ({ onFavoritesClick, selectedLocation, onWeatherLoaded }) => {
  const {
    weatherData,
    forecastData,
    hourlyTemps,
    alerts,
    aqiData,
    loading,
    error,
    fetchWeatherData,
    fetchWeatherByLocation,
    clearError
  } = useWeather();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load weather for a default city on initial load
    if (!selectedLocation) {
      fetchWeatherData('London');
    }
  }, [fetchWeatherData, selectedLocation]);

  useEffect(() => {
    // If a favorite was selected, fetch its weather
    if (selectedLocation) {
      setSearchQuery(selectedLocation);
      fetchWeatherData(selectedLocation);
    }
  }, [selectedLocation, fetchWeatherData]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    await fetchWeatherData(query);
  };

  // Listen to global search and my-location events from Navbar
  useEffect(() => {
    const onSearchEvent = (e) => {
      const q = e?.detail?.query || '';
      if (q) {
        handleSearch(q);
      }
    };

    const onMyLocation = async () => {
      if (fetchWeatherByLocation) {
        await fetchWeatherByLocation();
      }
    };

    window.addEventListener('app:search', onSearchEvent);
    window.addEventListener('app:my-location', onMyLocation);
    return () => {
      window.removeEventListener('app:search', onSearchEvent);
      window.removeEventListener('app:my-location', onMyLocation);
    };
  }, [fetchWeatherByLocation]);

  useEffect(() => {
    if (weatherData && onWeatherLoaded) {
      onWeatherLoaded(weatherData);
    }
  }, [weatherData, onWeatherLoaded]);

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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="header"
      >
       
        <p className="subtitle">
          Get accurate weather information for any location
        </p>
      </motion.div>

      {/* Search moved to fixed Navbar; keep space in layout via navbar spacer */}

      {/* Alerts */}
      <AnimatePresence>
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {alerts.map((alert) => (
              <AlertBanner
                key={alert.id}
                type={alert.type}
                message={alert.message}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-spinner"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weather Content */}
      <AnimatePresence>
        {!loading && weatherData && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="weather-content"
          >
            {/* Current Weather */}
            <motion.div variants={itemVariants}>
              <WeatherCard weatherData={weatherData} />
            </motion.div>

            {/* Air Quality Index */}
            <motion.div variants={itemVariants}>
              <AQICard aqiData={aqiData} loading={loading} />
            </motion.div>

            {/* Today's Temperature Chart */}
            <motion.div variants={itemVariants}>
              <TemperatureChart hourly={hourlyTemps} />
            </motion.div>

            {/* Weather Alerts */}
            <motion.div variants={itemVariants}>
              <WeatherAlerts alerts={{ weatherData, forecastData }} />
            </motion.div>
            

            {/* 5-Day Forecast */}
            <motion.div variants={itemVariants}>
              <div className="forecast-section">
                <h2 className="forecast-title">
                  5-Day Forecast
                </h2>
                <div className="forecast-grid">
                  {forecastData.map((day, index) => (
                    <motion.div
                      key={day.day}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ForecastCard day={day} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="error-message"
          >
            <p>{error}</p>
            <button
              onClick={clearError}
              className="btn mt-2"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherPage;
