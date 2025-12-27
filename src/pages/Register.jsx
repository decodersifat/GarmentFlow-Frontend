import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiUser, FiMail, FiLock, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../config/api';
import { signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';

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
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle redirect result from Google sign-in (fallback method)
  React.useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          setGoogleLoading(true);
          const { data } = await API.post('/auth/google-login', {
            name: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL
          });
          login(data);
          toast.success('Registration successful!');
          navigate('/');
        }
      } catch (error) {
        console.error('Redirect result error:', error);
        if (error.code !== 'auth/popup-closed-by-user') {
          toast.error('Google registration failed');
        }
      } finally {
        setGoogleLoading(false);
      }
    };
    handleRedirectResult();
  }, [login, navigate]);

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
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    try {
      setGoogleLoading(true);

      // Try popup first
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const { data } = await API.post('/auth/google-login', {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        });

        login(data);
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Google registration error:', error);

      // If popup fails due to COOP or blocking, fall back to redirect
      if (error.code === 'auth/popup-blocked' ||
        error.code === 'auth/cancelled-popup-request' ||
        error.message?.includes('Cross-Origin-Opener-Policy')) {
        try {
          toast.loading('Redirecting to Google...', { duration: 2000 });
          await signInWithRedirect(auth, provider);
          return; // Page will redirect
        } catch (redirectError) {
          console.error('Redirect error:', redirectError);
          toast.error('Google registration failed. Please try again.');
        }
      } else if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign up cancelled');
      } else {
        toast.error(error.response?.data?.message || 'Google registration failed');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-blue-100 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <PageTitle title="Register" />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Create Account
        </motion.h2>

        <form onSubmit={handleRegister} className="space-y-0">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password (Min 6 chars, 1 uppercase, 1 lowercase)"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Input
            label="Photo URL (optional)"
            type="url"
            name="photoURL"
            placeholder="https://example.com/photo.jpg"
            value={formData.photoURL}
            onChange={handleChange}
          />

          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: 'buyer', label: 'Buyer' },
              { value: 'manager', label: 'Manager' }
            ]}
          />

          <Button
            type="submit"
            disabled={loading || googleLoading}
            variant="primary"
            size="lg"
            className="w-full mt-4"
          >
            {loading ? 'Creating account...' : 'Register'}
          </Button>
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
          disabled={loading || googleLoading}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {googleLoading ? (
            <span>Connecting...</span>
          ) : (
            <>
              <img src="https://www.gstatic.com/firebaseapp-ui/images/auth_provider_google.svg" alt="Google" className="w-5 h-5" />
              Google
            </>
          )}
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
