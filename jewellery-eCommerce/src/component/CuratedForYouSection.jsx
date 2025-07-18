import React, { useState } from "react";
import { X } from "lucide-react";

export default function CuratedForYouSection() {
  const [showChatBot, setShowChatBot] = useState(true);

  const categories = [
    {
      id: 1,
      title: "Women Jewellery",
      image:
        "https://cdn.augrav.com/online/jewels/2020/12/10130738/7a3096b4ebff2f0dec3f031fa498dd55.jpg",
      alt: "Two women wearing traditional Indian jewelry and sarees",
    },
    {
      id: 2,
      title: "Men Jewellery",
      image:
        "https://i.pinimg.com/736x/43/0e/b8/430eb86feaf6777008207b7d8ec759fc.jpg",
      alt: "Two men laughing and wearing jewelry",
    },
    {
      id: 3,
      title: "Kids Jewellery",
      image:
        "https://ansjewelry.com/api/wp-content/uploads/2021/06/kids.png",
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
              <div className="relative h-120 overflow-hidden">
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

     
    </div>
  );
}
