import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
import dairyMealBag from '../assets/AfyaphT/AFYA76.jpeg';
import sackLayer145 from '../assets/AfyaphT/AFYACHICK/Layer 145.jpeg';
import sackPigGrower from '../assets/AfyaphT/AFYACHICK/Grower pig.jpeg';
import sackPig25Concentrate from '../assets/AfyaphT/AFYACHICK/pig 25 percent.jpeg';
import afyaChoiceWarehouse from '../assets/AfyaphT/AFYA CHOICE 32.jpeg';

export default function CategoryShowcase({ onCategorySelect, onContactClick }) {
  const categories = [
    {
      id: 'dairy-calf',
      name: 'Dairy Calf Starter',
      image: afyaChoiceWarehouse,
      tag: '50 Kg Sacks',
      categoryKey: 'dairy'
    },
    {
      id: 'dairy-meal',
      name: 'Dairy Meal (High Yield Formula)',
      image: dairyMealBag,
      tag: 'High Protein',
      categoryKey: 'dairy'
    },
    {
      id: 'poultry',
      name: 'Poultry Feeds (Layer 145)',
      image: sackLayer145,
      tag: '50 Kg Sacks',
      categoryKey: 'poultry'
    },
    {
      id: 'pig',
      name: 'Pig Feeds (Grower & Fattener)',
      image: sackPigGrower,
      tag: '50 Kg Sacks',
      categoryKey: 'swine'
    },
    {
      id: 'concentrates',
      name: 'Other Feeds & Concentrates',
      image: sackPig25Concentrate,
      tag: '50 Kg Sacks',
      categoryKey: 'concentrates'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Green Decorative Lines */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-[2px] w-12 sm:w-20 bg-[#0b542c]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b542c] tracking-tight">
              Our Products
            </h2>
            <div className="h-[2px] w-12 sm:w-20 bg-[#0b542c]" />
          </div>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Authentic, scientifically balanced animal feeds in genuine 50Kg and 25Kg packaging.
          </p>
        </div>

        {/* 5 Product Category Cards + 1 Our Commitment Card */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategorySelect(cat.categoryKey)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col bg-white"
            >
              {/* Product Photo */}
              <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-50 flex items-center justify-center p-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {cat.tag}
                </span>
              </div>

              {/* Dark Green Label Bar at Bottom */}
              <div className="bg-[#0b542c] text-white p-2.5 text-center flex-1 flex items-center justify-center min-h-[48px] group-hover:bg-[#073d1f] transition-colors">
                <span className="text-xs font-bold leading-tight line-clamp-2">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}

          {/* Our Commitment Card */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 bg-[#f0f9f3] rounded-2xl p-5 border border-[#cce8dc] relative overflow-hidden flex flex-col justify-between shadow-xs">
            
            {/* Top Leaf Icon & Heading */}
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-1.5 text-[#0b542c]">
                <Leaf className="w-5 h-5 fill-[#0b542c]" />
                <Leaf className="w-4 h-4 text-[#0b542c] -ml-2 -mt-2" />
              </div>

              <h3 className="text-base font-extrabold text-[#0b542c] leading-snug">
                Our Commitment
              </h3>

              <p className="text-[11px] text-slate-700 leading-relaxed font-normal">
                To provide high-quality feeds and excellent service to help you achieve greater productivity and profitability.
              </p>
            </div>

            {/* Bottom Contact Us Button in Brand Orange */}
            <div className="pt-3 relative z-10">
              <button
                onClick={onContactClick}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#e86014] hover:bg-[#cf500d] text-white text-xs font-bold px-3 py-2 rounded-full shadow-xs transition"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Organic Green Curved Accent at Bottom Right */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#0b542c]/15 rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#0b542c] rounded-full pointer-events-none opacity-90 transform scale-75" />
          </div>

        </div>

      </div>
    </section>
  );
}
