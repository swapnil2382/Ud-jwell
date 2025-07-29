import { MoreVertical, X, User, Package, Users, Plus, Star } from 'lucide-react';

export default function Header({ activeSection, setActiveSection, isMenuOpen, setIsMenuOpen }) {
  const navigationItems = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'add', label: 'Add Product', icon: Plus },
    { key: 'manage', label: 'Manage Products', icon: Package },
    { key: 'customers', label: 'Manage Customers', icon: Users },
    { key: 'new-arrivals', label: 'Manage New Arrivals', icon: Star },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-end p-4 relative">
      {/* Desktop Navigation */}
      <nav className="hidden sm:flex space-x-2">
        {navigationItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
              activeSection === key
                ? 'bg-teal-700 text-white shadow-lg shadow-teal-700/25'
                : 'text-teal-700 hover:bg-teal-50 hover:text-teal-800'
            }`}
          >
            <Icon size={16} />
            <span className="hidden md:inline">{label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile Menu Toggle */}
      <button 
        className="sm:hidden p-3 rounded-xl hover:bg-teal-50 transition-colors text-teal-700 bg-white shadow-md"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X size={20} /> : <MoreVertical size={20} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-20 right-4 w-56 bg-white rounded-xl shadow-xl z-50">
          <nav className="p-3 space-y-1">
            {navigationItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                  activeSection === key
                    ? 'bg-teal-700 text-white shadow-lg shadow-teal-700/25'
                    : 'text-teal-700 hover:bg-teal-50'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}