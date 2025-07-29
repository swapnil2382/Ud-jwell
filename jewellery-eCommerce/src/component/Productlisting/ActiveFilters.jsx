import { FaTimes } from 'react-icons/fa';

export default function ActiveFilters({ filters, sortBy, setFilters, setSortBy, searchParams, setSearchParams, clearAll }) {
  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((val) => val).length + (sortBy ? 1 : 0);
  };

  const displayFilterValue = (key, value) => {
    if (key === 'purity') return value.toUpperCase();
    if (key === 'category' || key === 'metal' || key === 'gender' || key === 'occasion') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(filters).map(([key, value]) =>
          value && (
            <span
              key={key}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-full text-sm font-medium shadow-lg"
            >
              {displayFilterValue(key, value)}
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, [key]: '' }));
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.delete(key);
                  setSearchParams(newSearchParams);
                }}
                className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <FaTimes size={10} />
              </button>
            </span>
          )
        )}
        {sortBy && (
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-medium shadow-lg">
            Sort: {sortBy === 'name-asc' ? 'Name (A-Z)' : sortBy === 'name-desc' ? 'Name (Z-A)' : 'Rating'}
            <button
              onClick={() => setSortBy('')}
              className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <FaTimes size={10} />
            </button>
          </span>
        )}
        {(Object.values(filters).some((val) => val) || sortBy) && (
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            Clear All ({getActiveFiltersCount()})
          </button>
        )}
      </div>
    </div>
  );
}