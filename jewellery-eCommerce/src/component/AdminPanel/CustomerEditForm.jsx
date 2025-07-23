import { Save, XCircle } from 'lucide-react';

export default function CustomerEditForm({ customerFormData, handleCustomerInputChange, handleUpdateCustomer, loading, cancelEditingCustomer }) {
  return (
    <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Edit Customer</h3>
      <form onSubmit={handleUpdateCustomer} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={customerFormData.fullname}
              onChange={handleCustomerInputChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={customerFormData.email}
              onChange={handleCustomerInputChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={customerFormData.phone}
              onChange={handleCustomerInputChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
            <select
              name="role"
              value={customerFormData.role}
              onChange={handleCustomerInputChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
          <button
            type="button"
            onClick={cancelEditingCustomer}
            className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 flex items-center space-x-2"
          >
            <XCircle size={16} />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
}