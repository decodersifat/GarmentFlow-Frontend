import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Suspended from './pages/Suspended';
import Payment from './pages/Payment';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';
import MyOrders from './pages/dashboard/MyOrders';
import TrackOrder from './pages/dashboard/TrackOrder';
import UserProfile from './pages/dashboard/UserProfile';

// Admin Routes
import ManageUsers from './pages/dashboard/admin/ManageUsers';
import AdminAllProducts from './pages/dashboard/admin/AllProducts';
import AdminAllOrders from './pages/dashboard/admin/AllOrders';

// Manager Routes
import AddProduct from './pages/dashboard/manager/AddProduct';
import ManageProducts from './pages/dashboard/manager/ManageProducts';
import PendingOrders from './pages/dashboard/manager/PendingOrders';
import ApprovedOrders from './pages/dashboard/manager/ApprovedOrders';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/suspended" element={<Suspended />} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* Buyer Routes */}
                  <Route
                    path="/dashboard/my-orders"
                    element={
                      <ProtectedRoute roles={['buyer']}>
                        <MyOrders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/track-order/:orderId"
                    element={
                      <ProtectedRoute roles={['buyer']}>
                        <TrackOrder />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute roles={['buyer']}>
                        <Payment />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/dashboard/manage-users"
                    element={
                      <ProtectedRoute roles={['admin']}>
                        <ManageUsers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/admin/all-products"
                    element={
                      <ProtectedRoute roles={['admin']}>
                        <AdminAllProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/admin/all-orders"
                    element={
                      <ProtectedRoute roles={['admin']}>
                        <AdminAllOrders />
                      </ProtectedRoute>
                    }
                  />

                  {/* Manager Routes */}
                  <Route
                    path="/dashboard/add-product"
                    element={
                      <ProtectedRoute roles={['manager']}>
                        <AddProduct />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/manage-products"
                    element={
                      <ProtectedRoute roles={['manager']}>
                        <ManageProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/pending-orders"
                    element={
                      <ProtectedRoute roles={['manager']}>
                        <PendingOrders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/approved-orders"
                    element={
                      <ProtectedRoute roles={['manager']}>
                        <ApprovedOrders />
                      </ProtectedRoute>
                    }
                  />

                  {/* Profile Route - All authenticated users */}
                  <Route
                    path="/dashboard/profile"
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#333',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                  style: {
                    borderLeft: '4px solid #10b981',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                  style: {
                    borderLeft: '4px solid #ef4444',
                  },
                },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
