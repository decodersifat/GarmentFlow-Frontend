import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiUsers, FiShoppingCart, FiBarChart2, FiTrendingUp } from 'react-icons/fi';
import StatCard from '../../components/StatCard';
import Button from '../../components/Button';

const Dashboard = () => {
  const { user } = useAuth();

  const dashboardLinks = useMemo(() => {
    if (!user?.role) return [];

    const baseLinks = [];

    if (user.role === 'admin') {
      baseLinks.push(
        { label: 'Manage Users', href: '/dashboard/manage-users', icon: FiUsers },
        { label: 'All Products', href: '/dashboard/admin/all-products', icon: FiShoppingCart },
        { label: 'All Orders', href: '/dashboard/admin/all-orders', icon: FiBarChart2 }
      );
    } else if (user.role === 'manager') {
      baseLinks.push(
        { label: 'Add Product', href: '/dashboard/add-product', icon: FiShoppingCart },
        { label: 'Manage Products', href: '/dashboard/manage-products', icon: FiShoppingCart },
        { label: 'Pending Orders', href: '/dashboard/pending-orders', icon: FiBarChart2 },
        { label: 'Approved Orders', href: '/dashboard/approved-orders', icon: FiTrendingUp }
      );
    } else if (user.role === 'buyer') {
      baseLinks.push(
        { label: 'My Orders', href: '/dashboard/my-orders', icon: FiShoppingCart },
        { label: 'Track Order', href: '/dashboard/track-order/1', icon: FiTrendingUp }
      );
    }

    // Common link for all roles
    baseLinks.push({ label: 'My Profile', href: '/dashboard/profile', icon: FiUsers });

    return baseLinks;
  }, [user?.role]);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 text-lg">
            {user?.role === 'admin' && 'Manage users, products, and orders'}
            {user?.role === 'manager' && 'Manage products and approve orders'}
            {user?.role === 'buyer' && 'Track your orders and view details'}
          </p>
        </motion.div>

        {/* Stats Cards - Demo */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          <StatCard
            title="Total Orders"
            value="24"
            icon={FiShoppingCart}
            trend="+12% this month"
          />
          <StatCard
            title="Revenue"
            value="$12,540"
            icon={FiTrendingUp}
            trend="+8% this month"
          />
          <StatCard
            title="Products"
            value="156"
            icon={FiBarChart2}
            trend="+4 this week"
          />
          <StatCard
            title="Users"
            value="892"
            icon={FiUsers}
            trend="+32 this month"
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ translateY: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to={link.href}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition border border-blue-200"
                >
                  <span className="font-semibold text-gray-900">{link.label}</span>
                  <link.icon className="text-blue-500" size={24} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
