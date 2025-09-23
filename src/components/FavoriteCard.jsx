import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

const FavoriteCard = ({ favorite, onRemove, onSelect }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(favorite.id);
  };

  const handleSelect = () => {
    onSelect(favorite);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="favorite-card"
      onClick={handleSelect}
    >
      <div className="favorite-header">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-300" />
          <h3 className="favorite-location">{favorite.location}</h3>
        </div>
        <button
          onClick={handleRemove}
          className="remove-favorite-btn"
          title="Remove from favorites"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="favorite-main">
        <div className="flex items-center space-x-3">
          <div className="favorite-temp">{favorite.temperature}°</div>
          <div className="favorite-icon">{favorite.weatherIcon}</div>
        </div>
        <div className="favorite-description">{favorite.description}</div>
      </div>

      <div className="favorite-details">
        <div className="favorite-detail">
          <span className="detail-value">{favorite.humidity}%</span>
          <span className="detail-label">Humidity</span>
        </div>
        <div className="favorite-detail">
          <span className="detail-value">{favorite.windSpeed} km/h</span>
          <span className="detail-label">Wind</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FavoriteCard;
