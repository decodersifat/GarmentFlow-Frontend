import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import API from '../config/api';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    quantity: 1,
    contactNumber: '',
    deliveryAddress: '',
    additionalNotes: '',
    paymentMethod: 'Cash on Delivery'
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (bookingData.quantity < product.minimumOrderQuantity) {
      toast.error(`Minimum order quantity is ${product.minimumOrderQuantity}`);
      return;
    }

    if (bookingData.quantity > product.availableQuantity) {
      toast.error(`Only ${product.availableQuantity} items available`);
      return;
    }

    // Redirect to payment page if Online Payment is selected
    if (bookingData.paymentMethod === 'Online Payment') {
      navigate('/payment', {
        state: {
          bookingData,
          product,
          totalPrice: (parseFloat(product.price) * parseInt(bookingData.quantity)).toFixed(2)
        }
      });
      return;
    }

    try {
      await API.post('/orders', {
        productId: product._id,
        quantity: parseInt(bookingData.quantity),
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        contactNumber: bookingData.contactNumber,
        deliveryAddress: bookingData.deliveryAddress,
        additionalNotes: bookingData.additionalNotes,
        paymentMethod: bookingData.paymentMethod
      });

      toast.success('Order placed successfully!');
      navigate('/dashboard/my-orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const totalPrice = parseFloat(product.price) * parseInt(bookingData.quantity);
  const canOrder = user && user.role === 'buyer' && user.status === 'approved';

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <button
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-blue-500 hover:underline mb-6"
      >
        <FiArrowLeft /> Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200">
            <img
              src={product.images[0] || 'https://via.placeholder.com/600'}
              alt={product.name}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6 space-y-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Category:</span>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">{product.category}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Price:</span>
              <span className="text-3xl text-blue-600 font-bold">${product.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Available Quantity:</span>
              <span className="text-lg font-semibold text-gray-900">{product.availableQuantity} units</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Minimum Order:</span>
              <span className="text-lg font-semibold text-gray-900">{product.minimumOrderQuantity} units</span>
            </div>
            <div className="pt-4 border-t border-blue-200">
              <span className="text-gray-700 font-medium block mb-2">Payment Options:</span>
              <div className="flex flex-wrap gap-2">
                {product.paymentOptions.map((option, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-300">
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {user && user.role === 'buyer' && (
            <Button
              variant={user.status === 'approved' ? 'primary' : 'secondary'}
              size="lg"
              onClick={() => setShowBookingForm(!showBookingForm)}
              disabled={user.status !== 'approved'}
              className="w-full"
            >
              {user.status === 'approved' ? 'Place Order' : 'Account Not Approved'}
            </Button>
          )}

          {!user && (
            <a href="/login" className="block">
              <Button variant="primary" size="lg" className="w-full">Login to Order</Button>
            </a>
          )}

          {user && user.role !== 'buyer' && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <p className="text-yellow-800 font-medium">Only buyers can place orders</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Booking Form */}
      {showBookingForm && canOrder && (
        <motion.form
          onSubmit={handleBookingSubmit}
          className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Place Order</h2>
          <p className="text-gray-600 mb-8">Fill in the details below to complete your order</p>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={bookingData.firstName}
              onChange={handleBookingChange}
              required
              className="input-field"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={bookingData.lastName}
              onChange={handleBookingChange}
              required
              className="input-field"
            />
            <input
              type="email"
              value={user.email}
              disabled
              className="input-field bg-gray-200"
            />
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number"
              value={bookingData.contactNumber}
              onChange={handleBookingChange}
              required
              className="input-field"
            />
            <div>
              <label className="block text-sm font-medium mb-2">Product Title</label>
              <input
                type="text"
                value={product.name}
                disabled
                className="input-field bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                min={product.minimumOrderQuantity}
                max={product.availableQuantity}
                value={bookingData.quantity}
                onChange={handleBookingChange}
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unit Price</label>
              <input
                type="text"
                value={`$${product.price}`}
                disabled
                className="input-field bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Price</label>
              <input
                type="text"
                value={`$${totalPrice.toFixed(2)}`}
                disabled
                className="input-field bg-gray-200"
              />
            </div>
            <select
              name="paymentMethod"
              value={bookingData.paymentMethod}
              onChange={handleBookingChange}
              className="input-field"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Online Payment">Online Payment</option>
            </select>
            <input
              type="text"
              name="deliveryAddress"
              placeholder="Delivery Address"
              value={bookingData.deliveryAddress}
              onChange={handleBookingChange}
              required
              className="input-field md:col-span-2"
            />
            <textarea
              name="additionalNotes"
              placeholder="Additional Notes (optional)"
              value={bookingData.additionalNotes}
              onChange={handleBookingChange}
              rows="3"
              className="input-field md:col-span-2"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-6"
          >
            <Button variant="success" size="lg" className="w-full">
              Confirm Order - ${totalPrice.toFixed(2)}
            </Button>
          </button>
        </motion.form>
      )}
    </motion.div>
  );
};

export default ProductDetails;
