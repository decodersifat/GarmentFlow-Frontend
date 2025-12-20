import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiMail, FiLock, FiGithub } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../config/api';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post('/auth/login', { email, password });
      
      login(data.user); // Token is stored in httpOnly cookie by backend
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const { data } = await API.post('/auth/google-login', {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      });

      login(data.user); // Token is stored in httpOnly cookie by backend
      toast.success('Google login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-blue-100"
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
          Welcome Back
        </motion.h2>

        <form onSubmit={handleEmailLogin} className="space-y-0">
          <Input
            label="Email Address"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full mt-4"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition font-semibold mb-3 flex items-center justify-center gap-2"
        >
          <img src="https://www.gstatic.com/firebaseapp-ui/images/auth_provider_google.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
