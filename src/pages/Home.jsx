import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiStar, FiUsers, FiBox, FiTruck, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import API from '../config/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(0);

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-bl from-primary-50 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-gradient-to-tr from-accent-50 to-transparent opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-white border border-secondary-200 rounded-full px-4 py-2 mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium text-secondary-600">Now available for enterprise</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-secondary-900 leading-tight mb-6">
                Production <br />
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-secondary-600 mb-10 max-w-lg leading-relaxed">
                Streamline your garment manufacturing with our intelligent tracking system. From order to delivery, we've got you covered.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary flex items-center space-x-2 group">
                  <span>Explore Collection</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn More
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex items-center space-x-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-secondary-200 overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current" size={16} />)}
                  </div>
                  <p className="text-sm text-secondary-600 font-medium mt-1">Trusted by 500+ factories</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-premium p-4 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop"
                  alt="Dashboard Preview"
                  className="rounded-xl w-full"
                />

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-12 top-1/4 bg-white p-4 rounded-xl shadow-glass border border-white/20 backdrop-blur-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <FiCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-secondary-500">Order Status</p>
                      <p className="font-bold text-secondary-900">Completed</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-8 bottom-1/4 bg-white p-4 rounded-xl shadow-glass border border-white/20 backdrop-blur-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                      <FiActivity size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-secondary-500">Production</p>
                      <p className="font-bold text-secondary-900">+24% Growth</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-200/30 to-accent-200/30 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FiUsers />, number: '500+', label: 'Active Factories' },
              { icon: <FiBox />, number: '20k+', label: 'Orders Processed' },
              { icon: <FiTruck />, number: '98%', label: 'On-time Delivery' },
              { icon: <FiStar />, number: '4.9', label: 'Client Rating' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-secondary-900 mb-2">{stat.number}</h3>
                <p className="text-secondary-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Collections</h2>
            <p className="section-subtitle">
              Discover our premium selection of garments, crafted with precision and ready for mass production.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card card-hover group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-6 aspect-[4/3]">
                    <img
                      src={product.images[0] || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        to={`/products/${product._id}`}
                        className="bg-white text-secondary-900 px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xl text-secondary-900 mb-2">{product.name}</h3>
                  <p className="text-secondary-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-secondary-100">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <span className="text-sm font-medium text-secondary-500 bg-secondary-100 px-3 py-1 rounded-full">
                      {product.availableQuantity} in stock
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-secondary inline-flex items-center space-x-2">
              <span>View All Products</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title text-left mb-6">Why Choose GarmentFlow?</h2>
              <p className="text-lg text-secondary-600 mb-8">
                We provide end-to-end visibility and control over your garment production process.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Real-Time Tracking', desc: 'Monitor every stage of production from cutting to finishing.' },
                  { title: 'Quality Assurance', desc: 'Automated quality checks at key production milestones.' },
                  { title: 'Global Logistics', desc: 'Integrated shipping partners for worldwide delivery.' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                      <FiCheck size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-secondary-900 mb-2">{feature.title}</h3>
                      <p className="text-secondary-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-accent-200 rounded-3xl transform rotate-3 scale-105 opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&h=600&fit=crop"
                alt="Factory Floor"
                className="relative rounded-3xl shadow-premium"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Feedback Carousel */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-16">What Our Clients Say</h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentFeedback * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {[
                  { name: "Sarah Johnson", role: "Production Manager", text: "GarmentFlow has revolutionized our production line. We've cut down delays by 40%." },
                  { name: "Michael Chen", role: "Factory Owner", text: "The real-time tracking feature is a game changer. My clients love the transparency." },
                  { name: "Emma Davis", role: "Quality Control Lead", text: "Managing quality checks has never been easier. Highly recommended for any garment factory." }
                ].map((feedback, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center text-primary-600 text-2xl font-bold">
                        {feedback.name.charAt(0)}
                      </div>
                      <p className="text-xl text-secondary-700 italic mb-6">"{feedback.text}"</p>
                      <h4 className="font-bold text-secondary-900">{feedback.name}</h4>
                      <p className="text-sm text-secondary-500">{feedback.role}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentFeedback(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentFeedback === idx ? 'bg-primary-600' : 'bg-secondary-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-900 to-primary-800 text-white px-8 py-16 md:px-16 md:py-20 text-center shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">Ready to Transform Your Production?</h2>
              <p className="text-xl text-primary-100 mb-10">
                Join hundreds of garment factories already using GarmentFlow to streamline their operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-primary-900 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg"
                >
                  Get Started Now
                </Link>
                <Link
                  to="/contact"
                  className="bg-primary-700/50 backdrop-blur-sm border border-primary-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
