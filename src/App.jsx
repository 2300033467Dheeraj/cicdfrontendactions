import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WeatherPage from './pages/WeatherPage';
import FavoritesPage from './pages/FavoritesPage';
import MapPage from "./pages/MapPage";
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('weather');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  // Navigate to favorites
  const handleFavoritesClick = () => {
    setCurrentPage('favorites');
  };

  // Navigate back to weather
  const handleBackToWeather = () => {
    setCurrentPage('weather');
  };

  // Select location from favorites
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setCurrentPage('weather');
  };

  // Weather data loaded callback
  const handleWeatherLoaded = (weather) => {
    setCurrentWeather(weather);
  };

  return (
    <div className="weather-app">
      {/* Render Navbar only if NOT on favorites or map pages */}
      {currentPage !== 'favorites' && currentPage !== 'map' && (
        <Navbar onNavigate={setCurrentPage} />
      )}

      {currentPage === 'weather' && (
        <div className="container">
          <WeatherPage 
            onFavoritesClick={handleFavoritesClick} 
            selectedLocation={selectedLocation}
            onWeatherLoaded={handleWeatherLoaded}
          />
        </div>
      )}

      {currentPage === 'favorites' && (
        <FavoritesPage 
          onBack={handleBackToWeather} 
          onSelectLocation={handleSelectLocation}
          currentWeather={currentWeather}
        />
      )}

      {currentPage === 'map' && (
        <MapPage 
          onBack={handleBackToWeather}
        />
      )}
    </div>
  );
}

export default App;
