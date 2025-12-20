import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../../config/api';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import Table from '../../../components/Table';
import LoadingSpinner from '../../../components/LoadingSpinner';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data.products);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHome = async (product) => {
    try {
      await API.put(`/products/${product._id}`, { showOnHome: !product.showOnHome });
      toast.success('Product updated');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await API.delete(`/products/${productId}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading products..." />;

  const columns = [
    { 
      key: 'image', 
      label: 'Image', 
      render: (row) => (
        <img 
          src={row.images?.[0] || 'https://via.placeholder.com/50'} 
          alt={row.name} 
          className="w-16 h-16 object-cover rounded-lg border border-gray-200" 
        />
      )
    },
    { key: 'name', label: 'Product Name' },
    { 
      key: 'price', 
      label: 'Price', 
      render: (val) => <span className="font-semibold text-blue-600">${val}</span>
    },
    { 
      key: 'category', 
      label: 'Category',
      render: (val) => <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{val}</span>
    },
    { 
      key: 'showOnHome', 
      label: 'Show on Home',
      render: (val, row) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={row.showOnHome} 
            onChange={() => handleToggleHome(row)} 
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (val, row) => (
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit"
          >
            <FiEdit2 size={18} />
          </motion.button>
          <motion.button
            onClick={() => handleDelete(row._id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <FiTrash size={18} />
          </motion.button>
        </div>
      )
    }
  ];

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 py-12" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="section-title"
      >
        All Products
      </motion.h1>
      <Table columns={columns} data={products} loading={loading} />
    </motion.div>
  );
};

export default AllProducts;
