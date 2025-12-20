import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0"></div>
      </motion.div>
      <motion.p
        className="text-gray-600 mt-4 font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default LoadingSpinner;
