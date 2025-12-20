import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { FiTarget, FiHeart, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const values = [
    {
      icon: FiTarget,
      title: 'Our Vision',
      description: 'To be the leading platform that empowers garment factories worldwide to achieve operational excellence.'
    },
    {
      icon: FiHeart,
      title: 'Our Values',
      description: 'Quality, Reliability, Innovation, and Customer-Centric approach guide our every decision.'
    },
    {
      icon: FiCheckCircle,
      title: 'Our Commitment',
      description: 'We\'re committed to continuous improvement and helping your business grow sustainably.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="section-title">About GarmentFlow</h1>
      
      {/* Main Section */}
      <motion.div 
        className="grid md:grid-cols-2 gap-8 items-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="text-gray-600 mb-4 text-lg leading-relaxed">
            GarmentFlow is a comprehensive platform designed to revolutionize garment production management for small and medium-sized factories.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our mission is to simplify order management, streamline production workflows, and ensure timely deliveries through real-time tracking and efficient coordination.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built with input from industry experts, GarmentFlow combines intuitive design with powerful features to handle every aspect of your production process.
          </p>
        </div>
        <motion.img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
          alt="About"
          className="rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Values Section */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="text-center h-full flex flex-col">
                <Icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 flex-1">{value.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid md:grid-cols-4 gap-6 bg-blue-50 p-8 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { number: '500+', label: 'Active Users' },
          { number: '10K+', label: 'Orders Managed' },
          { number: '98%', label: 'On-Time Delivery' },
          { number: '24/7', label: 'Support Available' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</p>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;
