import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Check, Award } from 'lucide-react';
import { STORE_INFO } from '../data/feedsData';

export default function FeaturedProducts({ products, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? products.filter(p => p.featured)
    : products.filter(p => p.animal === activeFilter || p.category === activeFilter);

  const createWhatsAppOrderLink = (product) => {
    const text = encodeURIComponent(
      `Hello Afyachoice Feeds, I would like to order: \n- Product: ${product.name} (${product.packaging})\n- Price: KES ${product.pricePerBag.toLocaleString()}\nPlease advise on delivery and branch pickup.`
    );
    return `https://wa.me/${STORE_INFO.phoneRaw}?text=${text}`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0b542c] bg-[#f0f9f3] px-3.5 py-1.5 rounded-full border border-emerald-200">
            Scientifically Formulated Animal Feeds
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Featured Feeds & Official Packaging Range
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base font-normal">
            Proven feed conversion ratios for Dairy Cows, Poultry, and Pigs. Freshly sacked in 50Kg and 25Kg packaging at Marurui HQ.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'Top Featured' },
              { id: 'poultry', label: 'Poultry Feeds' },
              { id: 'swine', label: 'Pig / Swine Feeds' },
              { id: 'dairy', label: 'Dairy Cattle' },
              { id: 'concentrates', label: 'Concentrates' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-xs ${
                  activeFilter === tab.id
                    ? 'bg-[#0b542c] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image & Badges */}
              <div className="relative h-60 bg-slate-50 flex items-center justify-center p-3 overflow-hidden border-b border-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#0b542c] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded shadow-xs">
                  {product.packaging}
                </span>
                {product.pricePerKg > 0 && (
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
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0b542c] transition line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features / Benefits from Sack */}
                  <div className="mt-3 space-y-1">
                    {product.benefits?.slice(0, 3).map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#0b542c] flex-shrink-0" />
                        <span className="font-medium truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs text-slate-500 font-medium">Bag Price:</span>
                    <span className="text-lg font-black text-slate-900">
                      KES {product.pricePerBag.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#f0f9f3] border border-[#cce8dc] hover:bg-[#0b542c] hover:text-white text-[#0b542c] text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <a
                      href={createWhatsAppOrderLink(product)}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#e86014] hover:bg-[#cf500d] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
