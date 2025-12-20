import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiUser, FiMail, FiLock, FiImage, FiGithub } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../config/api';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    photoURL: '',
    role: 'buyer'
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUpperCase) {
      toast.error('Password must contain an uppercase letter');
      return false;
    }
    if (!hasLowerCase) {
      toast.error('Password must contain a lowercase letter');
      return false;
    }
    if (!isLengthValid) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!validatePassword(formData.password)) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photoURL: formData.photoURL || null,
        role: formData.role
      });

      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const { data } = await API.post('/auth/google-login', {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      });

      login(data.user, data.token);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error('Google registration failed');
    }
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-blue-100 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Create Account
        </motion.h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <FiImage className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="url"
              name="photoURL"
              placeholder="Photo URL (optional)"
              value={formData.photoURL}
              onChange={handleChange}
              className="input-field pl-10"
            />
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
          >
            <option value="buyer">Buyer</option>
            <option value="manager">Manager</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or register with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleRegister}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2"
        >
          <img src="https://www.gstatic.com/firebaseapp-ui/images/auth_provider_google.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
