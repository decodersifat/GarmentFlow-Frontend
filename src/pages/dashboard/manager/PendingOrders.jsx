import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../../config/api';
import toast from 'react-hot-toast';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/admin/all', {
        params: { status: 'Pending' }
      });
      setOrders(data.orders);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (orderId) => {
    try {
      await API.patch(`/orders/${orderId}/approve`);
      toast.success('Order approved');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to approve order');
    }
  };

  const handleReject = async (orderId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await API.patch(`/orders/${orderId}/reject`);
        toast.success('Order rejected');
        fetchOrders();
      } catch (error) {
        toast.error('Failed to reject order');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-12"
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
        Pending Orders
      </motion.h1>
      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-md p-12 text-center"
        >
          <p className="text-gray-600 text-lg">No pending orders</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="border p-3 text-left font-semibold">Order ID</th>
                  <th className="border p-3 text-left font-semibold">Customer</th>
                  <th className="border p-3 text-left font-semibold">Product</th>
                  <th className="border p-3 text-left font-semibold">Qty</th>
                  <th className="border p-3 text-left font-semibold">Date</th>
                  <th className="border p-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="border p-3">{order.orderId || `#${order._id?.slice(-6)}`}</td>
                    <td className="border p-3">{order.userId?.name || order.firstName || 'N/A'}</td>
                    <td className="border p-3">{order.productId?.name || order.productTitle || 'N/A'}</td>
                    <td className="border p-3">{order.quantity}</td>
                    <td className="border p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="border p-3">
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleApprove(order._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition shadow-md hover:shadow-lg font-semibold"
                        >
                          Approve
                        </motion.button>
                        <motion.button
                          onClick={() => handleReject(order._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition shadow-md hover:shadow-lg font-semibold"
                        >
                          Reject
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PendingOrders;
