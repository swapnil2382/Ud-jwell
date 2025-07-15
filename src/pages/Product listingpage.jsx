import React, { useState, useMemo } from "react";
import { Search, Filter, Heart, ShoppingCart, Star } from "lucide-react";

export default function ProductListingPage() {
  const [filters, setFilters] = useState({
    karat: "",
    diamond: "",
    priceRange: "",
    metalType: "",
    availability: ""
  });
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle filter panel

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Bubbly Bliss 14KT Diamond & London",
      price: 44420,
      originalPrice: 48000,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center",
      karat: "14 KT",
      diamond: "Diamond",
      metalType: "Gold",
      availability: "Available in stores",
      rating: 4.5,
      reviews: 128,
      isOnOffer: true,
      stock: "Only 1 left in stock"
    },
    {
      id: 2,
      name: "14KT Yellow Gold Teese Gold 18K Dia",
      price: 21470,
      originalPrice: 23000,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center",
      karat: "14 KT",
      diamond: "Diamond",
      metalType: "Gold",
      availability: "Available in stores",
      rating: 4.7,
      reviews: 95,
      isOnOffer: true,
      stock: "In Stock"
    },
    {
      id: 3,
      name: "Happy Treasures Solitaire Finger Ring",
      price: 48989,
      originalPrice: 52000,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
      karat: "18 KT",
      diamond: "Diamond",
      metalType: "Gold",
      availability: "Available in stores",
      rating: 4.8,
      reviews: 203,
      isOnOffer: true,
      stock: "Only 1 left in stock"
    },
    // Add more products as needed
  ];

  // Filter options
  const filterOptions = {
    priceRange: ["Below ₹10000 (41)", "Less Than ₹25000 (128)", "Between ₹25000 And ₹50000 (147)", "Between ₹50000 And ₹100000 (76)", "₹100000 And More (20)"],
    jewelleryType: [],
    productCategory: [],
    shopFor: [],
    karatage: ["14K", "18K"],
    metal: [],
    diamondClarity: []
  };

  // Filter products logic
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        const price = product.price;
        switch (filters.priceRange) {
          case "Below ₹10000 (41)":
            return price < 10000;
          case "Less Than ₹25000 (128)":
            return price < 25000;
          case "Between ₹25000 And ₹50000 (147)":
            return price >= 25000 && price <= 50000;
          case "Between ₹50000 And ₹100000 (76)":
            return price >= 50000 && price <= 100000;
          case "₹100000 And More (20)":
            return price >= 100000;
          default:
            return true;
        }
      });
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "discount":
        filtered.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortBy, searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      karat: "",
      diamond: "",
      priceRange: "",
      metalType: "",
      availability: ""
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Home</span>
              <span>›</span>
              <span className="text-gray-900">Best Sellers</span>
            </nav>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
              <div className="relative">
                {product.isOnOffer && (
                  <div className="absolute top-3 left-3 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                    ON OFFER ON MIA ✨
                  </div>
                )}
                {product.stock === "Only 1 left in stock" && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                    ONLY 1 LEFT IN STOCK
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                    <ShoppingCart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 h-12 overflow-hidden">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{product.karat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sort and Filter Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-pink-500 text-white rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer hover:bg-pink-600"
            >
              <option value="featured">Sort</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="popularity">Popularity</option>
              <option value="newest">New Arrivals</option>
              <option value="discount">Discount</option>
              <option value="best-sellers">Best Sellers</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-gray-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent cursor-pointer hover:bg-gray-300"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">Filters</span>
            </button>
            {isFilterOpen && (
              <div className="absolute bottom-12 right-0 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                <div className="flex justify-end">
                  <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {Object.entries(filterOptions).map(([filterType, options]) => (
                  filterType === "priceRange" && options.length > 0 && (
                    <div key={filterType} className="mb-2">
                      <h4 className="text-sm font-medium text-gray-900 capitalize">{filterType.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      {options.map((option) => (
                        <label key={option} className="flex items-center space-x-2 text-sm text-gray-700">
                          <input
                            type="radio"
                            name={filterType}
                            value={option}
                            checked={filters[filterType] === option}
                            onChange={() => handleFilterChange(filterType, option)}
                            className="form-radio text-pink-500 focus:ring-pink-500"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}