import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function BestSellersSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Triple Delight Gold Chain",
      price: "₹1,26,346",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-amber-100 to-amber-200",
    },
    {
      id: 2,
      name: "Eternal Love Band 18KT Gold & Diamond Ring",
      price: "₹25,383",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-pink-400 to-red-500",
    },
    {
      id: 3,
      name: "Elegant Precision Gold & Diamond Bracelet",
      price: "₹1,06,415",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-amber-200 to-amber-300",
    },
    {
      id: 4,
      name: "Sleek Textured Gold Bangle",
      price: "₹51,844",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-teal-200 to-teal-300",
    },
    {
      id: 5,
      name: "14KT Rose Gold Heartbeat Diamond Ring",
      price: "₹32,648",
      image:
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-pink-200 to-rose-300",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (products.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + (products.length - 2)) % (products.length - 2)
    );
  };

  const visibleProducts = products.slice(currentSlide, currentSlide + 3);

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          {/* Decorative stars */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 transform rotate-45 rounded-sm"></div>
              <div className="w-4 h-4 bg-gradient-to-br from-pink-400 to-pink-600 transform rotate-45 rounded-sm"></div>
              <div className="w-2 h-2 bg-gradient-to-br from-pink-400 to-pink-600 transform rotate-45 rounded-sm"></div>
            </div>
          </div>

          <h2 className="text-lg text-gray-600 mb-2">Our</h2>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">
            Best Sellers
          </h1>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div className="flex justify-center items-center space-x-6 overflow-hidden">
            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 ${
                  index === 1 ? "scale-105 z-10" : "scale-95"
                }`}
              >
                <div
                  className={`w-72 h-80 rounded-3xl ${product.bgColor} p-6 flex flex-col justify-between relative overflow-hidden shadow-xl`}
                >
                  {/* Heart icon */}
                  <div className="absolute top-4 right-4 z-20">
                    <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="flex-1 flex items-center justify-center relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-48 h-48 object-cover rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="text-center text-white">
                    <h3 className="text-lg font-medium mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold">{product.price}</p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: products.length - 2 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-pink-500 w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
