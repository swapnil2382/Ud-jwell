import { Package, Search, Filter, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import EditProductModal from './EditProductModal';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-center text-black p-6 bg-white rounded-xl shadow-lg">Error loading modal. Please try again.</div>;
    }
    return this.props.children;
  }
}

export default function ManageProductsSection({ 
  filteredProducts, 
  loading, 
  searchTerm, 
  setSearchTerm, 
  filterCategory, 
  setFilterCategory, 
  handleDeleteProduct, 
  handleEditProduct, 
  categoryOptions, 
  metalOptions,
  genderOptions,
  occasionOptions,
  purityOptions,
  metalColourOptions
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  // Normalize newArrival field for display
  const normalizeNewArrival = (value) => {
    if (value === 'yes' || value === true) return 'Yes';
    if (value === 'no' || value === false) return 'No';
    return 'No'; // Default to 'No' if undefined or invalid
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-teal-700/20 w-full p-4 sm:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-6 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-teal-700 rounded-xl flex items-center justify-center shadow-md">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-black">Manage Products</h2>
            <p className="text-black text-base font-medium">{filteredProducts.length} products found</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-700" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-xl border border-teal-700/30 focus:ring-2 focus:ring-teal-700 focus:border-transparent bg-white shadow-sm text-black placeholder-teal-700/50 transition-all duration-300 w-full sm:w-64"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-700" size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl border border-teal-700/30 focus:ring-2 focus:ring-teal-700 focus:border-transparent bg-white shadow-sm text-black appearance-none w-full sm:w-48 transition-all duration-300"
            >
              <option value="">All Categories</option>
              {categoryOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-teal-700"></div>
          <p className="mt-4 text-black text-lg font-medium">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <Package className="mx-auto h-16 w-16 text-teal-700" />
          <p className="mt-4 text-black text-lg font-medium">No products found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-teal-700/20 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-teal-700/20">
              <thead className="bg-teal-700">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Metal</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Purity</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">New Arrival</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-teal-700/20">
                {filteredProducts.map((product, index) => (
                  <tr key={product._id} className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-teal-700/5'} hover:bg-teal-700/10`}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.prodname}
                          className="h-12 w-12 rounded-lg object-cover border border-teal-700/30 shadow-sm mx-auto"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-teal-700/10 flex items-center justify-center mx-auto shadow-sm">
                          <Package className="h-6 w-6 text-teal-700" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="text-sm font-semibold text-black">{product.prodname}</div>
                      <div className="text-sm text-black/80 truncate max-w-xs">{product.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-700/10 text-black shadow-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium text-center">
                      {product.filterLists && product.filterLists.find(f => metalOptions.includes(f))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium text-center">
                      {product.purity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium text-center">
                      {normalizeNewArrival(product.newArrival)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3 justify-center">
                      <button
                        onClick={() => openEditModal(product)}
                        disabled={loading}
                        className="bg-teal-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-teal-800 disabled:opacity-50 transition-all duration-200"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
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

      {isEditModalOpen && selectedProduct && (
        <ErrorBoundary>
          <EditProductModal
            product={selectedProduct}
            onClose={closeEditModal}
            onSave={handleEditProduct}
            categoryOptions={categoryOptions}
            metalOptions={metalOptions}
            genderOptions={genderOptions}
            occasionOptions={occasionOptions}
            purityOptions={purityOptions}
            metalColourOptions={metalColourOptions}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}