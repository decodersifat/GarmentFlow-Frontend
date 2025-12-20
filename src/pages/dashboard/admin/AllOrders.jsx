import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../../config/api';
import toast from 'react-hot-toast';
import { FiEye } from 'react-icons/fi';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/admin/all', {
        params: {
          status: status || undefined,
          limit,
          skip: (page - 1) * limit
        }
      });
      setOrders(data.orders);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <motion.div className="max-w-7xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">All Orders</h1>
      <select
        value={status}
        onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        className="input-field mb-6 md:w-48"
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3 text-left">Order ID</th>
              <th className="border p-3 text-left">User</th>
              <th className="border p-3 text-left">Product</th>
              <th className="border p-3 text-left">Qty</th>
              <th className="border p-3 text-left">Status</th>
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
                <td className="border p-3"><span className={`px-3 py-1 rounded text-white text-sm ${order.status === 'Pending' ? 'bg-yellow-500' :
                    order.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'
                  }`}>{order.status}</span></td>
                <td className="border p-3"><button className="text-blue-500 hover:underline"><FiEye size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default AllOrders;
