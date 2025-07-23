import { User } from 'lucide-react';

export default function ProfileSection({ user, products, customers }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Admin Profile</h2>
          <p className="text-slate-600">Manage your account information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <p className="text-slate-900 font-medium mt-1">{user?.fullname || 'Admin User'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <p className="text-slate-900 font-medium mt-1">{user?.email || 'admin@example.com'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Role</label>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {user?.role || 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Products</span>
              <span className="text-2xl font-bold">{products.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Customers</span>
              <span className="text-2xl font-bold">{customers.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}