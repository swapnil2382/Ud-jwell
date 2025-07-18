import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllCards, setShowAllCards] = useState(false);

  const slides = [
    [
      {
        title: "Silver Jewellery",
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=600&fit=crop&crop=center",
        alt: "Diamond Ring",
        colSpan: "col-span-3",
        rowSpan: "row-span-2",
        textSize: "text-xl",
        padding: "p-8",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Rings",
        img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop&crop=center",
        alt: "Gold Ring",
        colSpan: "col-span-3",
        rowSpan: "row-span-1",
        textSize: "text-base",
        padding: "p-5",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Pendants",
        img: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=600&fit=crop&crop=center",
        alt: "Gold Pendant",
        colSpan: "col-span-3",
        rowSpan: "row-span-2",
        textSize: "text-xl",
        padding: "p-8",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Bracelets",
        img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&crop=center",
        alt: "Gold Bracelet",
        colSpan: "col-span-3",
        rowSpan: "row-span-1",
        textSize: "text-base",
        padding: "p-5",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Silver",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
        alt: "Silver Jewelry",
        colSpan: "col-span-3",
        rowSpan: "row-span-1",
        textSize: "text-base",
        padding: "p-5",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Gold Jewellery",
        img: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=300&fit=crop&crop=center",
        alt: "Gold Jewelry",
        colSpan: "col-span-3",
        rowSpan: "row-span-1",
        textSize: "text-base",
        padding: "p-5",
        bgColor: "bg-teal-900/80",
      },
    ],
    [
      {
        title: "Necklaces",
        img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=300&fit=crop&crop=center",
        alt: "Gold Necklace",
        colSpan: "col-span-3",
        rowSpan: "row-span-1",
        textSize: "text-base",
        padding: "p-5",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Earrings",
        img: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=300&fit=crop&crop=center",
        alt: "Gold Earrings",
        colSpan: "col-span-3",
        rowSpan: "row-span-2",
        textSize: "text-xl",
        padding: "p-8",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Coins",
        img: "https://media.assettype.com/TNIE/import/2021/10/19/original/gold_coin.JPG?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
        alt: "Gold Coins",
        colSpan: "col-span-3",
        rowSpan: "row-span-1",
        textSize: "text-base",
        padding: "p-5",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Mangalsutras",
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&crop=center",
        alt: "Mangalasutra",
        colSpan: "col-span-3",
        rowSpan: "row-span-2",
        textSize: "text-xl",
        padding: "p-8",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Men's Bracelets",
        img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop&crop=center",
        alt: "Men's Bracelet",
        colSpan: "col-span-3",
        rowSpan: "row-span-1",
        textSize: "text-base",
        padding: "p-5",
        bgColor: "bg-teal-900/80",
      },
      {
        title: "Men's Chains",
        img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=300&fit=crop&crop=center",
        alt: "Men's Chain",
        colSpan: "col-span-3",
        rowSpan: "row-span-1",
        textSize: "text-base",
        padding: "p-5",
        bgColor: "bg-teal-900/80",
      },
    ],
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const allCards = slides.flat();
  const visibleCards = showAllCards ? allCards : allCards.slice(0, 5);

  return (
    <div className="bg-gradient-to-b from-stone-50/50 to-white py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
            Explore Our Collections
          </h1>
          <p className="text-gray-500 text-lg">Handpicked Styles for Every Taste</p>
        </div>

        <div className="hidden md:grid grid-cols-12 gap-6 h-[600px]">
          {slides[currentSlide].map((category, index) => (
            <div key={index} className={`${category.colSpan} ${category.rowSpan} relative group cursor-pointer`}>
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <img src={category.img} alt={category.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className={`absolute bottom-0 left-0 right-0 ${category.padding}`}>
                  <div className={`${category.bgColor} rounded-xl px-4 py-2`}>
                    <h3 className={`text-white ${category.textSize} font-semibold tracking-wide`}>
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden space-y-6">
          {visibleCards.map((category, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="w-full h-72 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <img src={category.img} alt={category.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`${category.bgColor} rounded-xl px-4 py-2`}>
                    <h3 className="text-white text-lg font-semibold tracking-wide">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!showAllCards && (
            <div className="text-center pt-8">
              <button onClick={() => setShowAllCards(true)}
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                See More
              </button>
            </div>
          )}

          {showAllCards && (
            <div className="text-center pt-8">
              <button onClick={() => setShowAllCards(false)}
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Show Less
              </button>
            </div>
          )}
        </div>

        <button onClick={handlePrev} className="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-stone-100/80 backdrop-blur-sm rounded-full shadow-lg items-center justify-center hover:bg-teal-700 hover:shadow-xl transition-all duration-300 group">
          <ChevronLeft className="w-7 h-7 text-slate-800 group-hover:text-white" />
        </button>

        <button onClick={handleNext} className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-stone-100/80 backdrop-blur-sm rounded-full shadow-lg items-center justify-center hover:bg-teal-700 hover:shadow-xl transition-all duration-300 group">
          <ChevronRight className="w-7 h-7 text-slate-800 group-hover:text-white" />
        </button>

      </div>
    </div>
  );
}
