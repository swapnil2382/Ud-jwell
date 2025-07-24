import { X } from 'lucide-react';

export default function Messages({ success, error }) {
  if (!success && !error) return null;

  return (
    <div className="fixed top-4 right-4 max-w-sm w-full z-[1000]">
      {success && (
        <div
          className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-green-600 text-white transition-all duration-300 transform translate-x-0 opacity-100"
        >
          <span>{success}</span>
          <button
            onClick={() => {
              document.dispatchEvent(new CustomEvent('clearMessages'));
            }}
            className="ml-4 text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      )}
      {error && (
        <div
          className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-red-600 text-white transition-all duration-300 transform translate-x-0 opacity-100"
        >
          <span>{error}</span>
          <button
            onClick={() => {
              document.dispatchEvent(new CustomEvent('clearMessages'));
            }}
            className="ml-4 text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}