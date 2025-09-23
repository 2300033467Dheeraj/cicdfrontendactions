import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, X } from 'lucide-react';

const AlertBanner = ({ type, message, onClose }) => {
  const getAlertIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-400/30 text-yellow-100';
      case 'error':
        return 'bg-red-500/20 border-red-400/30 text-red-100';
      case 'info':
      default:
        return 'bg-blue-500/20 border-blue-400/30 text-blue-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="alert-banner"
    >
      <div className="flex items-center space-x-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          {getAlertIcon()}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 text-sm md:text-base font-medium"
        >
          {message}
        </motion.p>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default AlertBanner;
