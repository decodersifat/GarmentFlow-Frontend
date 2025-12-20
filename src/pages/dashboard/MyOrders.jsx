import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../../config/api';
import toast from 'react-hot-toast';
import { FiEye, FiTrash } from 'react-icons/fi';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/user/my-orders');
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId, status) => {
    if (status !== 'Pending') {
      toast.error('Only pending orders can be cancelled');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await API.patch(`/orders/${orderId}/cancel`);
        toast.success('Order cancelled successfully');
        fetchOrders();
      } catch (error) {
        toast.error('Failed to cancel order');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <motion.div className="max-w-6xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3 text-left">Order ID</th>
              <th className="border p-3 text-left">Product</th>
              <th className="border p-3 text-left">Quantity</th>
              <th className="border p-3 text-left">Total</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border p-3">{order.orderId}</td>
                  <td className="border p-3">{order.productTitle}</td>
                  <td className="border p-3">{order.quantity}</td>
                  <td className="border p-3">${order.totalPrice}</td>
                  <td className="border p-3"><span className={`px-3 py-1 rounded text-white text-sm ${
                    order.status === 'Pending' ? 'bg-yellow-500' :
                    order.status === 'Approved' ? 'bg-green-500' :
                    order.status === 'Rejected' ? 'bg-red-500' : 'bg-gray-500'
                  }`}>{order.status}</span></td>
                  <td className="border p-3 flex gap-2">
                    <Link to={`/dashboard/track-order/${order._id}`} className="text-blue-500 hover:underline flex items-center gap-1">
                      <FiEye size={16} /> Track
                    </Link>
                    {order.status === 'Pending' && (
                      <button onClick={() => handleCancel(order._id, order.status)} className="text-red-500 hover:underline flex items-center gap-1">
                        <FiTrash size={16} /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="border p-3 text-center text-gray-600">No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyOrders;
