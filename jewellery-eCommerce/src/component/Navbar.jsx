import { Search, MapPin, Heart, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [

    {
      name: "Gold",
      subcategories: ["Gold Chains", "Gold Rings", "Gold Necklaces", "Gold Bangles"],
    },
    {
      name: "Silver",
      subcategories: ["Silver Rings", "Silver Necklaces", "Silver Earrings", "Silver Bracelets"],
    },

    {
      name: "Rings",
      subcategories: ["Engagement Rings", "Wedding Bands", "Fashion Rings", "Stackable Rings"],
    },
    {
      name: "Earrings",
      subcategories: ["Stud Earrings", "Hoop Earrings", "Drop Earrings", "Chandelier Earrings"],
    },
    {
      name: "Necklace Sets",
      subcategories: ["Pendant Sets", "Choker Sets", "Long Necklace Sets", "Bridal Sets"],
    },
    {
      name: "Gold Coins",
      subcategories: ["24K Coins", "22K Coins", "Commemorative Coins", "Investment Coins"],
    },
    {
      name: "Collections",
      subcategories: ["Bridal Collection", "Festive Collection", "Classic Collection", "Modern Collection"],
    },
  ];

  return (
    <header className="bg-gradient-to-b from-teal-900 to-teal-950 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-teal-900 rounded-full" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-tight">ORRA</h1>
            <p className="text-sm tracking-wide text-yellow-200 uppercase">Fine Jewellery</p>
          </div>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-8">
          <button className="flex items-center space-x-2 hover:text-yellow-400 transition-all duration-200">
            <MapPin className="h-6 w-6" />
            <span className="text-base font-semibold">Find a Store</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-yellow-400 transition-all duration-200">
            <Heart className="h-6 w-6" />
            <span className="text-base font-semibold">Wishlist</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Desktop Category Navigation */}
      <nav className="hidden md:flex justify-center space-x-12 py-4 bg-teal-950 border-t border-teal-800 text-base font-semibold uppercase tracking-wide font-sans">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative"
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <button className="flex items-center space-x-1 text-teal-100 hover:text-yellow-400 transition-all duration-200">
              <span>{category.name}</span>
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-300 ${hoveredCategory === category.name ? 'rotate-180 text-yellow-400' : ''
                  }`}
              />
            </button>

            {/* Hover Dropdown */}
            {hoveredCategory === category.name && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-2xl border border-gray-100 z-50 min-w-[250px] py-4">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub}
                    className="block w-full px-6 py-2 text-left text-gray-800 hover:bg-teal-50 hover:text-teal-900 transition-all duration-200"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-6 bg-teal-950 border-t border-teal-800 text-base font-medium">
          <div className="py-4 space-y-4">
            <button className="w-full text-left flex items-center space-x-3 text-teal-100 hover:text-yellow-400 transition-all duration-200">
              <MapPin className="h-5 w-5" />
              <span>Find a Store</span>
            </button>
            <button className="w-full text-left flex items-center space-x-3 text-teal-100 hover:text-yellow-400 transition-all duration-200">
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </button>
          </div>
          <hr className="my-3 border-teal-700" />
          {/* Categories */}
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <button
                  onClick={() =>
                    setExpandedCategory(expandedCategory === cat.name ? null : cat.name)
                  }
                  className="w-full flex items-center justify-between text-teal-100 hover:text-yellow-400 py-3"
                >
                  <span>{cat.name}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${expandedCategory === cat.name ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {expandedCategory === cat.name && (
                  <div className="pl-6 text-teal-200">
                    {cat.subcategories.map((sub) => (
                      <div key={sub} className="py-2 hover:text-white transition-all duration-200">
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;