import { useState } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

export default function EditProductModal({ product, onClose, onSave, categoryOptions = [], metalOptions = [], genderOptions = [], occasionOptions = [], purityOptions = [], metalColourOptions = [] }) {
  const [editFormData, setEditFormData] = useState({
    prodname: product.prodname || '',
    description: product.description || '',
    category: product.category || '',
    metal: product.metal || '',
    metalColour: product.metalColour || '',
    gender: product.gender || '',
    occasion: product.occasion || '',
    purity: product.purity || '',
    weights: Array.isArray(product.weights) ? product.weights : [],
    filterLists: Array.isArray(product.filterLists) ? product.filterLists : [],
    customizable: product.customizable || '',
    materialDescription: product.materialDescription || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'weights') {
      setEditFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(w => w.trim()).filter(w => w)
      }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      const productData = {
        ...editFormData,
        filterLists: [
          editFormData.metal,
          editFormData.gender,
          editFormData.occasion,
          editFormData.category,
          editFormData.purity,
          editFormData.metalColour,
        ].filter(Boolean),
      };
      onSave(product._id, productData);
      onClose();
    } else {
      console.error('onSave is not a function. Please ensure handleEditProduct is defined and passed correctly.');
    }
  };

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Edit Product</h2>
          <button 
            onClick={onClose} 
            className="text-slate-600 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="prodname"
                  value={editFormData.prodname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  rows={4}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={editFormData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Metal */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Metal *</label>
                <select
                  name="metal"
                  value={editFormData.metal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Metal</option>
                  {metalOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Metal Colour */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Metal Colour *</label>
                <select
                  name="metalColour"
                  value={editFormData.metalColour}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Metal Colour</option>
                  {metalColourOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={editFormData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Occasion *</label>
                <select
                  name="occasion"
                  value={editFormData.occasion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Occasion</option>
                  {occasionOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purity */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Purity *</label>
                <select
                  name="purity"
                  value={editFormData.purity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Purity</option>
                  {purityOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weights */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Weights (comma separated) *</label>
                <input
                  type="text"
                  name="weights"
                  value={Array.isArray(editFormData.weights) ? editFormData.weights.join(',') : ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  placeholder="e.g. 5, 10"
                />
              </div>

              {/* Customizable */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Customizable *</label>
                <select
                  name="customizable"
                  value={editFormData.customizable}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Material Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Material Description</label>
                <textarea
                  name="materialDescription"
                  value={editFormData.materialDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  rows={3}
                  placeholder="Describe the material, textures, etc."
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end space-x-3 sticky bottom-0 bg-white pb-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

EditProductModal.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    prodname: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    metal: PropTypes.string,
    metalColour: PropTypes.string,
    gender: PropTypes.string,
    occasion: PropTypes.string,
    purity: PropTypes.string,
    weights: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    filterLists: PropTypes.arrayOf(PropTypes.string),
    customizable: PropTypes.string,
    materialDescription: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.string),
  metalOptions: PropTypes.arrayOf(PropTypes.string),
  genderOptions: PropTypes.arrayOf(PropTypes.string),
  occasionOptions: PropTypes.arrayOf(PropTypes.string),
  purityOptions: PropTypes.arrayOf(PropTypes.string),
  metalColourOptions: PropTypes.arrayOf(PropTypes.string)
};