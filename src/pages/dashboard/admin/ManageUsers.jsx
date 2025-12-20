import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../../config/api';
import toast from 'react-hot-toast';
import { FiEdit2 } from 'react-icons/fi';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendData, setSuspendData] = useState({ suspendReason: '', suspendFeedback: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/users');
      setUsers(data.users);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await API.patch(`/users/${userId}/approve`);
      toast.success('User approved');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to approve user');
    }
  };

  const handleSuspendSubmit = async () => {
    if (!suspendData.suspendReason || !suspendData.suspendFeedback) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await API.patch(`/users/${selectedUser._id}/suspend`, suspendData);
      toast.success('User suspended');
      setShowModal(false);
      setSuspendData({ suspendReason: '', suspendFeedback: '' });
      fetchUsers();
    } catch (error) {
      toast.error('Failed to suspend user');
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <motion.div className="max-w-6xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3 capitalize">{user.role}</td>
                <td className="border p-3"><span className={`px-3 py-1 rounded text-white text-sm ${
                  user.status === 'pending' ? 'bg-yellow-500' :
                  user.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                }`}>{user.status}</span></td>
                <td className="border p-3 flex gap-2">
                  {user.status === 'pending' && (
                    <button onClick={() => handleApprove(user._id)} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                      Approve
                    </button>
                  )}
                  <button onClick={() => { setSelectedUser(user); setShowModal(true); }} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Suspend User: {selectedUser?.name}</h2>
            <input
              type="text"
              placeholder="Suspend Reason"
              value={suspendData.suspendReason}
              onChange={(e) => setSuspendData({...suspendData, suspendReason: e.target.value})}
              className="input-field mb-4"
            />
            <textarea
              placeholder="Feedback Message"
              value={suspendData.suspendFeedback}
              onChange={(e) => setSuspendData({...suspendData, suspendFeedback: e.target.value})}
              rows="4"
              className="input-field mb-4"
            ></textarea>
            <div className="flex gap-4">
              <button onClick={handleSuspendSubmit} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Suspend
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageUsers;
