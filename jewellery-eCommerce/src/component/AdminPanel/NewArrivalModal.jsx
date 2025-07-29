import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const NewArrivalModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    altText: '',
    description: '',
    title: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        imageUrl: '',
        altText: '',
        description: '',
        title: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10005] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {initialData ? 'Edit New Arrival' : 'Add New Arrival'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 rounded-xl focus:border-teal-700 focus:ring-4 focus:ring-teal-100 outline-none"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Text</label>
            <input
              type="text"
              name="altText"
              value={formData.altText}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 rounded-xl focus:border-teal-700 focus:ring-4 focus:ring-teal-100 outline-none"
              placeholder="Image description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 rounded-xl focus:border-teal-700 focus:ring-4 focus:ring-teal-100 outline-none"
              placeholder="Short description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 rounded-xl focus:border-teal-700 focus:ring-4 focus:ring-teal-100 outline-none"
              placeholder="Card title"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all duration-300"
            >
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewArrivalModal;