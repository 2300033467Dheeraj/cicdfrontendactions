import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="loading-spinner">
      {/* Main Spinner */}
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className="spinner"
      />
      
      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white text-lg font-medium"
      >
        Loading weather data...
      </motion.p>

      {/* Animated Dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            animate="animate"
            transition={{ delay: index * 0.1 }}
            className="w-3 h-3 bg-white rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
