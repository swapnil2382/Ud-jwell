import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../component/Productlisting/Breadcrumb';
import ActiveFilters from '../component/Productlisting/ActiveFilters';
import ResultsSummary from '../component/Productlisting/ResultsSummary';
import ProductCard from '../component/Productlisting/ProductCard';
import FloatingActionButtons from '../component/Productlisting/FloatingActionButtons';
import FilterModal from '../component/Productlisting/FilterModal';
import SortModal from '../component/Productlisting/SortModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductListing({ user }) {
  const [jewelleryItems, setJewelleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: '',
    metal: '',
    gender: '',
    occasion: '',
    purity: '',
  });
  const [sortBy, setSortBy] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(new Set());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch jewellery items
  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        setLoading(true);
        const jewelleryResponse = await axios.get(`${API_BASE_URL}/jewellery`, { withCredentials: true });
        setJewelleryItems(jewelleryResponse.data.data);
        setFilteredItems(jewelleryResponse.data.data); // Initialize with all items
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch data: ${err.response?.data?.message || err.message}`);
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };
    fetchJewellery();
  }, []);

  // Handle filters from URL
  useEffect(() => {
    const newFilters = {
      category: searchParams.get('category') || '',
      metal: searchParams.get('metal') || '',
      gender: searchParams.get('gender') || '',
      occasion: searchParams.get('occasion') || '',
      purity: searchParams.get('purity') || '',
    };
    console.log('URL Filters applied:', newFilters); // Debug log
    setFilters(newFilters);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...jewelleryItems];

    console.log('Applying filters:', filters); // Debug log
    // Apply filters
    if (filters.category) {
      result = result.filter((item) => 
        item.category && item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    if (filters.metal) {
      result = result.filter((item) => 
        item.metal && item.metal.toLowerCase() === filters.metal.toLowerCase()
      );
    }
    if (filters.gender) {
      result = result.filter((item) => 
        item.gender && item.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }
    if (filters.occasion) {
      result = result.filter((item) => 
        item.occasion && item.occasion.toLowerCase() === filters.occasion.toLowerCase()
      );
    }
    if (filters.purity) {
      result = result.filter((item) => 
        item.purity && item.purity.toLowerCase() === filters.purity.toLowerCase()
      );
    }

    // Apply sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.prodname.localeCompare(b.prodname));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.prodname.localeCompare(a.prodname));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    console.log('Filtered items count:', result.length); // Debug log
    setFilteredItems(result);
  }, [filters, sortBy, jewelleryItems]);

  const resetFilters = () => {
    setFilters({
      category: '',
      metal: '',
      gender: '',
      occasion: '',
      purity: '',
    });
    setSearchParams({});
  };

  const clearAll = () => {
    resetFilters();
    setSortBy('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-700 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading jewellery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-gray-200">
          <div className="text-red-500 text-5xl mb-4">⚠</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb />
      <ActiveFilters 
        filters={filters}
        sortBy={sortBy}
        setFilters={setFilters}
        setSortBy={setSortBy}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        clearAll={clearAll}
      />
      <ResultsSummary 
        filteredItems={filteredItems}
        jewelleryItems={jewelleryItems}
      />
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <ProductCard 
              key={item._id}
              item={item}
              index={index}
              user={user}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
              API_BASE_URL={API_BASE_URL}
            />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💎</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or sort options</p>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      <FloatingActionButtons 
        setIsFilterModalOpen={setIsFilterModalOpen}
        setIsSortModalOpen={setIsSortModalOpen}
      />
      <FilterModal 
        isFilterModalOpen={isFilterModalOpen}
        setIsFilterModalOpen={setIsFilterModalOpen}
        filters={filters}
        handleFilterChange={(e) => {
          const { name, value } = e.target;
          setFilters((prev) => ({ ...prev, [name]: value }));
          const newSearchParams = new URLSearchParams(searchParams);
          if (value) {
            newSearchParams.set(name, value);
          } else {
            newSearchParams.delete(name);
          }
          setSearchParams(newSearchParams);
        }}
        resetFilters={resetFilters}
      />
      <SortModal 
        isSortModalOpen={isSortModalOpen}
        setIsSortModalOpen={setIsSortModalOpen}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}
