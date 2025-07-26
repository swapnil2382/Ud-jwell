import { User, Mail, Shield, Package, Users, LogOut, ArrowRight } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProfileSection({ user, products, customers }) {
  // Calculate product stats
  const getProductStats = () => {
    const goldProducts = products.filter(p => p.metal?.toLowerCase() === 'gold').length;
    const silverProducts = products.filter(p => p.metal?.toLowerCase() === 'silver').length;
    return { goldProducts, silverProducts };
  };

  // Calculate user stats
  const getUserStats = () => {
    const adminUsers = customers.filter(c => c.role?.toLowerCase() === 'admin').length;
    const customerUsers = customers.filter(c => c.role?.toLowerCase() === 'customer').length;
    return { adminUsers, customerUsers };
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/';
    }
  };

  const { goldProducts, silverProducts } = getProductStats();
  const { adminUsers, customerUsers } = getUserStats();

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-teal-700/20 w-full p-4 sm:p-8">
      <div className="flex items-center space-x-4 mb-10">
        <div className="w-14 h-14 bg-teal-700 rounded-xl flex items-center justify-center shadow-md">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-black">Admin Profile</h2>
          <p className="text-black text-lg font-medium">Manage your account information</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-8">
          <div className="bg-white rounded-xl p-6 border border-teal-700/20 shadow-lg h-full">
            <h3 className="text-lg font-semibold text-black mb-4 text-left">Personal Information</h3>
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-black text-left">
                  <User className="w-5 h-5 text-teal-700" />
                  <span>Full Name</span>
                </label>
                <p className="text-black font-medium mt-1 text-left">{user?.fullname || 'Admin User'}</p>
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-black text-left">
                  <Mail className="w-5 h-5 text-teal-700" />
                  <span>Email</span>
                </label>
                <p className="text-black font-medium mt-1 text-left">{user?.email || 'admin@example.com'}</p>
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-black text-left">
                  <Shield className="w-5 h-5 text-teal-700" />
                  <span>Role</span>
                </label>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-700/10 text-black mt-1 transition-all duration-300 hover:bg-teal-700/20">
                  {user?.role || 'Admin'}
                </span>
              </div>
              <div className="pt-4">
       <button
  onClick={handleLogout}
  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg hover:from-red-100 hover:to-pink-100 transition-all duration-200 group w-full"
>
  <div className="flex items-center space-x-3">
    <LogOut className="w-6 h-6 text-red-500 group-hover:text-red-600 transition-colors" />
    <span className="font-medium text-gray-800 group-hover:text-red-600 transition-colors">Logout</span>
  </div>
  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
</button>





              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-teal-900 rounded-xl p-6 text-white shadow-lg flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-4 text-center">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center rounded-lg px-1 py-1 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-white" />
                  <span className="text-base font-semibold">Total Products</span>
                </div>
                <span className="text-lg font-bold">{products.length}</span>
              </div>
              <div className="ml-4 flex justify-between items-center rounded-lg px-1 py-1 transition-all duration-300">
                <span className="text-sm font-medium">Gold Products</span>
                <span className="text-base font-bold">{goldProducts}</span>
              </div>
              <div className="ml-4 flex justify-between items-center rounded-lg px-1 py-1 transition-all duration-300">
                <span className="text-sm font-medium">Silver Products</span>
                <span className="text-base font-bold">{silverProducts}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center rounded-lg px-1 py-1 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-base font-semibold">Total Customers</span>
                </div>
                <span className="text-lg font-bold">{customers.length}</span>
              </div>
              <div className="ml-4 flex justify-between items-center rounded-lg px-1 py-1 transition-all duration-300">
                <span className="text-sm font-medium">Admin Users</span>
                <span className="text-base font-bold">{adminUsers}</span>
              </div>
              <div className="ml-4 flex justify-between items-center rounded-lg px-1 py-1 transition-all duration-300">
                <span className="text-sm font-medium">Customer Users</span>
                <span className="text-base font-bold">{customerUsers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}