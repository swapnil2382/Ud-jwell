import { MoreVertical, X, User, Package, Users, Settings, Plus } from 'lucide-react';

export default function Header({ user, activeSection, setActiveSection, isMenuOpen, setIsMenuOpen }) {
  const navigationItems = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'add', label: 'Add Product', icon: Plus },
    { key: 'manage', label: 'Manage Products', icon: Package },
    { key: 'customers', label: 'Manage Customers', icon: Users },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-600">Welcome back, {user?.fullname || 'Admin'}</p>
            </div>
          </div>

          <nav className="hidden lg:flex space-x-1">
            {navigationItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeSection === key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <button 
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            <nav className="space-y-2">
              {navigationItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveSection(key);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeSection === key
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}