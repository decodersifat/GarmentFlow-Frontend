import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import API from '../config/api';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
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
        <div>
          <img
            src={product.images[0] || 'https://via.placeholder.com/600'}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="space-y-3 mb-6">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> <span className="text-2xl text-blue-600 font-bold">${product.price}</span></p>
            <p><strong>Available Quantity:</strong> {product.availableQuantity}</p>
            <p><strong>Minimum Order:</strong> {product.minimumOrderQuantity}</p>
            <p><strong>Payment Options:</strong> {product.paymentOptions.join(', ')}</p>
          </div>

          {user && user.role === 'buyer' && (
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              disabled={user.status !== 'approved'}
              className={`w-full py-3 rounded font-semibold transition ${
                user.status === 'approved'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {user.status === 'approved' ? 'Place Order' : 'Account Not Approved'}
            </button>
          )}

          {!user && (
            <a
              href="/login"
              className="w-full block bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition text-center"
            >
              Login to Order
            </a>
          )}

          {user && user.role !== 'buyer' && (
            <div className="bg-yellow-100 border border-yellow-400 p-4 rounded">
              <p className="text-yellow-800">Only buyers can place orders</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Form */}
      {showBookingForm && canOrder && (
        <motion.form
          onSubmit={handleBookingSubmit}
          className="mt-12 p-8 bg-gray-50 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Place Order</h2>

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
            className="w-full mt-6 bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 transition"
          >
            Confirm Order - ${totalPrice.toFixed(2)}
          </button>
        </motion.form>
      )}
    </motion.div>
  );
};

export default ProductDetails;
