import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../config/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Shirt',
        price: 0,
        availableQuantity: 0,
        minimumOrderQuantity: 1,
        images: [],
        demoVideoLink: '',
        paymentOptions: [],
        showOnHome: false
    });

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await API.get(`/products/${id}`);
            setFormData({
                name: data.name,
                description: data.description,
                category: data.category,
                price: data.price,
                availableQuantity: data.availableQuantity,
                minimumOrderQuantity: data.minimumOrderQuantity,
                images: data.images || [],
                demoVideoLink: data.demoVideoLink || '',
                paymentOptions: data.paymentOptions || [],
                showOnHome: data.showOnHome || false
            });
        } catch (error) {
            toast.error('Failed to load product details');
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

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

    const handlePaymentOptionChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const currentOptions = prev.paymentOptions;
            if (checked) {
                return { ...prev, paymentOptions: [...currentOptions, value] };
            } else {
                return { ...prev, paymentOptions: currentOptions.filter(opt => opt !== value) };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await API.put(`/products/${id}`, {
                ...formData,
                price: parseFloat(formData.price),
                availableQuantity: parseInt(formData.availableQuantity),
                minimumOrderQuantity: parseInt(formData.minimumOrderQuantity),
                images: formData.images.filter(img => img && img.trim() !== '')
            });

            toast.success('Product updated successfully!');
            navigate(-1);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update product');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <LoadingSpinner message="Loading product..." />;

    return (
        <motion.div
            className="max-w-4xl mx-auto px-4 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="section-title">Update Product</h1>
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

                <div>
                    <label className="block font-bold mb-2">Payment Options</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value="Cash on Delivery"
                                checked={formData.paymentOptions.includes('Cash on Delivery')}
                                onChange={handlePaymentOptionChange}
                                className="w-4 h-4"
                            />
                            Cash on Delivery
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value="Online Payment"
                                checked={formData.paymentOptions.includes('Online Payment')}
                                onChange={handlePaymentOptionChange}
                                className="w-4 h-4"
                            />
                            Online Payment
                        </label>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="showOnHome" checked={formData.showOnHome} onChange={handleChange} className="w-4 h-4" />
                        Show on Home Page
                    </label>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-50"
                    >
                        {submitting ? 'Updating...' : 'Update Product'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default UpdateProduct;
