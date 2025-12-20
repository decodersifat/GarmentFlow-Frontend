import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowRight } from 'react-icons/fi';

const NotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition font-semibold"
      >
        <FiHome /> Go Back Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
