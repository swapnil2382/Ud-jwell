import { Users, User, Edit, Trash2, Search } from 'lucide-react';
import CustomerEditForm from './CustomerEditForm';

export default function ManageCustomersSection({ filteredCustomers, loading, searchTerm, setSearchTerm, isEditingCustomer, customerFormData, handleCustomerInputChange, handleUpdateCustomer, startEditingCustomer, handleDeleteCustomer, setIsEditingCustomer, setCustomerFormData }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-teal-700/20 w-full p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-6 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-teal-700 rounded-xl flex items-center justify-center shadow-md">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-black">Manage Customers</h2>
            <p className="text-black text-base font-medium">{filteredCustomers.length} customers found</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-700" size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 rounded-xl border border-teal-700/30 focus:ring-2 focus:ring-teal-700 focus:border-transparent bg-white shadow-sm text-black placeholder-teal-700/50 transition-all duration-300 w-full sm:w-64"
          />
        </div>
      </div>

      {isEditingCustomer && (
        <CustomerEditForm 
          customerFormData={customerFormData}
          handleCustomerInputChange={handleCustomerInputChange}
          handleUpdateCustomer={handleUpdateCustomer}
          loading={loading}
          cancelEditingCustomer={() => {
            setIsEditingCustomer(false);
            setCustomerFormData({ userId: '', fullname: '', email: '', phone: '', role: '' });
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-teal-700"></div>
          <p className="mt-4 text-black text-lg font-medium">Loading customers...</p>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <Users className="mx-auto h-16 w-16 text-teal-700" />
          <p className="mt-4 text-black text-lg font-medium">No customers found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-teal-700/20 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-teal-700/20">
              <thead className="bg-teal-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-teal-700/20">
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer._id} className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-teal-700/5'} hover:bg-teal-700/10`}>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-black" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-black">{customer.fullname}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium text-center">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium text-center">
                      {customer.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-700/10 text-black transition-all duration-300 hover:bg-teal-700/20">
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3 justify-center">
                      <button
                        onClick={() => startEditingCustomer(customer)}
                        disabled={loading}
                        className="bg-teal-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-teal-800 disabled:opacity-50 transition-all duration-200"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer._id)}
                        disabled={loading}
                        className="bg-red-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-teal-800 disabled:opacity-50 transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}