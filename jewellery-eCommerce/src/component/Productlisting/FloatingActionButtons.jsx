import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

export default function FloatingActionButtons({ setIsFilterModalOpen, setIsSortModalOpen }) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-teal-400 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="relative px-6 py-4 text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 font-semibold"
        >
          <FaFilter />
          Filter
        </button>
        <div className="w-px h-12 bg-white"></div>
        <button
          onClick={() => setIsSortModalOpen(true)}
          className="px-6 py-4 text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 font-semibold"
        >
          <FaSortAmountDown />
          Sort
        </button>
      </div>
    </div>
  );
}