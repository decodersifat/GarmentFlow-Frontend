import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../../../config/api';
import toast from 'react-hot-toast';

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrackingForm, setShowTrackingForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingData, setTrackingData] = useState({
    status: 'Cutting Completed',
    location: '',
    notes: '',
    image: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/admin/all', {
        params: { status: 'Approved' }
      });
      setOrders(data.orders);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTracking = async () => {
    if (!trackingData.location) {
      toast.error('Please fill in location');
      return;
    }

    try {
      await API.post(`/tracking/${selectedOrder._id}/update`, trackingData);
      toast.success('Tracking update added');
      setShowTrackingForm(false);
      setTrackingData({ status: 'Cutting Completed', location: '', notes: '', image: '' });
      fetchOrders();
    } catch (error) {
      toast.error('Failed to add tracking');
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <motion.div className="max-w-7xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">Approved Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3 text-left">Order ID</th>
              <th className="border p-3 text-left">Customer</th>
              <th className="border p-3 text-left">Product</th>
              <th className="border p-3 text-left">Qty</th>
              <th className="border p-3 text-left">Approved Date</th>
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
                <td className="border p-3">{new Date(order.approvedAt).toLocaleDateString()}</td>
                <td className="border p-3 flex gap-2">
                  <Link to={`/dashboard/track-order/${order._id}`} className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600">View Tracking</Link>
                  <button onClick={() => { setSelectedOrder(order); setShowTrackingForm(true); }} className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600">Add Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showTrackingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add Tracking Update</h2>
            <select value={trackingData.status} onChange={(e) => setTrackingData({ ...trackingData, status: e.target.value })} className="input-field mb-4">
              <option>Cutting Completed</option>
              <option>Sewing Started</option>
              <option>Finishing</option>
              <option>QC Checked</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
            </select>
            <input type="text" placeholder="Location" value={trackingData.location} onChange={(e) => setTrackingData({ ...trackingData, location: e.target.value })} className="input-field mb-4" required />
            <textarea placeholder="Notes" value={trackingData.notes} onChange={(e) => setTrackingData({ ...trackingData, notes: e.target.value })} rows="3" className="input-field mb-4"></textarea>
            <div className="flex gap-4">
              <button onClick={handleAddTracking} className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Add</button>
              <button onClick={() => setShowTrackingForm(false)} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ApprovedOrders;
