import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../../../config/api';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash } from 'react-icons/fi';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <motion.div className="max-w-7xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="section-title mb-0">Manage Products</h1>
        <div className="flex gap-4 flex-1 justify-end">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field max-w-xs"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field max-w-[150px]"
          >
            <option value="All">All Categories</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Jacket">Jacket</option>
            <option value="Accessories">Accessories</option>
          </select>
          <Link to="/dashboard/add-product" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap flex items-center">
            Add Product
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3 text-left">Image</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Price</th>
              <th className="border p-3 text-left">Payment</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border p-3"><img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded" /></td>
                <td className="border p-3">{product.name}</td>
                <td className="border p-3">${product.price}</td>
                <td className="border p-3">{product.paymentOptions.join(', ')}</td>
                <td className="border p-3 flex gap-2">
                  <Link to={`/dashboard/update-product/${product._id}`} className="text-blue-500 hover:underline"><FiEdit2 size={16} /></Link>
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

export default ManageProducts;
