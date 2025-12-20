import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../../config/api';
import toast from 'react-hot-toast';
import { FiEdit2 } from 'react-icons/fi';
import Modal from '../../../components/Modal';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

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

  if (loading) return <LoadingSpinner message="Loading users..." />;

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (val) => <span className="capitalize">{val}</span> },
    {
      key: 'status', label: 'Status', render: (val) => (
        <span className={`px-3 py-1 rounded text-white text-sm ${val === 'pending' ? 'bg-yellow-500' :
            val === 'approved' ? 'bg-green-500' : 'bg-red-500'
          }`}>{val}</span>
      )
    },
    {
      key: '_id', label: 'Actions', render: (val, row) => (
        <div className="flex gap-2">
          {row.status === 'pending' && (
            <Button size="sm" variant="success" onClick={() => handleApprove(row._id)}>
              Approve
            </Button>
          )}
          <Button size="sm" variant="danger" onClick={() => { setSelectedUser(row); setShowModal(true); }}>
            Suspend
          </Button>
        </div>
      )
    }
  ];

  return (
    <motion.div className="max-w-6xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">Manage Users</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field flex-1"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="input-field md:w-48"
        >
          <option value="all">All Roles</option>
          <option value="buyer">Buyer</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <Table columns={columns} data={filteredUsers} loading={loading} />

      <Modal
        isOpen={showModal}
        title={`Suspend User: ${selectedUser?.name}`}
        onClose={() => setShowModal(false)}
        onConfirm={handleSuspendSubmit}
        confirmText="Suspend"
      >
        <input
          type="text"
          placeholder="Suspend Reason"
          value={suspendData.suspendReason}
          onChange={(e) => setSuspendData({ ...suspendData, suspendReason: e.target.value })}
          className="input-field mb-4"
        />
        <textarea
          placeholder="Feedback Message"
          value={suspendData.suspendFeedback}
          onChange={(e) => setSuspendData({ ...suspendData, suspendFeedback: e.target.value })}
          rows="4"
          className="input-field"
        ></textarea>
      </Modal>
    </motion.div>
  );
};

export default ManageUsers;
