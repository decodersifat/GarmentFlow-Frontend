import React from 'react';
import { motion } from 'framer-motion';

const Select = ({ label, error, options, ...props }) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white ${
          error 
            ? 'border-red-500 bg-red-50 focus:ring-red-500' 
            : 'border-gray-300 hover:border-gray-400'
        } ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        {options?.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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

export default Select;
