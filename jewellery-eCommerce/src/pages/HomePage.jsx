import { Search, MapPin, Heart, ShoppingCart, User, Menu } from "lucide-react";
import BestSellersSection from "../component/BestSellersSection";
import CuratedForYouSection from "../component/CuratedForYouSection";
import CategorySection from "../component/CategorySection";
import Footer from "../component/Footer";
import Testimonials from "../component/Testimonials";
import JewelryFeatures from "../component/JewelryFeatures";
import Navbar from "../component/Navbar";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
     <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <img
          src="./orra.jpg"
          alt="orra"
          className="w-full h-full object-cover"
        />
      </main>

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