import React, { useState } from "react";
import { X } from "lucide-react";

export default function CuratedForYouSection() {
  const [showChatBot, setShowChatBot] = useState(true);

  const categories = [
    {
      id: 1,
      title: "Women Jewellery",
      image:
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=400&fit=crop&crop=faces",
      alt: "Two women wearing traditional Indian jewelry and sarees",
    },
    {
      id: 2,
      title: "Men Jewellery",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=faces",
      alt: "Two men laughing and wearing jewelry",
    },
    {
      id: 3,
      title: "Kids Jewellery",
      image:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop&crop=faces",
      alt: "Mother and daughter wearing matching jewelry",
    },
  ];

  return (
    <div className="bg-white py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
            Curated For You
          </h1>
          <p className="text-gray-500 text-lg">Shop By Gender</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Category Title */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-medium">
                    {category.title}
                  </h3>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Explore Collection
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Bot Widget */}
      {showChatBot && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-sm relative">
            {/* Close Button */}
            <button
              onClick={() => setShowChatBot(false)}
              className="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Chat Bot Content */}
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-lg">👋</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-gray-100 rounded-xl p-3 mb-2">
                  <p className="text-gray-800 text-sm">How can I help you?</p>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>Activate Windows</p>
                  <p>Go to Settings to activate Windows</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
