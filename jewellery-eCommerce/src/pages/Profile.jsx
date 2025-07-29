import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, 
  Heart, 
  LogOut, 
  Edit3, 
  Save, 
  X, 
  Check, 
  AlertCircle, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [wishlist, setWishlist] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('userRole');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (storedUser && storedRole && isLoggedIn === 'true') {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setFormData({
          fullname: userData.fullname,
          email: userData.email,
          phone: userData.phone
        });
      } else {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
        const userData = res.data.data;
        setUser(userData);
        setFormData({
          fullname: userData.fullname,
          email: userData.email,
          phone: userData.phone
        });
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('isLoggedIn', 'true');
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setError('Failed to load profile data. Please try again.');
      setIsLoading(false);
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
    }
  };

  const fetchWishlist = async () => {
    try {
      setWishlistLoading(true);
      if (user?._id) {
        // Fetch wishlist to get item IDs
        const wishlistResponse = await axios.get(`${API_BASE_URL}/wishlists/${user._id}`, {
          withCredentials: true,
        });
        console.log('Wishlist API response:', JSON.stringify(wishlistResponse.data.data, null, 2));

        // Fetch full jewellery item details for each wishlist item
        const wishlistItems = wishlistResponse.data.data.items;
        const jewelleryPromises = wishlistItems.map((item) =>
          axios.get(`${API_BASE_URL}/jewellery/${item._id}`, { withCredentials: true })
        );
        const jewelleryResponses = await Promise.all(jewelleryPromises);

        // Extract full jewellery item data
        const fullItems = jewelleryResponses.map((res) => res.data.data);

        // Create normalized wishlist with full item data
        const normalizedWishlist = {
          ...wishlistResponse.data.data,
          items: fullItems,
        };
        setWishlist(normalizedWishlist);
        console.log('Normalized wishlist:', JSON.stringify(normalizedWishlist, null, 2));
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setWishlist({ items: [] });
      } else {
        console.error('Error fetching wishlist:', err);
        setWishlist({ items: [] });
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setFormData({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone
      });
      fetchWishlist();
    }

    const handleAuthChange = () => {
      fetchUser();
      fetchWishlist();
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, [user, setUser]);

  const validateForm = () => {
    const errors = {};
    if (!formData.fullname.trim()) errors.fullname = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Invalid phone number format';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${user._id}`, formData, {
        withCredentials: true
      });
      setSuccess('Profile updated successfully.');
      const updatedUser = response.data.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('authChange'));
      setIsEditing(false);
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating your profile.');
      setIsLoading(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError(null);
    setSuccess(null);
    setFormErrors({});
    if (!isEditing && user) {
      setFormData({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone
      });
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/wishlists/${user._id}/${productId}`,
        { withCredentials: true }
      );
      setWishlist(response.data.data);
    } catch (err) {
      console.error('Error removing item:', err);
      setError(`Failed to remove item: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      setUser(null);
      setError('Failed to logout. Please try again.');
    }
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  {!isEditing && (
                    <button
                      onClick={toggleEdit}
                      className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <p className="text-sm">{success}</p>
                  </div>
                )}

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          formErrors.fullname ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.fullname && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.fullname}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          formErrors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {formErrors.email && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          formErrors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {formErrors.phone && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={toggleEdit}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <User className="w-8 h-8 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-semibold text-gray-900">{user?.fullname}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <User className="w-8 h-8 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-semibold text-gray-900 break-all">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <User className="w-8 h-8 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-semibold text-gray-900">{user?.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/products"
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg hover:from-teal-100 hover:to-blue-100 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="w-6 h-6 text-teal-600" />
                      <span className="font-medium text-gray-900">Explore Products</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg hover:from-red-100 hover:to-pink-100 transition-all duration-200 group w-full"
                  >
                    <div className="flex items-center space-x-3">
                      <LogOut className="w-6 h-6 text-red-600" />
                      <span className="font-medium text-gray-900">Logout</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Wishlist Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-pink-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Your Wishlist</h2>
                    {wishlist?.items && (
                      <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                        {wishlist.items.length} {wishlist.items.length === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </div>
                  <Link
                    to="/wishlist"
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {wishlistLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
                  </div>
                ) : wishlist?.items?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.items.slice(0, 3).map((item) => (
                      <div
                        key={item._id}
                        className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={item.images?.[0] || 'https://via.placeholder.com/400?text=No+Image'}
                            alt={item.prodname || 'Product'}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <button
                            onClick={() => handleRemoveFromWishlist(item._id)}
                            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                            title="Remove from wishlist"
                          >
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          </button>
                          {item.category && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                                {item.category}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors duration-200">
                            {item.prodname || 'Unnamed Product'}
                          </h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="font-medium mr-1">Metal:</span>
                              <span>{item.metal || 'N/A'}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="font-medium mr-1">Purity:</span>
                              <span>{item.purity || 'N/A'}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="font-medium mr-1">For:</span>
                              <span>{item.gender || 'N/A'}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="font-medium mr-1">Occasion:</span>
                              <span>{item.occasion || 'N/A'}</span>
                            </div>
                          </div>
                          <Link
                            to={`/product/${item._id}`}
                            className="block w-full text-center py-2.5 px-4 bg-gradient-to-r from-teal-600 to-teal-600 text-white rounded-lg hover:from-teal-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">Discover beautiful jewelry and add your favorites!</p>
                    <Link
                      to="/products"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Start Shopping</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
