import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../../../config/api';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Shirt',
    price: 0,
    availableQuantity: 0,
    minimumOrderQuantity: 1,
    images: [],
    demoVideoLink: '',
    paymentOptions: ['Cash on Delivery'],
    showOnHome: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUrlChange = (idx, value) => {
    const newImages = [...formData.images];
    newImages[idx] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/products', {
        ...formData,
        price: parseFloat(formData.price),
        availableQuantity: parseInt(formData.availableQuantity),
        minimumOrderQuantity: parseInt(formData.minimumOrderQuantity),
        images: formData.images.filter(img => img.trim() !== '')
      });

      toast.success('Product created successfully!');
      navigate('/dashboard/manage-products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="max-w-4xl mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="section-title">Add New Product</h1>
      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="input-field" />
          <select name="category" value={formData.category} onChange={handleChange} className="input-field">
            <option>Shirt</option><option>Pant</option><option>Jacket</option><option>Accessories</option>
          </select>
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="input-field" />
          <input type="number" name="availableQuantity" placeholder="Available Quantity" value={formData.availableQuantity} onChange={handleChange} required className="input-field" />
          <input type="number" name="minimumOrderQuantity" placeholder="Minimum Order Qty" value={formData.minimumOrderQuantity} onChange={handleChange} required className="input-field" />
        </div>
        <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} rows="4" required className="input-field"></textarea>
        <div>
          <label className="block font-bold mb-2">Product Images (URLs)</label>
          {[0, 1, 2].map((idx) => (
            <input
              key={idx}
              type="url"
              placeholder={`Image URL ${idx + 1}`}
              value={formData.images[idx] || ''}
              onChange={(e) => handleImageUrlChange(idx, e.target.value)}
              className="input-field mb-2"
            />
          ))}
        </div>
        <input type="url" name="demoVideoLink" placeholder="Demo Video Link" value={formData.demoVideoLink} onChange={handleChange} className="input-field" />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" name="showOnHome" checked={formData.showOnHome} onChange={handleChange} className="w-4 h-4" /> Show on Home Page</label>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition font-semibold disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </motion.div>
  );
};

export default AddProduct;
