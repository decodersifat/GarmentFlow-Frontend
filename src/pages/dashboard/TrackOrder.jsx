import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import API from '../../config/api';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

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
      setTracking(data.tracking);
    } catch (error) {
      toast.error('Failed to load tracking information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <motion.div className="max-w-4xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">Track Order: {order?.orderId}</h1>
      {order && (
        <div className="card mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-bold text-gray-600">Product</p>
              <p className="text-lg">{order.productTitle}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">Status</p>
              <span className={`px-3 py-1 rounded text-white text-sm ${
                order.status === 'Pending' ? 'bg-yellow-500' :
                order.status === 'Approved' ? 'bg-green-500' :
                order.status === 'Rejected' ? 'bg-red-500' : 'bg-gray-500'
              }`}>{order.status}</span>
            </div>
            <div>
              <p className="font-bold text-gray-600">Quantity</p>
              <p>{order.quantity}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">Total Price</p>
              <p className="text-lg font-bold text-blue-600">${order.totalPrice}</p>
            </div>
          </div>
        </div>
      )}

      {tracking && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Shipping Timeline</h2>
          {tracking.updates && tracking.updates.length > 0 ? (
            tracking.updates.map((update, idx) => (
              <motion.div
                key={idx}
                className="flex gap-6 p-6 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="flex flex-col items-center">
                  {idx === tracking.updates.length - 1 ? (
                    <FiCheckCircle className="text-green-500 text-3xl" />
                  ) : (
                    <FiClock className="text-blue-500 text-3xl" />
                  )}
                  {idx < tracking.updates.length - 1 && <div className="w-1 h-16 bg-blue-300 my-2"></div>}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{update.status}</h3>
                  <p className="text-gray-600">{update.location}</p>
                  {update.notes && <p className="text-gray-600 mt-2">{update.notes}</p>}
                  <p className="text-sm text-gray-500 mt-2">{new Date(update.timestamp).toLocaleString()}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600">No tracking updates yet</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TrackOrder;
