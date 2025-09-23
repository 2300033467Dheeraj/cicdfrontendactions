import React, { useEffect } from 'react';

const Toast = ({ open, message, onClose, duration = 1800 }) => {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="toast">
      <div className="toast-content">{message}</div>
    </div>
  );
};

export default Toast;


