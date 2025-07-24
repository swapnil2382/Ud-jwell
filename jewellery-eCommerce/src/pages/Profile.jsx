import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Heart, LogOut, Edit3, Save, X, Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
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

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setFormData({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone
      });
    }

    const handleAuthChange = () => {
      fetchUser();
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


  return (
    <div className="min-h-screen bg-gray-100">
     

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Profile Header */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user?.fullname || 'Your Profile'}
                  </h2>
                  <p className="text-sm text-gray-600">Manage your personal information</p>
                </div>
              </div>
              {!isEditing && user && (
                <button
                  onClick={toggleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit</span>
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md mb-4 flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <p className="text-sm">{success}</p>
              </div>
            )}

            {isLoading && !user ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Loading...</p>
              </div>
            ) : user ? (
              isEditing ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${
                          formErrors.fullname ? 'border-red-300' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.fullname && (
                        <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.fullname}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${
                          formErrors.email ? 'border-red-300' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        placeholder="Enter your email address"
                      />
                      {formErrors.email && (
                        <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${
                          formErrors.phone ? 'border-red-300' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        placeholder="Enter your phone number"
                      />
                      {formErrors.phone && (
                        <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-white ${
                        isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleEdit}
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Full Name</h3>
                      <p className="text-gray-900">{user.fullname}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Email Address</h3>
                      <p className="text-gray-900 break-all">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Phone Number</h3>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <User className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Unable to load profile data</p>
                <p className="text-gray-500 text-sm mt-1">Please refresh the page and try again</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;