import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowRight } from 'react-icons/fi';

const NotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 bg-gradient-to-br from-blue-50 to-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-9xl font-bold text-blue-600 mb-4"
      >
        404
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-gray-900 mb-4"
      >
        Page Not Found
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 text-center max-w-md text-lg"
      >
        Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl font-semibold"
        >
          <FiHome /> Go Back Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
