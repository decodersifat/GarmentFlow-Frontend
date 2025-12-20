import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiStar, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import API from '../config/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products/home/featured');
      setProducts(data);
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Streamline Your Garment Production
            </h1>
            <p className="text-lg mb-8 text-blue-50">
              GarmentFlow helps you track orders, manage production stages, and ensure timely delivery with ease.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/products"
                className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
              >
                Explore Products <FiArrowRight />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop"
              alt="Garment Production"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our curated collection of premium garments ready for production
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  className="card group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="overflow-hidden rounded-lg mb-4 h-48">
                    <img
                      src={product.images[0] || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Qty: {product.availableQuantity}
                    </span>
                  </div>
                  <Link
                    to={`/products/${product._id}`}
                    className="block w-full bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600 transition"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 transition font-semibold"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="section-title">How It Works</h2>
            <p className="text-gray-600">Three simple steps to manage your orders</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { step: '1', title: 'Place Order', desc: 'Browse products and place your order with custom specifications' },
              { step: '2', title: 'Production', desc: 'Track your order through cutting, sewing, and finishing stages' },
              { step: '3', title: 'Delivery', desc: 'Receive real-time updates until your order is delivered' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center p-8 bg-white rounded-lg shadow-md"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="section-title">Customer Feedback</h2>
            <p className="text-gray-600">What our clients say about us</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Sarah Ahmed', role: 'Factory Manager', feedback: 'GarmentFlow transformed our production workflow. Amazing platform!' },
              { name: 'John Smith', role: 'Buyer', feedback: 'Real-time tracking is exactly what we needed. Highly recommended!' },
              { name: 'Emma Wilson', role: 'Operations Lead', feedback: 'Best investment for our garment business. Worth every penny!' }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="card"
                variants={itemVariants}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-yellow-400 text-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.feedback}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <FiUsers size={32} />, number: '500+', label: 'Active Users' },
            { icon: <FiCheck size={32} />, number: '2000+', label: 'Orders Processed' },
            { icon: <FiArrowRight size={32} />, number: '98%', label: 'On-time Delivery' },
            { icon: <FiStar size={32} />, number: '4.9/5', label: 'User Rating' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.number}</div>
              <div className="text-blue-50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
