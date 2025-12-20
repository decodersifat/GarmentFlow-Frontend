import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../../config/api';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash } from 'react-icons/fi';

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

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <motion.div className="max-w-7xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">All Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3 text-left">Image</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Price</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Show Home</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border p-3"><img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded" /></td>
                <td className="border p-3">{product.name}</td>
                <td className="border p-3">${product.price}</td>
                <td className="border p-3">{product.category}</td>
                <td className="border p-3">
                  <input type="checkbox" checked={product.showOnHome} onChange={() => handleToggleHome(product)} className="w-5 h-5" />
                </td>
                <td className="border p-3 flex gap-2">
                  <button className="text-blue-500 hover:underline"><FiEdit2 size={16} /></button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline"><FiTrash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AllProducts;
