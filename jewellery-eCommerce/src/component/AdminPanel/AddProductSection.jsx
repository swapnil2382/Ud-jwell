import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { Plus } from "lucide-react";
import PropTypes from 'prop-types';

export default function AddProductSection({
  formData,
  handleInputChange,
  handleImageChange,
  handleAddProduct,
  setFormData,
  loading,
  categoryOptions,
  metalOptions,
  genderOptions,
  occasionOptions,
  purityOptions,
  metalColourOptions,
}) {
  const renderDropdown = (name, label, options) => (
    <Listbox
      value={formData[name] || ''}
      onChange={(value) =>
        handleInputChange({
          target: {
            name,
            value,
          },
        })
      }
      disabled={loading}
    >
      <div className="relative">
        <Listbox.Label className="block text-sm font-semibold text-slate-700 mb-2">
          {label} *
        </Listbox.Label>
        <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white/50 border border-slate-300 py-3 pl-4 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all">
          <span className="block truncate">
            {formData[name] ? formData[name].charAt(0).toUpperCase() + formData[name].slice(1) : `Select ${label}`}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-b-xl bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-teal-100 text-teal-900' : 'text-slate-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-teal-700 rounded-2xl flex items-center justify-center">
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
            <label htmlFor="prodname" className="block text-sm font-semibold text-slate-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="prodname"
              name="prodname"
              value={formData.prodname}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
              required
              disabled={loading}
            />
          </div>

          {renderDropdown("category", "Category", categoryOptions)}
          {renderDropdown("metal", "Metal", metalOptions)}
          {renderDropdown("metalColour", "Metal Colour", metalColourOptions)}
          {renderDropdown("gender", "Gender", genderOptions)}
          {renderDropdown("occasion", "Occasion", occasionOptions)}
          {renderDropdown("purity", "Purity", purityOptions)}

          <div className="lg:col-span-2">
            <label htmlFor="weights" className="block text-sm font-semibold text-slate-700 mb-2">
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
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              required
              disabled={loading}
              placeholder="e.g. 5, 10"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="images" className="block text-sm font-semibold text-slate-700 mb-2">
              Images *
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              required
              disabled={loading}
            />
          </div>

          {renderDropdown("customizable", "Customizable", ["yes", "no"])}
          {renderDropdown("newArrival", "New Arrival", ["yes", "no"])}

          <div className="lg:col-span-2">
            <label htmlFor="materialDescription" className="block text-sm font-semibold text-slate-700 mb-2">
              Material Description
            </label>
            <textarea
              id="materialDescription"
              name="materialDescription"
              value={formData.materialDescription}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
              disabled={loading}
              placeholder="Describe the material, textures, etc."
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-700 to-teal-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-teal-900 hover:to-teal-900 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

AddProductSection.propTypes = {
  formData: PropTypes.shape({
    prodname: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    metal: PropTypes.string,
    metalColour: PropTypes.string,
    gender: PropTypes.string,
    occasion: PropTypes.string,
    purity: PropTypes.string,
    weights: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
    customizable: PropTypes.string,
    materialDescription: PropTypes.string,
    newArrival: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleAddProduct: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  metalOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  genderOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  occasionOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  purityOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  metalColourOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};