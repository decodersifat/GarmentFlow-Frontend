import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose, autoClose = 5000 }) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconMap = {
    success: <FiCheck className="w-5 h-5" />,
    error: <FiX className="w-5 h-5" />,
    warning: <FiAlertCircle className="w-5 h-5" />,
    info: <FiInfo className="w-5 h-5" />
  };

  return (
    <div className={`border rounded-lg p-4 flex items-start gap-3 ${typeStyles[type]}`}>
      <div className="shrink-0 mt-0.5">{iconMap[type]}</div>
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        className="shrink-0 ml-auto hover:opacity-70"
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Alert;
