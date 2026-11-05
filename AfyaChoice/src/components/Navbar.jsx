import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Sparkles,
  Lock,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { CATEGORIES } from '../data/feedsData';
import AfyaLogo from './AfyaLogo';

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  selectedCategory, 
  setSelectedCategory,
  cartCount,
  setIsCartOpen,
  setIsAuthOpen,
  currentUser,
  handleLogout,
  adminUser,
  onAdminLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateToStoreCategory = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage('store');
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('store');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-3 xl:gap-6">
          
          {/* Logo Section: Expanded brand badge overlapping / covering a bit of navbar */}
          <div 
            className="relative -my-3 sm:-my-5 z-50 flex items-center cursor-pointer select-none group flex-shrink-0"
            onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
            title="Afyachoice Feeds | Nuscience Concentrates"
          >
            <div className="bg-white/95 backdrop-blur-sm px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-b-2xl sm:rounded-b-3xl shadow-lg border-b-2 border-x border-[#0b542c]/20 group-hover:shadow-xl transition-all duration-300 transform group-hover:translate-y-0.5">
              <AfyaLogo variant="navbar" size="expanded" />
            </div>
          </div>

          {/* Center Navigation Links (100% Customer & Shopper Focused) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {/* Home Pill Button */}
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-[#0b542c] text-white px-5 py-2 rounded-full shadow-sm'
                  : 'text-slate-700 hover:text-[#0b542c] px-3 py-1.5'
              }`}
            >
              Home
            </button>

            {/* Our Products with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => { setCurrentPage('store'); }}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  currentPage === 'store'
                    ? 'bg-[#0b542c] text-white px-5 py-2 rounded-full shadow-sm'
                    : 'text-slate-700 hover:text-[#0b542c] px-3 py-1.5'
                }`}
              >
                <span>Our Products</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Products Dropdown */}
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-1 animate-fadeIn z-50">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    Product Categories
                  </div>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => navigateToStoreCategory(cat.id)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-[#f0f9f3] hover:text-[#0b542c] flex items-center justify-between transition"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-400">→</span>
                    </button>
                  ))}
                  <div className="mt-1 pt-1.5 border-t border-gray-100 px-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#0b542c] font-medium py-1">
                      <Sparkles className="w-3 h-3 text-[#e86014]" />
                      <span>Nuscience Nutrition Partner</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentPage('about')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'bg-[#0b542c] text-white px-5 py-2 rounded-full shadow-sm'
                  : 'text-slate-700 hover:text-[#0b542c] px-3 py-1.5'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => setCurrentPage('services')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'services'
                  ? 'bg-[#0b542c] text-white px-5 py-2 rounded-full shadow-sm'
                  : 'text-slate-700 hover:text-[#0b542c] px-3 py-1.5'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => setCurrentPage('branches')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'branches'
                  ? 'bg-[#0b542c] text-white px-5 py-2 rounded-full shadow-sm'
                  : 'text-slate-700 hover:text-[#0b542c] px-3 py-1.5'
              }`}
            >
              Branches
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('footer-contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setCurrentPage('about');
              }}
              className="text-sm font-medium text-slate-700 hover:text-[#0b542c] px-3 py-1.5 transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Section: Search & Cart & Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 xl:w-52 pl-4 pr-9 py-2 text-xs rounded-full border border-gray-200 bg-gray-50/50 text-slate-800 placeholder-gray-400 focus:outline-none focus:border-[#0b542c] focus:bg-white transition-all shadow-inner"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0b542c] transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Shopping Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#0b542c] hover:text-[#063d20] transition group"
              title="View Cart"
            >
              <ShoppingCart className="w-6 h-6 stroke-[1.8]" />
              <span className="absolute -top-1 -right-1 bg-[#cc1818] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </button>

            {/* Customer Account Button */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">
                  {currentUser.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-slate-700 px-2.5 py-1 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0b542c] px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#0b542c] transition"
              >
                <User className="w-3.5 h-3.5 text-[#0b542c]" />
                <span>Account</span>
              </button>
            )}

            {/* Admin Dashboard Button: ONLY VISIBLE WHEN USER IS AUTHENTICATED AS ADMIN */}
            {adminUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <button
                  onClick={() => setCurrentPage('admin')}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all shadow-sm ${
                    currentPage === 'admin'
                      ? 'bg-[#e86014] text-white shadow-md'
                      : 'bg-[#0b542c] text-white hover:bg-[#073c1f]'
                  }`}
                  title="Admin Management Dashboard"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Admin Dashboard</span>
                </button>
                <button
                  onClick={onAdminLogout}
                  className="text-[11px] text-slate-400 hover:text-red-600 px-1.5 py-1 transition"
                  title="Log out of Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#0b542c] transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-9 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 text-slate-800 focus:outline-none focus:border-[#0b542c]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-1 pt-2">
            <button
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-[#0b542c] text-white' : 'text-slate-700 hover:bg-[#f0f9f3]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('store'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'store' ? 'bg-[#0b542c] text-white' : 'text-slate-700 hover:bg-[#f0f9f3]'
              }`}
            >
              Our Products
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'about' ? 'bg-[#0b542c] text-white' : 'text-slate-700 hover:bg-[#f0f9f3]'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'services' ? 'bg-[#0b542c] text-white' : 'text-slate-700 hover:bg-[#f0f9f3]'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => { setCurrentPage('branches'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'branches' ? 'bg-[#0b542c] text-white' : 'text-slate-700 hover:bg-[#f0f9f3]'
              }`}
            >
              Branches
            </button>

            {/* Customer Account on Mobile */}
            <button
              onClick={() => { setIsAuthOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-[#f0f9f3] flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#0b542c]" />
              <span>Customer Account</span>
            </button>

            {/* ONLY VISIBLE IF ADMIN IS AUTHENTICATED */}
            {adminUser && (
              <button
                onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold bg-[#0b542c] text-white flex items-center gap-2 mt-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Admin Dashboard</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
