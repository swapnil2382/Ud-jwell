import { useState, useEffect } from 'react';
import { FaHeart, FaTrash, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Wishlist({ user }) {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch current user if not provided
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (err) {
      console.error('Error fetching current user:', err);
      return null;
    }
  };

  // Fetch wishlist for the logged-in user
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current user if not provided
        let currentUser = user;
        if (!currentUser) {
          currentUser = await getCurrentUser();
          if (!currentUser) {
            setError('Please log in to view your wishlist');
            setLoading(false);
            return;
          }
        }

        console.log('Fetching wishlist for user ID:', currentUser._id); // Debug log

        const response = await axios.get(`${API_BASE_URL}/wishlists/${currentUser._id}`, {
          withCredentials: true,
        });

        console.log('Wishlist response:', response.data); // Debug log
        setWishlist(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        if (err.response?.status === 404) {
          // No wishlist found is not an error, just empty state
          setWishlist({ items: [] });
        } else if (err.response?.status === 401) {
          setError('Please log in to view your wishlist');
          // Redirect to login
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(`Failed to fetch wishlist: ${err.response?.data?.message || err.message}`);
        }
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, navigate]);

  // Remove item from wishlist
  const handleRemoveItem = async (productId) => {
    try {
      let currentUser = user;
      if (!currentUser) {
        currentUser = await getCurrentUser();
        if (!currentUser) {
          setError('Please log in to modify your wishlist');
          return;
        }
      }

      console.log('Removing item:', productId, 'for user:', currentUser._id); // Debug log

      const response = await axios.delete(
        `${API_BASE_URL}/wishlists/${currentUser._id}/${productId}`,
        {
          withCredentials: true,
        }
      );

      setWishlist(response.data.data);
    } catch (err) {
      console.error('Error removing item:', err);
      setError(`Failed to remove item: ${err.response?.data?.message || err.message}`);
    }
  };

  // Delete entire wishlist
  const handleDeleteWishlist = async () => {
    if (!window.confirm('Are you sure you want to delete your entire wishlist?')) return;

    try {
      let currentUser = user;
      if (!currentUser) {
        currentUser = await getCurrentUser();
        if (!currentUser) {
          setError('Please log in to modify your wishlist');
          return;
        }
      }

      console.log('Deleting wishlist for user:', currentUser._id); // Debug log

      await axios.delete(`${API_BASE_URL}/wishlists/${currentUser._id}`, {
        withCredentials: true,
      });

      setWishlist({ items: [] });
    } catch (err) {
      console.error('Error deleting wishlist:', err);
      setError(`Failed to delete wishlist: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-700 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-gray-200">
          <div className="text-red-500 text-5xl mb-4">⚠</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          {error.includes('log in') && (
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all duration-300"
            >
              Go to Login
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-teal-700 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Wishlist</span>
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          {wishlist?.items?.length > 0 && (
            <button
              onClick={handleDeleteWishlist}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all duration-300"
            >
              <FaTrash />
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlist?.items?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.items.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/400?text=No+Image'}
                    alt={item.prodname || 'Product'}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
                    title="Remove from wishlist"
                  >
                    <FaTimes className="text-red-500" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                    {item.prodname || 'Unnamed Product'}
                  </h3>
                  {item.category && (
                    <p className="text-xs font-medium uppercase text-gray-800 bg-gray-200 px-2 py-1 rounded inline-block mb-3">
                      {item.category}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  )}
                  <Link
                    to={`/product/${item._id}`}
                    className="block w-full py-2 px-4 rounded-xl font-medium text-center bg-teal-700 text-white hover:bg-teal-800 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center text-center">
              <Heart className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Your Wishlist is Empty</h3>
              <p className="text-gray-600 mb-6">Start adding your favorite jewellery items to your wishlist!</p>
            </div>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all duration-300"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}