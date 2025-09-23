import React from 'react';
import { Smile, Meh, Frown } from "lucide-react";

import { motion } from 'framer-motion';

const AQICard = ({ aqiData, loading }) => {
  const getAQIInfo = (aqi) => {
  if (aqi === 1 || aqi === 2)
    return { 
      level: 'Good', 
      icon: <Smile className="w-6 h-6 text-green-500" />, 
      color: '#10B981', 
      bgColor: 'rgba(16, 185, 129, 0.1)', 
      textColor: '#10B981' 
    };

  if (aqi === 3)
    return { 
      level: 'Moderate', 
      icon: <Meh className="w-6 h-6 text-yellow-500" />, 
      color: '#F59E0B', 
      bgColor: 'rgba(245, 158, 11, 0.1)', 
      textColor: '#F59E0B' 
    };

  return { 
     level: 'Moderate', 
      icon: <Meh className="w-6 h-6 text-yellow-500" />, 
      color: '#F59E0B', 
      bgColor: 'rgba(245, 158, 11, 0.1)', 
      textColor: '#F59E0B' 
  };
};

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="aqi-card"
      >
        <div className="aqi-header">
          <h3>Air Quality Index</h3>
        </div>
        <div className="aqi-loading">
          <div className="shimmer"></div>
        </div>
      </motion.div>
    );
  }

  if (!aqiData) {
    return null;
  }

  const aqiInfo = getAQIInfo(aqiData.aqi);
  const pollutants = aqiData.components;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="aqi-card"
    >
      <div className="aqi-header">
        <h3>Air Quality Index</h3>
      </div>
      
      <div className="aqi-main">
        <div className="aqi-value" style={{ color: aqiInfo.color }}>
          {aqiData.aqi}
        </div>
        <div className="aqi-level flex items-center gap-2" style={{ color: aqiInfo.textColor }}>
  {aqiInfo.icon}
  <span>{aqiInfo.level}</span>
</div>

      </div>

      <div className="aqi-indicator">
        <div 
          className="aqi-bar"
          style={{ 
            background: `linear-gradient(90deg, ${aqiInfo.color} 0%, ${aqiInfo.color} ${(aqiData.aqi / 300) * 100}%, rgba(255,255,255,0.1) ${(aqiData.aqi / 300) * 100}%, rgba(255,255,255,0.1) 100%)`
          }}
        ></div>
      </div>

      <div className="aqi-pollutants">
        <div className="pollutant">
          <span className="pollutant-label">PM2.5</span>
          <span className="pollutant-value">{pollutants.pm2_5?.toFixed(1)} μg/m³</span>
        </div>
        <div className="pollutant">
          <span className="pollutant-label">PM10</span>
          <span className="pollutant-value">{pollutants.pm10?.toFixed(1)} μg/m³</span>
        </div>
        <div className="pollutant">
          <span className="pollutant-label">NO₂</span>
          <span className="pollutant-value">{pollutants.no2?.toFixed(1)} μg/m³</span>
        </div>
        <div className="pollutant">
          <span className="pollutant-label">O₃</span>
          <span className="pollutant-value">{pollutants.o3?.toFixed(1)} μg/m³</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AQICard;
