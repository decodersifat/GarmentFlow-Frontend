import { useState, useCallback } from 'react';
import API from '../config/api';
import toast from 'react-hot-toast';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const { data } = await API.get('/orders/user/my-orders', { params: filters });
      setOrders(data.orders || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      const { data } = await API.post('/orders', orderData);
      toast.success('Order created successfully');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelOrder = useCallback(async (orderId) => {
    try {
      await API.patch(`/orders/${orderId}/cancel`);
      toast.success('Order cancelled successfully');
      await fetchOrders();
    } catch (err) {
      toast.error('Failed to cancel order');
      throw err;
    }
  }, [fetchOrders]);

  const approveOrder = useCallback(async (orderId) => {
    try {
      await API.patch(`/orders/${orderId}/approve`);
      toast.success('Order approved');
      await fetchOrders();
    } catch (err) {
      toast.error('Failed to approve order');
      throw err;
    }
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    cancelOrder,
    approveOrder
  };
};

export default useOrders;
