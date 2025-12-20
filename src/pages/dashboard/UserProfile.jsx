import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import API from '../../config/api';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get(`/users/current/me`);
      setProfile(data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <motion.div className="max-w-2xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">My Profile</h1>
      {profile && (
        <div className="card space-y-4">
          <div className="flex items-center gap-6 mb-6">
            {profile.photoURL && <img src={profile.photoURL} alt={profile.name} className="w-24 h-24 rounded-full border-4 border-blue-500" />}
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><p className="font-bold">Role</p><p className="capitalize text-blue-600">{profile.role}</p></div>
            <div><p className="font-bold">Status</p><p className="capitalize">{profile.status === 'suspended' ? <span className="text-red-600">{profile.status}</span> : <span className="text-green-600">{profile.status}</span>}</p></div>
            <div><p className="font-bold">Joined</p><p>{new Date(profile.createdAt).toLocaleDateString()}</p></div>
            <div><p className="font-bold">Auth Provider</p><p className="capitalize">{profile.authProvider}</p></div>
          </div>
          {profile.suspendFeedback && (
            <div className="bg-red-100 border border-red-400 p-4 rounded">
              <p className="font-bold text-red-600 mb-2">Suspend Reason: {profile.suspendReason}</p>
              <p className="text-red-700">{profile.suspendFeedback}</p>
            </div>
          )}
          <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition font-semibold">
            Logout
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default UserProfile;
