import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../config/api';
import Button from '../components/Button';
import { FiCreditCard, FiLock, FiCheckCircle } from 'react-icons/fi';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingData, product, totalPrice } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    useEffect(() => {
        if (!bookingData || !product) {
            toast.error('Invalid payment session');
            navigate('/products');
        }
    }, [bookingData, product, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'number') {
            formattedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim();
        } else if (name === 'expiry') {
            formattedValue = value.replace(/\D/g, '').substring(0, 4).replace(/(\d{2})(\d{1,2})/, '$1/$2');
        } else if (name === 'cvc') {
            formattedValue = value.replace(/\D/g, '').substring(0, 3);
        }

        setCardData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing delay
        setTimeout(async () => {
            try {
                await API.post('/orders', {
                    productId: product._id,
                    quantity: parseInt(bookingData.quantity),
                    firstName: bookingData.firstName,
                    lastName: bookingData.lastName,
                    contactNumber: bookingData.contactNumber,
                    deliveryAddress: bookingData.deliveryAddress,
                    additionalNotes: bookingData.additionalNotes,
                    paymentMethod: 'Online Payment',
                    paymentStatus: 'Paid' // You might want to add this field to your Order model if needed, or just assume it based on method
                });

                toast.success('Payment successful! Order placed.');
                navigate('/dashboard/my-orders');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to place order');
                setLoading(false);
            }
        }, 2000);
    };

    if (!bookingData || !product) return null;

    return (
        <motion.div
            className="max-w-md mx-auto px-4 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white text-center">
                    <FiLock className="mx-auto text-3xl mb-2" />
                    <h1 className="text-2xl font-bold">Secure Payment</h1>
                    <p className="text-blue-100 text-sm">Encrypted & Safe</p>
                </div>

                <div className="p-8">
                    <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Order Summary</h3>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-700">{product.name}</span>
                            <span className="text-gray-600">x{bookingData.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                            <span className="font-bold text-gray-900">Total Amount</span>
                            <span className="font-bold text-2xl text-blue-600">${totalPrice}</span>
                        </div>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="0000 0000 0000 0000"
                                    value={cardData.number}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field pl-10"
                                />
                                <FiCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={cardData.expiry}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                <input
                                    type="text"
                                    name="cvc"
                                    placeholder="123"
                                    value={cardData.cvc}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={cardData.name}
                                onChange={handleInputChange}
                                required
                                className="input-field"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full mt-6"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Processing...
                                </span>
                            ) : (
                                `Pay $${totalPrice}`
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <FiCheckCircle className="text-green-500" />
                        <span>Payments processed securely by MockPay</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Payment;
