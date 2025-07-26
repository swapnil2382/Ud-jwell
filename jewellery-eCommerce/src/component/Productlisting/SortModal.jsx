import { FaTimes } from 'react-icons/fa';

export default function SortModal({ isSortModalOpen, setIsSortModalOpen, sortBy, setSortBy }) {
  if (!isSortModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10005] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Sort By</h2>
            <button
              onClick={() => setIsSortModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[
              { value: '', label: 'Default' },
              { value: 'name-asc', label: 'Name (A-Z)' },
              { value: 'name-desc', label: 'Name (Z-A)' },
              { value: 'rating', label: 'Highest Rated' }
            ].map((option) => (
              <label key={option.value} className="flex items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-3 text-teal-700 focus:ring-teal-400"
                />
                <span className="font-medium text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setIsSortModalOpen(false)}
            className="w-full py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all duration-300"
          >
            Apply Sort
          </button>
        </div>
      </div>
    </div>
  );
}