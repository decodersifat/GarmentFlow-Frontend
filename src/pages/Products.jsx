import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';
import API from '../config/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import Card from '../components/Card';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchProducts();
  }, [currentPage, category, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let sortOption = {};
      if (sortBy === 'price-low') sortOption = { price: 1 };
      else if (sortBy === 'price-high') sortOption = { price: -1 };
      else sortOption = { createdAt: -1 };

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
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 md:hidden px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
        >
          <FiFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`grid md:grid-cols-4 gap-4 mb-8 bg-gray-50 p-6 rounded-xl ${!showFilters && 'hidden md:grid'}`}
        >
          {/* Search */}
          <div className="relative md:col-span-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 w-full bg-white"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            className="input-field"
          >
            <option value="">All Categories</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Jacket">Jacket</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* Price Range */}
          <div className="bg-white p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Price Range: <span className="text-blue-600">${priceRange[0]}</span> - <span className="text-blue-600">${priceRange[1]}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </motion.div>
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <LoadingSpinner message="Loading products..." />
      ) : (
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <Card>
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
                <Link to={`/products/${product._id}`} className="block">
                  <Button variant="primary" className="w-full">View Details</Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-700 text-xl font-semibold mb-2">No products found</p>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center gap-2 mt-12"
        >
          {[...Array(totalPages)].map((_, i) => (
            <motion.button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {i + 1}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Products;
