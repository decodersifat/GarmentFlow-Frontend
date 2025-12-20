import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'glass shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300">
              <span className="text-2xl">👔</span>
            </div>
            <span className="font-display font-bold text-2xl bg-gradient-to-r from-secondary-900 to-secondary-700 bg-clip-text text-transparent">
              GarmentFlow
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive(link.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-secondary-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pl-8 border-l border-secondary-200">
              {!user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center space-x-3 focus:outline-none">
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=8b5cf6&color=fff`}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md ring-2 ring-primary-100"
                      />
                      <FiChevronDown className="text-secondary-400 group-hover:text-primary-500 transition-colors" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-secondary-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                      <div className="px-4 py-2 border-b border-secondary-100 mb-2">
                        <p className="text-sm font-medium text-secondary-900 truncate">{user.name}</p>
                        <p className="text-xs text-secondary-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
            onClick={toggleMenu}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-secondary-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={toggleMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive(link.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-secondary-100 pt-4 mt-4">
                {!user ? (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="block w-full text-center py-3 text-secondary-600 font-medium hover:bg-secondary-50 rounded-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={toggleMenu}
                      className="block w-full text-center py-3 bg-primary-600 text-white font-medium rounded-lg shadow-lg"
                    >
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=8b5cf6&color=fff`}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      />
                      <div>
                        <p className="font-medium text-secondary-900">{user.name}</p>
                        <p className="text-xs text-secondary-500">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={toggleMenu}
                      className="block px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg font-medium"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); toggleMenu(); }}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <FiLogOut /> <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
