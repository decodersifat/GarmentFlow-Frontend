import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import API from '../config/api';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchProducts();
  }, [currentPage, category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products', {
        params: {
          category: category || undefined,
          limit: itemsPerPage,
          skip: (currentPage - 1) * itemsPerPage
        }
      });
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="section-title">All Products</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
          className="input-field md:w-48"
        >
          <option value="">All Categories</option>
          <option value="Shirt">Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Jacket">Jacket</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="card group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="overflow-hidden rounded-lg mb-4 h-48">
                <img
                  src={product.images[0] || 'https://via.placeholder.com/400'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <span className="text-sm text-gray-500">Qty: {product.availableQuantity}</span>
              </div>
              <Link
                to={`/products/${product._id}`}
                className="block w-full bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded transition ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Products;
