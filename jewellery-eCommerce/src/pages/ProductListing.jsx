import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductListing = () => {
  const [jewelleryItems, setJewelleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    metal: '',
    gender: '',
    occasion: '',
    purity: '',
  });
  const [sortBy, setSortBy] = useState('');

  // Fetch jewellery items from API
  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/v1/jewellery', {
          withCredentials: true
        });
        setJewelleryItems(response.data.data);
        setFilteredItems(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch jewellery items: ${err.message} (Status: ${err.response?.status})`);
        setLoading(false);
      }
    };
    fetchJewellery();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...jewelleryItems];

    // Apply filters
    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }
    if (filters.metal) {
      result = result.filter((item) => item.metal === filters.metal);
    }
    if (filters.gender) {
      result = result.filter((item) => item.gender === filters.gender);
    }
    if (filters.occasion) {
      result = result.filter((item) => item.occasion === filters.occasion);
    }
    if (filters.purity) {
      result = result.filter((item) => item.purity === filters.purity);
    }

    // Apply sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.prodname.localeCompare(b.prodname));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.prodname.localeCompare(a.prodname));
    }

    setFilteredItems(result);
  }, [filters, sortBy, jewelleryItems]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      metal: '',
      gender: '',
      occasion: '',
      purity: '',
    });
    setSortBy('');
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Jewellery Collection</h1>
      
      {/* Filter and Sort Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Filters</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Categories</option>
              <option value="ring">Ring</option>
              <option value="chain">Chain</option>
              <option value="stud">Stud</option>
              <option value="bangle">Bangle</option>
              <option value="bracelet">Bracelet</option>
              <option value="coin">Coin</option>
              <option value="pendant">Pendant</option>
            </select>

            <select
              name="metal"
              value={filters.metal}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Metals</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
            </select>

            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Genders</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="unisex">Unisex</option>
            </select>

            <select
              name="occasion"
              value={filters.occasion}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Occasions</option>
              <option value="casual">Casual</option>
              <option value="engagement">Engagement</option>
              <option value="wedding">Wedding</option>
            </select>

            <select
              name="purity"
              value={filters.purity}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Purity</option>
              <option value="24">24K</option>
              <option value="22">22K</option>
              <option value="18">18K</option>
              <option value="14">14K</option>
              <option value="10">10K</option>
              <option value="925">925 (Silver)</option>
              <option value="999">999 (Silver)</option>
            </select>
          </div>
          <button
            onClick={resetFilters}
            className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Reset Filters
          </button>
        </div>

        <div className="md:w-1/4">
          <h2 className="text-xl font-semibold mb-2">Sort By</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Default</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={item.images[0] || 'https://via.placeholder.com/150?text=No+Image'}
              alt={item.prodname}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold">{item.prodname}</h3>
            <p className="text-gray-600 capitalize">{item.category}</p>
            <p className="text-gray-600">{item.metal} ({item.purity})</p>
            <p className="text-gray-600">For: {item.gender}</p>
            <p className="text-gray-600">Occasion: {item.occasion}</p>
            <p className="text-sm text-gray-500 mt-2">
              {item.description.substring(0, 100)}...
            </p>
            <p className="text-green-600 font-semibold mt-2">
              {item.available ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center py-10">No items match your filters</p>
      )}
    </div>
  );
};

export default ProductListing;