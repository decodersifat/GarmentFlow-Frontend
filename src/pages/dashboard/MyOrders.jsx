import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../../config/api';
import toast from 'react-hot-toast';
import { FiEye, FiTrash } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';
import Table from '../../components/Table';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/user/my-orders');
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId, status) => {
    if (status !== 'Pending') {
      toast.error('Only pending orders can be cancelled');
      return;
    }

    try {
      await API.patch(`/orders/${orderId}/cancel`);
      toast.success('Order cancelled successfully');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  if (loading) return <LoadingSpinner />;

  const columns = [
    { key: 'id', label: 'Order ID', render: (row) => `#${row._id?.slice(-6) || 'N/A'}` },
    { key: 'product', label: 'Product', render: (row) => row.productName || 'N/A' },
    { key: 'quantity', label: 'Quantity', render: (row) => row.quantity || 0 },
    { key: 'price', label: 'Price', render: (row) => `$${row.totalPrice || 0}` },
    {
      key: 'status', label: 'Status', render: (row) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${row.status === 'Approved' ? 'bg-green-100 text-green-800' :
            row.status === 'Rejected' ? 'bg-red-100 text-red-800' :
              row.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
          }`}>
          {row.status || 'Unknown'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/dashboard/track-order/${row._id}`}
            className="text-blue-500 hover:text-blue-700"
            title="View details"
          >
            <FiEye size={18} />
          </Link>
          {row.status === 'Pending' && (
            <button
              onClick={() => handleCancel(row._id, row.status)}
              className="text-red-500 hover:text-red-700"
              title="Cancel order"
            >
              <FiTrash size={18} />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View and manage your orders</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow-md p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-6xl mb-4"
            >
              📦
            </motion.div>
            <p className="text-gray-600 mb-4 text-lg">You haven't placed any orders yet</p>
            <Link
              to="/products"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 font-semibold"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Table columns={columns} data={orders} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyOrders;
