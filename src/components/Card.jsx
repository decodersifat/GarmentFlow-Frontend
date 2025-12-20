import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 ${hover ? 'hover:shadow-xl hover:border-blue-200' : ''} transition-all duration-300 ${className}`}
      whileHover={hover ? { y: -2 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;
