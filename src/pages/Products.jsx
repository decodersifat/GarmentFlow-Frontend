import React from 'react';
import { motion } from 'framer-motion';

const Products = () => {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="section-title">All Products</h1>
      <p className="text-gray-600 text-center mb-8">Coming soon - Product listing page</p>
    </motion.div>
  );
};

export default Products;
