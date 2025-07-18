import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../index.css";

const products = [
  {
    id: 1,
    name: "Triple Delight Gold Chain",
    weight: "22 grams",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Eternal Love Band 18KT Gold & Silver Ring",
    weight: "5 grams",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "Elegant Precision Gold & Silver Bracelet",
    weight: "15 grams",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=500&fit=crop&crop=center",
  },
  {
    id: 4,
    name: "Sleek Textured Gold Bangle",
    weight: "12 grams",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop&crop=center",
  },
  {
    id: 5,
    name: "14KT Rose Gold Heartbeat Ring",
    weight: "4 grams",
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=500&fit=crop&crop=center",
  },
];

export default function HorizontalBestSellersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const next = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const normalizedDiff =
      diff > products.length / 2
        ? diff - products.length
        : diff < -products.length / 2
          ? diff + products.length
          : diff;

    const baseSpacing = 300;
    const x = normalizedDiff * baseSpacing;
    const curveHeight = Math.pow(Math.abs(normalizedDiff), 3) * 10;
    const y = normalizedDiff === 0 ? -10 : curveHeight;
    const tiltAngle = normalizedDiff === 0 ? 0 : normalizedDiff * 6;

    if (normalizedDiff === 0) {
      return {
        transform: `translateX(${x}px) translateY(${y}px) scale(1) rotateZ(${tiltAngle}deg)`,
        zIndex: 30,
        opacity: 1,
      };
    }
    if (Math.abs(normalizedDiff) === 1) {
      return {
        transform: `translateX(${x}px) translateY(${y}px) scale(0.95) rotateZ(${tiltAngle}deg)`,
        zIndex: 20,
        opacity: 0.9,
      };
    }
    if (Math.abs(normalizedDiff) === 2) {
      return {
        transform: `translateX(${x}px) translateY(${y}px) scale(0.85) rotateZ(${tiltAngle}deg)`,
        zIndex: 10,
        opacity: 0.8,
      };
    }
    return {
      transform: `translateX(${x}px) translateY(${y}px) scale(0.7) rotateZ(${tiltAngle}deg)`,
      zIndex: 5,
      opacity: 0.6,
    };
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16 overflow-hidden">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
          Best Sellers
        </h1>
        <p className="text-gray-500 text-lg">Our Most Loved Picks</p>
      </div>

      <button
        onClick={prev}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-40 hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
      >
        <ChevronLeft className="w-6 h-6 text-[#5a0a1e]" />
      </button>
      <button
        onClick={next}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-40 hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
      >
        <ChevronRight className="w-6 h-6 text-[#5a0a1e]" />
      </button>

      <div className="relative h-[500px] flex justify-center items-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto">
          {products.map((product, index) => {
            const cardStyle = getCardStyle(index);
            const showBorder =
              hoveredIndex === index ||
              (hoveredIndex === null && index === currentIndex);

            return (
              <div
                key={product.id}
                className={`absolute left-1/2 top-1/2 w-[280px] h-[400px] -ml-[140px] -mt-[200px] cursor-pointer ${index === currentIndex ? "animate-float" : ""
                  }`}
                style={cardStyle}
                onClick={() => setCurrentIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`w-full h-full rounded-3xl overflow-hidden bg-white shadow-2xl transition-transform duration-300 hover:scale-[1.03] ${showBorder
                      ? "ring-[1px] ring-yellow-400 ring-opacity-40 shadow-[0_0_25px_10px_rgba(255,215,0,0.5)]"
                      : ""
                    }`}

                >
                  <div className="relative h-[70%] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  <div className="h-[30%] p-6 bg-white flex flex-col justify-between">
                    <div>
                      <h3 className="text-gray-800 text-lg font-medium leading-tight mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Weight: {product.weight}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex
                ? "bg-[#5a0a1e]"
                : "bg-gray-300 hover:bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
