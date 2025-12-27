import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../../config/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { FiArrowLeft, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [tracking, setTracking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            const { data } = await API.get(`/orders/${id}`);
            setOrder(data.order);
            setTracking(data.tracking || []);
        } catch (error) {
            toast.error('Failed to load order details');
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner message="Loading order details..." />;

    if (!order) return <div className="text-center py-12">Order not found</div>;

    return (
        <motion.div
            className="max-w-5xl mx-auto px-4 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-500 hover:underline mb-6"
            >
                <FiArrowLeft /> Back
            </button>

            <h1 className="section-title text-left mb-8">Order Details: #{order.orderId || order._id.slice(-6)}</h1>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Order Info */}
                <div className="card">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Information</h2>
                    <div className="space-y-3">
                        <p><span className="font-semibold">Product:</span> {order.productTitle}</p>
                        <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
                        <p><span className="font-semibold">Total Price:</span> ${order.totalPrice}</p>
                        <p><span className="font-semibold">Status:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${order.status === 'Pending' ? 'bg-yellow-500' :
                                    order.status === 'Approved' ? 'bg-green-500' :
                                        order.status === 'Rejected' ? 'bg-red-500' : 'bg-blue-500'
                                }`}>
                                {order.status}
                            </span>
                        </p>
                        <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
                        <p><span className="font-semibold">Order Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="card">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Customer Information</h2>
                    <div className="space-y-3">
                        <p><span className="font-semibold">Name:</span> {order.firstName} {order.lastName}</p>
                        <p><span className="font-semibold">Email:</span> {order.email}</p>
                        <p><span className="font-semibold">Contact:</span> {order.contactNumber}</p>
                        <p><span className="font-semibold">Address:</span> {order.deliveryAddress}</p>
                        {order.additionalNotes && (
                            <p><span className="font-semibold">Notes:</span> {order.additionalNotes}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Tracking Timeline */}
            {tracking.updates && tracking.updates.length > 0 && (
                <div className="card">
                    <h2 className="text-xl font-bold mb-6 border-b pb-2">Tracking History</h2>
                    <div className="space-y-6">
                        {tracking.updates.map((update, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="text-blue-500">
                                        {idx === tracking.updates.length - 1 ? <FiCheckCircle size={24} /> : <FiClock size={24} />}
                                    </div>
                                    {idx < tracking.updates.length - 1 && (
                                        <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{update.status}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FiMapPin size={14} /> {update.location}
                                    </div>
                                    <p className="text-sm text-gray-500">{new Date(update.timestamp).toLocaleString()}</p>
                                    {update.notes && <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">{update.notes}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default OrderDetails;
