import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-primary">
            <span className="text-2xl">👔</span>
            <span>GarmentFlow</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              <>
                <Link to="/" className="hover:text-primary transition">Home</Link>
                <Link to="/products" className="hover:text-primary transition">All Products</Link>
                <Link to="/about" className="hover:text-primary transition">About Us</Link>
                <Link to="/contact" className="hover:text-primary transition">Contact</Link>
                <Link to="/login" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition">
                  Login
                </Link>
                <Link to="/register" className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-primary transition">Home</Link>
                <Link to="/products" className="hover:text-primary transition">All Products</Link>
                <Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link>
                <div className="flex items-center space-x-4">
                  <img 
                    src={user.photoURL || 'https://via.placeholder.com/40'} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-primary"
                  />
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center space-x-2"
                  >
                    <FiLogOut /> <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            {!user ? (
              <>
                <Link to="/" className="block py-2 hover:text-primary transition">Home</Link>
                <Link to="/products" className="block py-2 hover:text-primary transition">All Products</Link>
                <Link to="/about" className="block py-2 hover:text-primary transition">About Us</Link>
                <Link to="/contact" className="block py-2 hover:text-primary transition">Contact</Link>
                <Link to="/login" className="block bg-primary text-white px-4 py-2 rounded text-center">Login</Link>
                <Link to="/register" className="block border border-primary text-primary px-4 py-2 rounded text-center">Register</Link>
              </>
            ) : (
              <>
                <Link to="/" className="block py-2 hover:text-primary transition">Home</Link>
                <Link to="/products" className="block py-2 hover:text-primary transition">All Products</Link>
                <Link to="/dashboard" className="block py-2 hover:text-primary transition">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center justify-center space-x-2"
                >
                  <FiLogOut /> <span>Logout</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
