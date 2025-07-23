import { Plus } from 'lucide-react';

export default function AddProductSection({ formData, handleInputChange, handleAddProduct, loading, categoryOptions, metalOptions, genderOptions, occasionOptions, purityOptions }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Add New Product</h2>
          <p className="text-slate-600">Create a new jewelry item</p>
        </div>
      </div>

      <form onSubmit={handleAddProduct} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              required
              disabled={loading}
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Category</option>
              {categoryOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="metal" className="block text-sm font-semibold text-slate-700 mb-2">
              Metal *
            </label>
            <select
              id="metal"
              name="metal"
              value={formData.metal}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Metal</option>
              {metalOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-semibold text-slate-700 mb-2">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Gender</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="occasion" className="block text-sm font-semibold text-slate-700 mb-2">
              Occasion *
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Occasion</option>
              {occasionOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="purity" className="block text-sm font-semibold text-slate-700 mb-2">
              Purity *
            </label>
            <select
              id="purity"
              name="purity"
              value={formData.purity}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Purity</option>
              {purityOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-slate-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}