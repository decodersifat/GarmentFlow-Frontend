import React from 'react';
import { motion } from 'framer-motion';

const Suspended = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 bg-gradient-to-br from-red-50 to-orange-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-md text-center border-2 border-red-200"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="text-6xl mb-6"
        >
          ⚠️
        </motion.div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Account Suspended</h1>
        <p className="text-gray-700 mb-3 text-lg font-medium">Your account has been suspended.</p>
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          Please contact our support team for more information about your account status and how to resolve this issue.
        </p>
        <motion.a
          href="mailto:support@garmentflow.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg font-semibold"
        >
          Contact Support
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Suspended;
