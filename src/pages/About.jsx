import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="section-title">About GarmentFlow</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="text-gray-600 mb-4 text-lg">
            GarmentFlow is a comprehensive platform designed to revolutionize garment production management for small and medium-sized factories.
          </p>
          <p className="text-gray-600 mb-4">
            Our mission is to simplify order management, streamline production workflows, and ensure timely deliveries through real-time tracking and efficient coordination.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
          alt="About"
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To be the leading platform that empowers garment factories worldwide to achieve operational excellence.
          </p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Our Values</h3>
          <p className="text-gray-600">
            Quality, Reliability, Innovation, and Customer-Centric approach guide our every decision.
          </p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Our Commitment</h3>
          <p className="text-gray-600">
            We're committed to continuous improvement and helping your business grow sustainably.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
