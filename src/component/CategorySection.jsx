import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySection() {
  return (
    <div className="bg-pink-50 py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">
            Category
          </h1>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Diamond Jewellery - Large left */}
          <div className="col-span-3 row-span-2 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=600&fit=crop&crop=center"
                alt="Diamond Ring"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-lg font-medium">
                    Diamond Jewellery
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Rings - Top right small */}
          <div className="col-span-3 row-span-1 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop&crop=center"
                alt="Gold Ring"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-pink-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-sm font-medium">Rings</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Pendants - Medium center */}
          <div className="col-span-3 row-span-2 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=600&fit=crop&crop=center"
                alt="Gold Pendant"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-pink-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-lg font-medium">Pendants</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Bracelets - Small top right */}
          <div className="col-span-3 row-span-1 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&crop=center"
                alt="Gold Bracelet"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-pink-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-sm font-medium">Bracelets</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Silver - Medium horizontal */}
          <div className="col-span-3 row-span-1 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center"
                alt="Silver Jewelry"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-pink-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-sm font-medium">Silver</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Gold Jewellery - Top far right */}
          <div className="col-span-3 row-span-1 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=300&fit=crop&crop=center"
                alt="Gold Jewelry"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-yellow-500/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-sm font-medium">
                    Gold Jewellery
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Earrings - Large bottom left */}
          <div className="col-span-3 row-span-1 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=300&fit=crop&crop=center"
                alt="Gold Earrings"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-pink-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-sm font-medium">Earrings</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Necklace - Bottom center */}
          <div className="col-span-3 row-span-1 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=300&fit=crop&crop=center"
                alt="Gold Necklace"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-pink-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-sm font-medium">Necklace</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Mangalasutra - Bottom center-right */}
          <div className="col-span-3 row-span-1 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&crop=center"
                alt="Mangalasutra"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-pink-400/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-sm font-medium">
                    Mangalasutra
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Coins - Small bottom right */}
          <div className="col-span-3 row-span-1 relative group cursor-pointer">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1610375461369-d613b564f04c?w=400&h=300&fit=crop&crop=center"
                alt="Gold Coins"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-orange-500/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <h3 className="text-white text-sm font-medium">Coins</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Jewellery with Gemstone - Far right */}
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all group">
          <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
        </button>

        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all group">
          <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
        </button>
      </div>

      {/* Windows Activation Notice */}
      <div className="fixed bottom-4 right-4 text-gray-400 text-sm">
        <p>Activate Windows</p>
        <p>Go to Settings to activate Windows.</p>
      </div>
    </div>
  );
}
