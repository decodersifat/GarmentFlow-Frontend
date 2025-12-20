import React from 'react';
import { motion } from 'framer-motion';

const Input = ({ label, error, ...props }) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
          error 
            ? 'border-red-500 bg-red-50 focus:ring-red-500' 
            : 'border-gray-300 bg-white hover:border-gray-400'
        } ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1"
        >
          <span>⚠️</span> {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
