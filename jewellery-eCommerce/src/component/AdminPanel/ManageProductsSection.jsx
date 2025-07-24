import { Package, Search, Filter, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import EditProductModal from './EditProductModal';

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

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Manage Products</h2>
            <p className="text-slate-600 text-sm sm:text-base">{filteredProducts.length} products found</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 w-full sm:w-auto"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 appearance-none w-full sm:w-auto"
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

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-4 text-slate-600">No products found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Metal</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Purity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/30 divide-y divide-slate-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.prodname}
                          className="h-12 w-12 rounded-lg object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center">
                          <Package className="h-6 w-6 text-slate-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{product.prodname}</div>
                      <div className="text-sm text-slate-500 truncate max-w-xs">{product.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {product.filterLists && product.filterLists.find(f => metalOptions.includes(f))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {product.purity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50 p-2 rounded-lg hover:bg-red-50 transition-colors"
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
      )}
    </div>
  );
}