import { Search, MapPin, Heart, ShoppingCart, User, Menu } from "lucide-react";
import BestSellersSection from "../component/BestSellersSection";
import CuratedForYouSection from "../component/CuratedForYouSection";
import CategorySection from "../component/CategorySection";
import Footer from "../component/Footer";
import Testimonials from "../component/Testimonials";
import JewelryFeatures from "../component/JewelryFeatures";

function HomePage() {
  return (
    <div>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="bg-teal-700 text-white">
          {/* Main Navigation */}
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-teal-700 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wider">ORRA</h1>
                <p className="text-xs tracking-widest">FINE JEWELLERY</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for Diamond rings ..."
                  className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-1 hover:text-teal-200 transition-colors">
                <MapPin className="h-5 w-5" />
                <span>FIND A STORE</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-teal-200 transition-colors">
                <Heart className="h-5 w-5" />
                <span>WISHLIST</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-teal-200 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span>CART</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-teal-200 transition-colors">
                <User className="h-5 w-5" />
                <span>ACCOUNT</span>
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex items-center justify-center space-x-8 py-4 border-t border-teal-600">
            <button className="hover:text-teal-200 transition-colors font-medium">
              DIAMOND
            </button>
            <button className="hover:text-teal-200 transition-colors font-medium">
              PLATINUM
            </button>
            <button className="hover:text-teal-200 transition-colors font-medium">
              GOLD
            </button>
            <button className="hover:text-teal-200 transition-colors font-medium">
              RINGS
            </button>
            <button className="hover:text-teal-200 transition-colors font-medium">
              EARRINGS
            </button>
            <button className="hover:text-teal-200 transition-colors font-medium">
              NECKLACE SETS
            </button>
            <button className="hover:text-teal-200 transition-colors font-medium">
              GOLD COINS
            </button>
            <button className="hover:text-teal-200 transition-colors font-medium">
              COLLECTIONS
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <img
            src="./orra.jpg"
            alt="orra"
            className="h-full w-full object-cover"
          />
        </main>
      </div>

      <BestSellersSection />
      <JewelryFeatures />
      <CuratedForYouSection />
      <CategorySection />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePage;
