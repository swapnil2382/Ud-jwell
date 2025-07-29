import { FaTimes, FaChevronDown } from 'react-icons/fa';

export default function FilterModal({ isFilterModalOpen, setIsFilterModalOpen, filters, handleFilterChange, resetFilters }) {
  if (!isFilterModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10005] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {[
            {
              name: 'category',
              label: 'Category',
              options: ['ring', 'chain', 'stud', 'bangle', 'bracelet', 'coin', 'pendant'],
            },
            {
              name: 'metal',
              label: 'Metal',
              options: ['gold', 'silver'],
            },
            {
              name: 'gender',
              label: 'Gender',
              options: ['men', 'women', 'kids', 'unisex'],
            },
            {
              name: 'occasion',
              label: 'Occasion',
              options: ['casual', 'engagement', 'wedding'],
            },
            {
              name: 'purity',
              label: 'Purity',
              options: ['24k', '22k', '18k', '14k', '10k', '925', '999'],
            },
          ].map((filter) => (
            <div key={filter.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{filter.label}</label>
              <div className="relative">
                <select
                  name={filter.name}
                  value={filters[filter.name]}
                  onChange={handleFilterChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-teal-700 focus:ring-4 focus:ring-teal-100 outline-none transition-all duration-300 appearance-none bg-white"
                >
                  <option value="">All {filter.label}s</option>
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {filter.name === 'purity'
                        ? option.toUpperCase()
                        : option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={resetFilters}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Reset
          </button>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="flex-1 py-3 px-4 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all duration-300"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}