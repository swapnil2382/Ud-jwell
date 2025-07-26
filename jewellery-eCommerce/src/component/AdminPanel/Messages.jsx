import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export default function Messages({ success, error }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (success || error) {
      setIsVisible(true);
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        handleClose();
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      document.dispatchEvent(new CustomEvent('clearMessages'));
    }, 300);
  };

  if (!success && !error) return null;

  return (
    <div className="fixed top-6 right-6 max-w-md w-full z-[10002] pointer-events-none">
      {success && isVisible && (
        <div 
          className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl bg-white border-l-4 border-green-500 transition-all duration-300 ease-in-out pointer-events-auto transform ${
            isAnimating 
              ? 'translate-x-0 opacity-100 scale-100' 
              : 'translate-x-full opacity-0 scale-95'
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 mb-1">Success</div>
            <div className="text-sm text-gray-700 leading-relaxed">{success}</div>
          </div>
          <button 
            onClick={handleClose}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
      )}
      
      {error && isVisible && (
        <div 
          className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl bg-white border-l-4 border-red-500 transition-all duration-300 ease-in-out pointer-events-auto transform ${
            isAnimating 
              ? 'translate-x-0 opacity-100 scale-100' 
              : 'translate-x-full opacity-0 scale-95'
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 mb-1">Error</div>
            <div className="text-sm text-gray-700 leading-relaxed">{error}</div>
          </div>
          <button 
            onClick={handleClose}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}