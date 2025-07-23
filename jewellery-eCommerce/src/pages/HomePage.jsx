import { Search, MapPin, Heart, ShoppingCart, User, Menu } from "lucide-react";
import BestSellersSection from "../component/Homepage/BestSellersSection";
import NewArrivals from "../component/Homepage/NewArrivals";
import OurJewellery from "../component/Homepage/OurJewellery";
import JewellerySection from "../component/Homepage/JewellerySection";
import JewellerySection2 from "../component/Homepage/JewellerySection2";
import OurCollection from "../component/Homepage/OurCollection";
import AboutOurShop from "../component/Homepage/AboutOurShop";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <img
          src="./orra.jpg"
          alt="orra"
          className="w-full h-full object-cover"
        />
      </main>
      <NewArrivals />
      <OurJewellery />
      <JewellerySection />
      <JewellerySection2 />
      <BestSellersSection />
      <OurCollection />
      <AboutOurShop />
    </div>
  );
}

export default HomePage;