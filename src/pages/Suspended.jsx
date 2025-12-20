import React from 'react';
import { motion } from 'framer-motion';

const Suspended = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-red-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Account Suspended</h1>
        <p className="text-gray-600 mb-2">Your account has been suspended.</p>
        <p className="text-gray-500 text-sm mb-6">
          Please contact our support team for more information about your account status.
        </p>
        <a
          href="mailto:support@garmentflow.com"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition font-semibold"
        >
          Contact Support
        </a>
      </div>
    </motion.div>
  );
};

export default Suspended;
