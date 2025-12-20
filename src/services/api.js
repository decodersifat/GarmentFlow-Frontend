import API from './api';

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  googleLogin: (data) => API.post('/auth/google-login', data),
  githubLogin: (data) => API.post('/auth/github-login', data),
  logout: () => API.post('/auth/logout'),
};

export const productAPI = {
  getAllProducts: (params) => API.get('/products', { params }),
  getFeaturedProducts: () => API.get('/products/home/featured'),
  getProductById: (id) => API.get(`/products/${id}`),
  createProduct: (data) => API.post('/products', data),
  updateProduct: (id, data) => API.put(`/products/${id}`, data),
  deleteProduct: (id) => API.delete(`/products/${id}`),
};

export const orderAPI = {
  createOrder: (data) => API.post('/orders', data),
  getUserOrders: () => API.get('/orders/user/my-orders'),
  getAllOrders: (params) => API.get('/orders/admin/all', { params }),
  getOrderById: (id) => API.get(`/orders/${id}`),
  approveOrder: (id) => API.patch(`/orders/${id}/approve`),
  rejectOrder: (id) => API.patch(`/orders/${id}/reject`),
  cancelOrder: (id) => API.patch(`/orders/${id}/cancel`),
};

export const userAPI = {
  getAllUsers: (params) => API.get('/users', { params }),
  getUserProfile: (id) => API.get(`/users/profile/${id}`),
  getCurrentUser: () => API.get('/users/current/me'),
  updateUserRole: (id, data) => API.patch(`/users/${id}/role`, data),
  approveUser: (id) => API.patch(`/users/${id}/approve`),
  suspendUser: (id, data) => API.patch(`/users/${id}/suspend`, data),
};

export const trackingAPI = {
  getTracking: (orderId) => API.get(`/tracking/${orderId}`),
  addTrackingUpdate: (orderId, data) => API.post(`/tracking/${orderId}/update`, data),
};
