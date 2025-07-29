import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapPin, Heart, ChevronDown, Menu, X, User, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const categories = [
    { name: "Gold", subcategories: ["Gold Chains", "Gold Rings", "Gold Bracelets", "Gold Bangles", "Gold Pendant"] },
    { name: "Silver", subcategories: ["Silver Rings", "Silver Pendant", "Silver Earrings", "Silver Bracelets"] },
    { name: "Collections", subcategories: ["Wedding", "Engagement", "Casual"] },
    { name: "Gold Coins", subcategories: ["24K Coins", "22K Coins", "18K Coins", "14K Coins", "10K Coins"] },
    { name: "Shop by Gender", subcategories: ["Men", "Women", "Kids", "Unisex"] },
  ];

  const fetchUser = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('userRole');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (storedUser && storedRole && isLoggedIn === 'true') {
        setUser(JSON.parse(storedUser));
        setUserRole(storedRole);
      } else {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
        const userData = res.data.data;
        setUser(userData);
        setUserRole(userData.role);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('isLoggedIn', 'true');
      }
    } catch (err) {
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      setUser(null);
      setUserRole(null);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsNavbarVisible(currentScrollPos < 100 || currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleProfileClick = () => {
    if (user && userRole) {
      console.log('User role from localStorage:', userRole);
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
  };

  const handleMouseEnter = (categoryName) => {
    clearTimeout(dropdownRef.current?.timeout);
    setHoveredCategory(categoryName);
  };

  const handleMouseLeave = (categoryName) => {
    dropdownRef.current.timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 200);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    let params = new URLSearchParams();
    let metal = '';
    let categoryFilter = '';
    let gender = '';
    let purity = '';

    if (category === 'Gold') {
      metal = 'gold';
      if (subcategory.includes('Chains')) categoryFilter = 'chain';
      else if (subcategory.includes('Rings')) categoryFilter = 'ring';
      else if (subcategory.includes('Bracelets')) categoryFilter = 'bracelet';
      else if (subcategory.includes('Bangles')) categoryFilter = 'bangle';
      else if (subcategory.includes('Pendant')) categoryFilter = 'pendant';
    } else if (category === 'Silver') {
      metal = 'silver';
      if (subcategory.includes('Rings')) categoryFilter = 'ring';
      else if (subcategory.includes('Pendant')) categoryFilter = 'pendant';
      else if (subcategory.includes('Earrings')) categoryFilter = 'stud';
      else if (subcategory.includes('Bracelets')) categoryFilter = 'bracelet';
    } else if (category === 'Collections') {
      if (subcategory === 'Wedding') params.set('occasion', 'wedding');
      else if (subcategory === 'Engagement') params.set('occasion', 'engagement');
      else if (subcategory === 'Casual') params.set('occasion', 'casual');
    } else if (category === 'Gold Coins') {
      metal = 'gold';
      categoryFilter = 'coin';
      if (subcategory.includes('24K')) purity = '24k';
      else if (subcategory.includes('22K')) purity = '22k';
      else if (subcategory.includes('18K')) purity = '18k';
      else if (subcategory.includes('14K')) purity = '14k';
      else if (subcategory.includes('10K')) purity = '10k';
    } else if (category === 'Shop by Gender') {
      gender = subcategory.toLowerCase();
    }

    if (metal) params.set('metal', metal);
    if (categoryFilter) params.set('category', categoryFilter);
    if (gender) params.set('gender', gender);
    if (purity) params.set('purity', purity);

    navigate(`/products?${params.toString()}`);
    setHoveredCategory(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`bg-gradient-to-b from-teal-900 to-teal-950 text-white shadow-lg sticky top-0 z-[9999] transition-transform duration-300 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between relative z-[10000]">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-teal-900 rounded-full" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif tracking-tight">ORRA</h1>
              <p className="text-sm tracking-wide text-yellow-200 uppercase">Fine Jewellery</p>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center space-x-2 hover:text-yellow-400 transition-all duration-200"
          >
            <Package className="h-6 w-6" />
            <span className="text-base font-semibold">Products</span>
          </button>
          <button
            onClick={() => navigate('/wishlist')}
            className="flex items-center space-x-2 hover:text-yellow-400 transition-all duration-200"
          >
            <Heart className="h-6 w-6" />
            <span className="text-base font-semibold">Wishlist</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-yellow-400 transition-all duration-200">
            <MapPin className="h-6 w-6" />
            <span className="text-base font-semibold">Find a Store</span>
          </button>

          {user ? (
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 hover:text-yellow-400 transition-all duration-200"
            >
              <User className="w-6 h-6" />
              <span className="text-base font-semibold">{user.fullname}</span>
              {userRole && (
                <span className="text-xs bg-yellow-600 px-2 py-1 rounded-full">
                  {userRole}
                </span>
              )}
            </button>
          ) : (
            <>
              <a href="/login" className="text-base font-semibold hover:text-yellow-400 transition-all duration-200">Login</a>
              <a href="/signup" className="text-base font-semibold hover:text-yellow-400 transition-all duration-200">Signup</a>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      <nav className="hidden md:flex justify-center space-x-12 py-4 bg-teal-950 border-t border-teal-800 text-base font-semibold uppercase tracking-wide font-sans relative z-[10000]">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={() => handleMouseLeave(category.name)}
            ref={dropdownRef}
          >
            <button className="flex items-center space-x-1 text-teal-100 hover:text-yellow-400 transition-all duration-200">
              <span>{category.name}</span>
              <ChevronDown className={`h-5 w-5 transform transition-transform duration-300 ${hoveredCategory === category.name ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>
            {hoveredCategory === category.name && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-2xl border border-gray-100 z-[10001] min-w-[250px] py-4"
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={() => handleMouseLeave(category.name)}
              >
                {category.subcategories.map((sub) => (
                  <button
                    key={sub}
                    className="block w-full px-6 py-2 text-left text-gray-800 hover:bg-teal-50 hover:text-teal-900 transition-all duration-200"
                    onClick={() => handleSubcategoryClick(category.name, sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-6 bg-teal-950 border-t border-teal-800 text-base font-medium relative z-[10000]">
          <div className="py-4 space-y-4">
            <button
              onClick={() => {
                navigate('/products');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center space-x-3 text-teal-100 hover:text-yellow-400 transition-all duration-200"
            >
              <Package className="h-5 w-5" />
              <span>Products</span>
            </button>
            <button
              onClick={() => {
                navigate('/wishlist');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center space-x-3 text-teal-100 hover:text-yellow-400 transition-all duration-200"
            >
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </button>
            <button className="w-full text-left flex items-center space-x-3 text-teal-100 hover:text-yellow-400 transition-all duration-200">
              <MapPin className="h-5 w-5" />
              <span>Find a Store</span>
            </button>

            {user ? (
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => {
                    handleProfileClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-teal-100 hover:text-yellow-400 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user.fullname}</span>
                  {userRole && (
                    <span className="text-[10px] bg-yellow-600 px-2 py-0.5 rounded-full">
                      {userRole}
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <>
                <a href="/login" className="block text-teal-100 hover:text-yellow-400 transition-all duration-200">Login</a>
                <a href="/signup" className="block text-teal-100 hover:text-yellow-400 transition-all duration-200">Signup</a>
              </>
            )}
          </div>

          <hr className="my-3 border-teal-700" />

          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <button onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)} className="w-full flex items-center justify-between text-teal-100 hover:text-yellow-400 py-3">
                  <span>{cat.name}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedCategory === cat.name ? "rotate-180" : ""}`} />
                </button>
                {expandedCategory === cat.name && (
                  <div className="pl-6 text-teal-200">
                    {cat.subcategories.map((sub) => (
                      <div
                        key={sub}
                        className="py-2 hover:text-white transition-all duration-200 cursor-pointer"
                        onClick={() => {
                          handleSubcategoryClick(cat.name, sub);
                          setMobileMenuOpen(false);
                        }}
                      >
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