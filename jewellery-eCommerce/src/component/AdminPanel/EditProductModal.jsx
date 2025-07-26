import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

function SelectBox({ label, value, onChange, options = [], required = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}{required && ' *'}</label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 text-left focus:ring-2 focus:ring-teal-500 focus:border-transparent">
            {value || `Select ${label}`}
            <ChevronUpDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-b-xl bg-white shadow-lg ring-1 ring-black/5 z-50">
            {options.map((opt, i) => (
              <Listbox.Option
                key={i}
                className={({ active, selected }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? 'bg-teal-100 text-teal-800' : 'text-gray-700'
                  } ${selected ? 'font-semibold text-teal-600' : ''}`
                }
                value={opt}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export default function EditProductModal({ product, onClose, onSave, categoryOptions = [], metalOptions = [], genderOptions = [], occasionOptions = [], purityOptions = [], metalColourOptions = [] }) {
  const normalizeBooleanField = (value) => (value === 'yes' || value === true ? 'yes' : 'no');

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
    customizable: normalizeBooleanField(product.customizable),
    materialDescription: product.materialDescription || '',
    newArrival: normalizeBooleanField(product.newArrival),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'weights') {
      setEditFormData(prev => ({ ...prev, [name]: value.split(',').map(w => w.trim()).filter(w => w) }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...editFormData,
      filterLists: [
        editFormData.metal,
        editFormData.gender,
        editFormData.occasion,
        editFormData.category,
        editFormData.purity,
        editFormData.metalColour,
        editFormData.newArrival === 'yes' ? 'new arrivals' : null,
      ].filter(Boolean),
    };
    onSave(product._id, productData);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={handleBackdropClick}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-slate-900">Edit Product</h2>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="prodname"
                value={editFormData.prodname}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500 resize-none"
                rows={4}
                required
              />
            </div>

            <SelectBox label="Category" value={editFormData.category} onChange={(v) => setEditFormData(p => ({ ...p, category: v }))} options={categoryOptions} required />
            <SelectBox label="Metal" value={editFormData.metal} onChange={(v) => setEditFormData(p => ({ ...p, metal: v }))} options={metalOptions} required />
            <SelectBox label="Metal Colour" value={editFormData.metalColour} onChange={(v) => setEditFormData(p => ({ ...p, metalColour: v }))} options={metalColourOptions} required />
            <SelectBox label="Gender" value={editFormData.gender} onChange={(v) => setEditFormData(p => ({ ...p, gender: v }))} options={genderOptions} required />
            <SelectBox label="Occasion" value={editFormData.occasion} onChange={(v) => setEditFormData(p => ({ ...p, occasion: v }))} options={occasionOptions} required />
            <SelectBox label="Purity" value={editFormData.purity} onChange={(v) => setEditFormData(p => ({ ...p, purity: v }))} options={purityOptions} required />

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Weights (comma separated) *</label>
              <input
                type="text"
                name="weights"
                value={editFormData.weights.join(',')}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <SelectBox label="Customizable" value={editFormData.customizable} onChange={(v) => setEditFormData(p => ({ ...p, customizable: v }))} options={["yes", "no"]} required />
            <SelectBox label="New Arrival" value={editFormData.newArrival} onChange={(v) => setEditFormData(p => ({ ...p, newArrival: v }))} options={["yes", "no"]} required />

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Material Description</label>
              <textarea
                name="materialDescription"
                value={editFormData.materialDescription}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 focus:ring-2 focus:ring-teal-500 resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end space-x-3 sticky bottom-0 bg-white pb-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-teal-600 text-white hover:bg-teal-700 shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

EditProductModal.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.string),
  metalOptions: PropTypes.arrayOf(PropTypes.string),
  genderOptions: PropTypes.arrayOf(PropTypes.string),
  occasionOptions: PropTypes.arrayOf(PropTypes.string),
  purityOptions: PropTypes.arrayOf(PropTypes.string),
  metalColourOptions: PropTypes.arrayOf(PropTypes.string),
};
