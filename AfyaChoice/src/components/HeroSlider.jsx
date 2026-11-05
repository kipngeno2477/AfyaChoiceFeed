import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, ShieldCheck, Award, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/feedsData';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1600&q=80",
    badge: "Official Nuscience Partner",
    title: "Better Feeds. Better Yield.",
    subtitle: "High-yield formulas for Dairy Cows, Poultry, and Pigs. Enriched with bypass protein and premium concentrates.",
    cta: "Explore Our Store",
    accent: "Quality Nutrition Guaranteed"
  },
  {
    image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1600&q=80",
    badge: "Dairy Meal High Yield Formula",
    title: "Boost Your Milk Production Up To +4 Litres",
    subtitle: "Specially formulated 50kg bags enriched with high protein and minerals for peak lactation and butterfat.",
    cta: "Order Dairy Feeds",
    accent: "Tested on 1,000+ Kenyan Dairy Farms"
  },
  {
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1600&q=80",
    badge: "Countrywide Distribution",
    title: "5 Branches Across Kenya Ready To Supply",
    subtitle: "Stocked in Marurui (Nairobi), Matasia, Eldoret, Kericho, and Nakuru. Fast deliveries and on-site mixing services.",
    cta: "Find Nearest Branch",
    accent: "Fast Farmgate Delivery"
  }
];

export default function HeroSlider({ onCtaClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden min-h-[540px] md:min-h-[620px] flex items-center">
      {/* Background Slides with Cross-Fade */}
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          } transform transition-transform duration-[7000ms]`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-farm-dark/95 via-farm-dark/75 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 z-10 w-full">
        <div className="max-w-2xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-md">
            <Award className="w-4 h-4 text-amberGold" />
            <span>{slide.badge}</span>
          </div>

          {/* Animated Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-emerald-100/90 leading-relaxed font-normal">
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onCtaClick}
              className="bg-farm-primary hover:bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-green-900/40 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>{slide.cta}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={`https://wa.me/${STORE_INFO.phoneRaw}?text=Hello%20Afyachoice,%20I%20want%20to%20order%20animal%20feeds.`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-white font-bold px-6 py-3.5 rounded-xl backdrop-blur-md flex items-center gap-2 transition"
            >
              <MessageCircle className="w-5 h-5 text-emerald-300" />
              <span>Order via WhatsApp</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-xs md:text-sm text-emerald-200">
            <div>
              <p className="text-xl md:text-2xl font-black text-white">50Kg / 70Kg</p>
              <p className="text-emerald-300/80">Standard Packaging</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-amber-400">5 Branches</p>
              <p className="text-emerald-300/80">Marurui, Nakuru & More</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white">100%</p>
              <p className="text-emerald-300/80">Quality Tested</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-amberGold' : 'w-2.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}