import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

export default function ProductCard({ item, index, user, wishlistItems, setWishlistItems, API_BASE_URL }) {
  const navigate = useNavigate();

  const toggleLike = async (itemId) => {
    if (!user) {
      alert('Please log in to manage your wishlist');
      navigate('/login');
      return;
    }
    try {
      if (wishlistItems.has(itemId)) {
        await axios.delete(`${API_BASE_URL}/wishlists/${user._id}/${itemId}`, {
          withCredentials: true,
        });
        setWishlistItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      } else {
        await axios.post(
          `${API_BASE_URL}/wishlists`,
          { userId: user._id, productId: itemId },
          { withCredentials: true }
        );
        setWishlistItems(prev => new Set(prev).add(itemId));
      }
    } catch (err) {
      console.error('Error updating wishlist:', err);
    }
  };

  return (
    <div
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.images[0] || 'https://via.placeholder.com/400?text=No+Image'}
          alt={item.prodname}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-teal-700 text-white' : 'bg-red-500 text-white'}`}>
          {item.available ? 'In Stock' : 'Out of Stock'}
        </div>
        {item.filterLists?.includes('new arrivals') && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
            New Arrival
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            to={`/product/${item._id}`}
            className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-gray-700 font-medium hover:bg-white transition-all duration-300 shadow-xl"
          >
            <FaEye className="inline mr-2" />
            Quick View
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-teal-700 transition-colors duration-300">
            {item.prodname}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 capitalize font-medium px-3 py-1 bg-gray-100 rounded-full">
              {item.category}
            </span>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Metal:</span>
            <span className="font-medium text-gray-800 capitalize">{item.metal} ({item.purity})</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">For:</span>
            <span className="font-medium text-gray-800 capitalize">{item.gender}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Occasion:</span>
            <span className="font-medium text-gray-800 capitalize">{item.occasion}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {item.description?.substring(0, 100)}...
        </p>
        <Link
          to={`/product/${item._id}`}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            item.available
              ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } block text-center`}
        >
          {item.available ? 'View Details' : 'Out of Stock'}
        </Link>
      </div>
    </div>
  );
}