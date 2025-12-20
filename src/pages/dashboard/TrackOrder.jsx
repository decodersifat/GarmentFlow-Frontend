import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import API from '../../config/api';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiClock, FiMapPin } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';

const TrackOrder = () => {
  const { orderId } = useParams();
  const [tracking, setTracking] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracking();
  }, [orderId]);

  const fetchTracking = async () => {
    try {
      const { data } = await API.get(`/orders/${orderId}`);
      setOrder(data.order);
      setTracking(data.tracking || []);
    } catch (error) {
      toast.error('Failed to load tracking information');
      setTracking([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading tracking information..." />;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="section-title"
      >
        Track Order: {order?.orderId || 'N/A'}
      </motion.h1>
      {order && (
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-bold text-gray-600 mb-1">Product</p>
              <p className="text-lg font-semibold">{order.productTitle}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <p className="font-bold text-gray-600 mb-1">Status</p>
              <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold inline-block ${
                order.status === 'Pending' ? 'bg-yellow-500' :
                order.status === 'Approved' ? 'bg-green-500' :
                order.status === 'Rejected' ? 'bg-red-500' :
                order.status === 'Delivered' ? 'bg-blue-500' : 'bg-gray-500'
              }`}>
                {order.status}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-bold text-gray-600 mb-1">Quantity</p>
              <p className="text-lg">{order.quantity} units</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <p className="font-bold text-gray-600 mb-1">Total Price</p>
              <p className="text-2xl font-bold text-blue-600">${order.totalPrice}</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {tracking && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Timeline</h2>
          {tracking.updates && tracking.updates.length > 0 ? (
            tracking.updates.map((update, idx) => (
              <motion.div
                key={idx}
                className="flex gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1, type: 'spring' }}
                  >
                    {idx === tracking.updates.length - 1 ? (
                      <FiCheckCircle className="text-green-500 text-3xl" />
                    ) : (
                      <FiClock className="text-blue-500 text-3xl" />
                    )}
                  </motion.div>
                  {idx < tracking.updates.length - 1 && (
                    <motion.div
                      className="w-1 h-16 bg-gradient-to-b from-blue-300 to-blue-100 my-2 rounded"
                      initial={{ height: 0 }}
                      animate={{ height: 64 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{update.status}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FiMapPin className="text-blue-500" />
                    <p>{update.location}</p>
                  </div>
                  {update.notes && (
                    <p className="text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg">{update.notes}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                    <FiClock className="text-gray-400" />
                    {new Date(update.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md p-12 text-center"
            >
              <p className="text-gray-600 text-lg">No tracking updates yet</p>
              <p className="text-gray-500 text-sm mt-2">Updates will appear here once production begins</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TrackOrder;
