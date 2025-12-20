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

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <motion.div className="max-w-7xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">Pending Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3 text-left">Order ID</th>
              <th className="border p-3 text-left">Customer</th>
              <th className="border p-3 text-left">Product</th>
              <th className="border p-3 text-left">Qty</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border p-3">{order.orderId}</td>
                <td className="border p-3">{order.userId?.name}</td>
                <td className="border p-3">{order.productId?.name}</td>
                <td className="border p-3">{order.quantity}</td>
                <td className="border p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="border p-3 flex gap-2">
                  <button onClick={() => handleApprove(order._id)} className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600">Approve</button>
                  <button onClick={() => handleReject(order._id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PendingOrders;
