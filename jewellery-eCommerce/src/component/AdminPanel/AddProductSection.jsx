import { Plus } from "lucide-react";

export default function AddProductSection({
  formData,
  handleInputChange,
  handleImageChange,
  handleAddProduct,
  loading,
  categoryOptions,
  metalOptions,
  genderOptions,
  occasionOptions,
  purityOptions,
  metalColourOptions,
}) {
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
          {/* Product Name */}
          <div className="lg:col-span-2">
            <label
              htmlFor="prodname"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Product Name *
            </label>
            <input
              type="text"
              id="prodname"
              name="prodname"
              value={formData.prodname}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 resize-none"
              required
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Category</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Metal */}
          <div>
            <label
              htmlFor="metal"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Metal *
            </label>
            <select
              id="metal"
              name="metal"
              value={formData.metal}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Metal</option>
              {metalOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Metal Colour */}
          <div>
            <label
              htmlFor="metalColour"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Metal Colour *
            </label>
            <select
              id="metalColour"
              name="metalColour"
              value={formData.metalColour}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Metal Colour</option>
              {metalColourOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Gender</option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label
              htmlFor="occasion"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Occasion *
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Occasion</option>
              {occasionOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Purity */}
          <div>
            <label
              htmlFor="purity"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Purity *
            </label>
            <select
              id="purity"
              name="purity"
              value={formData.purity}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Purity</option>
              {purityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Weights */}
          <div className="lg:col-span-2">
            <label
              htmlFor="weights"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Weights (comma separated) *
            </label>
            <input
              type="text"
              id="weights"
              name="weights"
              value={formData.weights.join(",")}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "weights",
                    value: e.target.value.split(",").map((w) => w.trim()),
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
              placeholder="e.g. 5, 10"
            />
          </div>

          {/* Filter Lists */}
          {/* <div className="lg:col-span-2">
            <label
              htmlFor="filterLists"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Filter Tags (comma separated)
            </label>
            <input
              type="text"
              id="filterLists"
              name="filterLists"
              value={formData.filterLists.join(",")}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "filterLists",
                    value: e.target.value.split(",").map((tag) => tag.trim()),
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              disabled={loading}
              placeholder="e.g. lightweight, modern, bridal"
            />
          </div> */}

          {/* Image URLs */}
          <div className="lg:col-span-2">
            <label
              htmlFor="images"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Image URLs (comma separated) *
            </label>
            {/* <input
              type="text"
              id="images"
              name="images"
              value={formData.images.join(",")}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "images",
                    value: e.target.value.split(",").map((url) => url.trim()),
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
              placeholder="https://img1.jpg, https://img2.jpg"
            /> */}
            <input
              type="file"
              // required
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Customizable */}
          <div>
            <label
              htmlFor="customizable"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Customizable *
            </label>
            <select
              id="customizable"
              name="customizable"
              value={formData.customizable}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50"
              required
              disabled={loading}
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Material Description */}
          <div className="lg:col-span-2">
            <label
              htmlFor="materialDescription"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Material Description
            </label>
            <textarea
              id="materialDescription"
              name="materialDescription"
              value={formData.materialDescription}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 resize-none"
              disabled={loading}
              placeholder="Describe the material, textures, etc."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
