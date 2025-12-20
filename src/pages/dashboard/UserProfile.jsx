import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import API from '../../config/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

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

  if (loading) return <LoadingSpinner message="Loading profile..." />;

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="section-title"
      >
        My Profile
      </motion.h1>
      {profile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card space-y-6"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-gray-200">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={profile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=3b82f6&color=fff&size=128`}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h2>
              <p className="text-gray-600 text-lg mb-4">{profile.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                  {profile.role}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${
                  profile.status === 'suspended' 
                    ? 'bg-red-100 text-red-700' 
                    : profile.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {profile.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Role</p>
              <p className="text-lg font-bold text-blue-600 capitalize">{profile.role}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Status</p>
              <p className={`text-lg font-bold capitalize ${
                profile.status === 'suspended' ? 'text-red-600' : 
                profile.status === 'approved' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {profile.status}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Joined</p>
              <p className="text-lg font-semibold text-gray-900">{new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Auth Provider</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{profile.authProvider || 'Email'}</p>
            </div>
          </div>
          
          {profile.suspendFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg"
            >
              <p className="font-bold text-red-700 mb-2 text-lg">Suspend Reason</p>
              <p className="text-red-600 mb-4">{profile.suspendReason}</p>
              <p className="font-semibold text-red-700 mb-2">Feedback</p>
              <p className="text-red-600">{profile.suspendFeedback}</p>
            </motion.div>
          )}
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg font-semibold text-lg"
          >
            Logout
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserProfile;
