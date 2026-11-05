import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, MessageCircle, Check, Eye } from 'lucide-react';
import { CATEGORIES, STORE_INFO } from '../data/feedsData';
import AfyaLogo from '../components/AfyaLogo';

export default function StorePage({ 
  products, 
  selectedCategory, 
  setSelectedCategory, 
  onAddToCart 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedChartModal, setSelectedChartModal] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      product.category === selectedCategory || 
      product.animal === selectedCategory;

    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.label && product.label.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'low') return a.pricePerBag - b.pricePerBag;
    if (sortBy === 'high') return b.pricePerBag - a.pricePerBag;
    return 0;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Banner with Deep Forest Green & Brand Orange */}
        <div className="bg-[#0b542c] text-white p-6 sm:p-8 rounded-3xl mb-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="bg-[#e86014] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              Official Feeds & Concentrates Store
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              Afyachoice Feeds & Concentrates Catalog
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-2 leading-relaxed">
              Explore our complete range of authentic Poultry Feeds, Pig Diets, Dairy Meals, and Concentrates. Packaged in genuine 50Kg and 25Kg sacks ready for farmgate delivery or branch pickup.
            </p>
          </div>
          <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/20 hidden lg:block flex-shrink-0 relative z-10">
            <AfyaLogo variant="navbar" size="lg" />
          </div>

          {/* Decorative background curve */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#e86014]/15 rounded-full pointer-events-none transform translate-x-12 translate-y-12" />
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-[#0b542c]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-64 p-2 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:border-[#0b542c]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search feed name (e.g. Layer 145, Pig Grower)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0b542c]"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-500 whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 p-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0b542c]"
            >
              <option value="featured">Featured Feeds</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const isChart = product.category === 'formulations' || product.pricePerBag === 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image Container with contain fit */}
                <div className="relative h-60 bg-slate-50 flex items-center justify-center p-3 overflow-hidden border-b border-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#0b542c] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded shadow-xs">
                    {product.packaging}
                  </span>
                  {!isChart && product.pricePerKg > 0 && (
                    <span className="absolute top-3 right-3 bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-gray-100">
                      KES {product.pricePerKg}/Kg
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Label from Sack */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] uppercase font-extrabold text-[#0b542c] tracking-wider bg-[#f0f9f3] px-2 py-0.5 rounded-md">
                        {product.animal || product.category}
                      </span>
                      {product.label && (
                        <span className="text-[10px] font-bold text-[#e86014] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60 line-clamp-1">
                          {product.label}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-[#0b542c] transition">
                      {product.name}
                    </h3>

                    <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Benefits from Sack */}
                    <div className="mt-3 space-y-1">
                      {product.benefits?.slice(0, 3).map((b, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#0b542c] flex-shrink-0" />
                          <span className="font-medium truncate">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xs text-slate-500">
                        {isChart ? 'Nutritional Guide:' : 'Bag Price:'}
                      </span>
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {isChart ? (
                          <span className="text-[#0b542c] text-xs font-bold bg-[#f0f9f3] px-2.5 py-1 rounded-md">
                            Free Farmer Guide
                          </span>
                        ) : (
                          `KES ${product.pricePerBag.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {isChart ? (
                        <button
                          onClick={() => setSelectedChartModal(product)}
                          className="col-span-2 bg-[#0b542c] hover:bg-[#073d1f] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Formulation Table</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="bg-[#f0f9f3] border border-[#cce8dc] hover:bg-[#0b542c] hover:text-white text-[#0b542c] text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                          <a
                            href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Afyachoice, I would like to order: ${product.name} (${product.packaging}) at KES ${product.pricePerBag}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#e86014] hover:bg-[#cf500d] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Formulation Chart Lightbox Modal */}
      {selectedChartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full border border-gray-100 flex flex-col max-h-[92vh]">
            <div className="bg-[#0b542c] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#e86014] uppercase tracking-wider block">
                  Official Nutrition Guide
                </span>
                <h3 className="font-bold text-base sm:text-lg">{selectedChartModal.name}</h3>
              </div>
              <button
                onClick={() => setSelectedChartModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-slate-50 flex-1 overflow-auto flex items-center justify-center">
              <img
                src={selectedChartModal.image}
                alt={selectedChartModal.name}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
