import { XCircle } from 'lucide-react';

export default function Messages({ success, error }) {
  if (!success && !error) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}