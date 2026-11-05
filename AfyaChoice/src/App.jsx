import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import BranchesPage from './pages/BranchesPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import AdminPage from './pages/AdminPage';

import { INITIAL_PRODUCTS, BRANCHES } from './data/feedsData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0].name);

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Customer Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Dedicated Admin Auth State (Separate from customer authentication)
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('afya_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleAdminLogout = () => {
    localStorage.removeItem('afya_admin_session');
    setAdminUser(null);
    if (currentPage === 'admin') {
      setCurrentPage('home');
    }
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfdfc]">
      {/* Top Bar with Contacts & Branch */}
      <TopBar 
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />

      {/* Main Sticky Navbar: Only displays Admin Dashboard button when logged in as Admin */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        setIsAuthOpen={setIsAuthOpen}
        currentUser={currentUser}
        handleLogout={() => setCurrentUser(null)}
        adminUser={adminUser}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            onAddToCart={handleAddToCart}
            setCurrentPage={setCurrentPage}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentPage === 'store' && (
          <StorePage
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'branches' && (
          <BranchesPage
            onSelectBranch={(name) => {
              setSelectedBranch(name);
              setIsCartOpen(true);
            }}
          />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'services' && <ServicesPage />}

        {currentPage === 'admin' && (
          <AdminPage
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            setCurrentPage={setCurrentPage}
            adminUser={adminUser}
            setAdminUser={setAdminUser}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />

      {/* Customer Auth Modal (With discreet staff link) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onOpenAdminPortal={() => setCurrentPage('admin')}
      />

      {/* Footer (With discrete Admin Portal link) */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
