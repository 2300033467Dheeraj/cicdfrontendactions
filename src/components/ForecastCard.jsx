import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning 
} from 'lucide-react';

const ForecastCard = ({ day }) => {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('sunny') || desc.includes('clear')) return <Sun className="forecast-icon" />;
    if (desc.includes('cloud')) return <Cloud className="forecast-icon" />;
    if (desc.includes('rain') || desc.includes('drizzle')) return <CloudRain className="forecast-icon" />;
    if (desc.includes('snow')) return <CloudSnow className="forecast-icon" />;
    if (desc.includes('storm') || desc.includes('thunder')) return <CloudLightning className="forecast-icon" />;
    if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return <Cloud className="forecast-icon" />;
    return <Sun className="forecast-icon" />;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className="forecast-card"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="forecast-day"
      >
        {day.day}
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mb-3"
      >
        <div className="forecast-icon">
          {getWeatherIcon(day.description)}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-1"
      >
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-lg">{day.high}°</span>
          <span className="text-blue-200 text-sm">{day.low}°</span>
        </div>
        <p className="forecast-desc">{day.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default ForecastCard;
