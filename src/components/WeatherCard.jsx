import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Thermometer, 
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning
} from 'lucide-react';

const WeatherCard = ({ weatherData }) => {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('sunny') || desc.includes('clear')) return <Sun className="weather-icon" />;
    if (desc.includes('cloud')) return <Cloud className="weather-icon" />;
    if (desc.includes('rain') || desc.includes('drizzle')) return <CloudRain className="weather-icon" />;
    if (desc.includes('snow')) return <CloudSnow className="weather-icon" />;
    if (desc.includes('storm') || desc.includes('thunder')) return <CloudLightning className="weather-icon" />;
    if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return <Cloud className="weather-icon" />;
    return <Sun className="weather-icon" />;
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="weather-card"
    >
      {/* Location and Main Weather */}
      <div className="weather-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="weather-location"
        >
          {weatherData.location}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="weather-description"
        >
          {weatherData.description}
        </motion.p>
      </div>

      {/* Temperature and Icon */}
      <div className="weather-main">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center space-x-4"
        >
          <div className="weather-temp">
            {weatherData.temperature}°
          </div>
          <div className="weather-icon">
            {weatherData.weatherIcon}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center md:text-right"
        >
          <p className="text-blue-100 text-lg">
            Feels like {weatherData.feelsLike}°
          </p>
          <p className="text-blue-200 text-sm">
            UV Index: {weatherData.uvIndex}
          </p>
         <p className="text-blue-200 text-sm">
  Sunrise 🌅: {weatherData.sunrise || 'N/A'} 
</p>
<p className="text-blue-200 text-sm">
  Sunset 🌙: {weatherData.sunset || 'N/A'}
</p>

        </motion.div>
      </div>

      {/* Weather Details Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="weather-details"
      >
        <div className="weather-detail">
          <Droplets className="h-6 w-6 text-blue-300 mx-auto mb-2" />
          <p className="detail-value">{weatherData.humidity}%</p>
          <p className="detail-label">Humidity</p>
        </div>

        <div className="weather-detail">
          <Wind className="h-6 w-6 text-blue-300 mx-auto mb-2" />
          <p className="detail-value">{weatherData.windSpeed} km/h</p>
          <p className="detail-label">Wind Speed</p>
        </div>

        <div className="weather-detail">
          <Eye className="h-6 w-6 text-blue-300 mx-auto mb-2" />
          <p className="detail-value">{weatherData.visibility} km</p>
          <p className="detail-label">Visibility</p>
        </div>

        <div className="weather-detail">
          <Gauge className="h-6 w-6 text-blue-300 mx-auto mb-2" />
          <p className="detail-value">{weatherData.pressure} hPa</p>
          <p className="detail-label">Pressure</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherCard;
