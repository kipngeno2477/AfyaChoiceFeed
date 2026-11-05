import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Headphones, 
  ShieldCheck, 
  TrendingUp, 
  Handshake, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  Award,
  Leaf,
  Pause,
  Play
} from 'lucide-react';
import heroBannerMain from '../assets/AfyaphT/hero-banner-main.jpg';
import sackPoultryLineup from '../assets/AfyaphT/AFYACHICK/WhatsApp Image 2026-11-04 at 14.43.30.jpeg';
import afyaChoiceWarehouse from '../assets/AfyaphT/AFYA CHOICE 32.jpeg';
import { STORE_INFO } from '../data/feedsData';

export default function BrandHero({ onShopClick, onContactClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Transition every 3.5 seconds ("in a few seconds")
  const SLIDE_DURATION = 3500;

  const slides = [
    {
      id: 'better-yield-main',
      badge: '🌿 Premium Animal Nutrition',
      headlineWhite: 'Better Feeds.',
      headlineOrange: 'Better Yield.',
      subtitle: 'Quality feeds for healthier livestock, improved productivity and higher profits.',
      image: heroBannerMain,
      imageAlt: 'Afyachoice Feeds - Better Feeds. Better Yield. Dairy Meal, Poultry Feeds, Pig Feeds',
      features: [
        { label: 'Premium Quality', icon: ShieldCheck },
        { label: 'Higher Yields', icon: TrendingUp },
        { label: 'Expert Support', icon: Handshake },
        { label: 'Sustainable Farming', icon: Leaf }
      ],
      primaryCta: 'Shop Products',
      secondaryCta: 'Contact Us',
      tag: '50Kg Sacks Available'
    },
    {
      id: 'poultry-range',
      badge: '🐔 Complete Commercial Poultry Line',
      headlineWhite: 'Chick Starter To',
      headlineOrange: 'High-Lay Mash',
      subtitle: 'Chick Starter (0-4wks), Chick Grower (5-16wks), Developer Mash, Pre-Layer, and Layer 105/145/165/245 for maximum farm egg return.',
      image: sackPoultryLineup,
      imageAlt: 'Afyachoice Commercial Poultry Feed Sacks Lineup',
      features: [
        { label: '0-4 Wks Starter', icon: ShieldCheck },
        { label: 'Layer 105-245 Range', icon: TrendingUp },
        { label: 'Finisher Feeds', icon: CheckCircle2 },
        { label: 'Direct From Mill', icon: Truck }
      ],
      primaryCta: 'Explore Poultry Feeds',
      secondaryCta: 'Request Price List',
      tag: 'Layer 105 / 145 / 165 / 245'
    },
    {
      id: 'warehouse-dispatch',
      badge: '🏭 Countrywide Direct Dispatch',
      headlineWhite: 'Factory-Fresh Feeds',
      headlineOrange: 'Direct To Your Farm',
      subtitle: 'Milled to high standards in Nairobi and dispatched daily to Nakuru, Eldoret, Kericho, Matasia, and farms countrywide.',
      image: afyaChoiceWarehouse,
      imageAlt: 'Afyachoice Feeds Production Warehouse and Dispatch Center',
      features: [
        { label: '5 Regional Depots', icon: Truck },
        { label: 'Same-Day Dispatch', icon: CheckCircle2 },
        { label: 'Nuscience Partner', icon: Sparkles },
        { label: 'Wholesale & Retail', icon: Award }
      ],
      primaryCta: 'Locate Nearest Branch',
      secondaryCta: 'Order Via WhatsApp',
      tag: 'Countrywide Delivery'
    }
  ];

  // Auto-slide effect every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleContactAction = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      window.open(
        `https://wa.me/${STORE_INFO.phoneRaw}?text=Hello%20Afyachoice%20Feeds,%20I%20would%20like%20to%20order%20animal%20feeds.`,
        '_blank'
      );
    }
  };

  return (
    <section 
      className="relative bg-[#063319] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ======================================================== */}
      {/* 1. SLIDER STAGE CONTAINER WITH 3.5s SMOOTH TRANSITIONS   */}
      {/* ======================================================== */}
      <div className="relative w-full overflow-hidden bg-slate-950">
        
        {/* Slides Track with smooth transform */}
        <div 
          className="flex transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div 
              key={slide.id}
              className="w-full flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-slate-950"
            >
              <div className="relative w-full max-w-[1920px] mx-auto">
                
                {/* Stage Canvas */}
                <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px] flex items-center overflow-hidden">
                  
                  {/* Background Hero Image with gentle Ken-Burns Zoom */}
                  <img 
                    src={slide.image} 
                    alt={slide.imageAlt}
                    className={`w-full h-full object-cover sm:object-contain object-right sm:object-center transform transition-transform duration-[3500ms] ease-out ${
                      idx === currentSlide ? 'scale-105' : 'scale-100'
                    }`}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />

                  {/* ======================================================== */}
                  {/* LINEAR GRADIENT OF DARK GREEN IN THE LEFT SIDE            */}
                  {/* ======================================================== */}
                  <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-[54%] bg-gradient-to-r from-[#032311] via-[#063a1e]/95 via-50% to-transparent z-10 pointer-events-none" />

                  {/* Subtle top & bottom shadow gradient for smooth navbar blending */}
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />

                  {/* Floating Decorative Leaf Accents with gentle animation */}
                  <div className="absolute top-6 right-6 sm:top-10 sm:right-12 pointer-events-none animate-float hidden sm:block z-20">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 flex items-center justify-center shadow-lg">
                      <Leaf className="w-6 h-6 md:w-8 md:h-8 text-emerald-300 fill-emerald-400/30" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-20 right-8 sm:bottom-24 sm:right-16 pointer-events-none animate-float-reverse hidden sm:block z-20">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#e86014]/20 backdrop-blur-md border border-[#e86014]/30 flex items-center justify-center shadow-md">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#e86014]" />
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* CONTENT OVERLAY OVER THE DARK GREEN LINEAR GRADIENT      */}
                  {/* ======================================================== */}
                  <div className="absolute inset-0 z-20 flex items-center">
                    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
                      <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6">
                        
                        {/* Slide Badge Pill */}
                        <div className="inline-flex items-center gap-2 bg-[#052b16]/90 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                          <span className="w-2 h-2 rounded-full bg-[#e86014] animate-ping" />
                          <span className="tracking-wide uppercase">{slide.badge}</span>
                        </div>

                        {/* Two-Tone Headline */}
                        <div className="space-y-1">
                          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
                            {slide.headlineWhite}
                          </h1>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#e86014] tracking-tight leading-[1.1] drop-shadow-md">
                            {slide.headlineOrange}
                          </h2>
                        </div>

                        {/* Subtitle with High Legibility over dark green */}
                        <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 font-medium leading-relaxed max-w-lg drop-shadow-sm">
                          {slide.subtitle}
                        </p>

                        {/* 4 Feature Badges in High-Contrast Green Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                          {slide.features.map((feat, fIdx) => {
                            const IconComp = feat.icon;
                            return (
                              <div 
                                key={fIdx} 
                                className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-sm border border-emerald-500/30 shadow-sm"
                              >
                                <div className="w-7 h-7 rounded-lg bg-emerald-600/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
                                  <IconComp className="w-4 h-4 stroke-[2.2]" />
                                </div>
                                <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                                  {feat.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Interactive Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                          <button
                            onClick={onShopClick}
                            className="inline-flex items-center gap-2.5 bg-[#e86014] hover:bg-[#cf500d] text-white font-extrabold text-sm sm:text-base px-7 sm:px-9 py-3 sm:py-3.5 rounded-full shadow-lg shadow-orange-900/40 hover:shadow-orange-600/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                          >
                            <span>{slide.primaryCta}</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>

                          <button
                            onClick={handleContactAction}
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full backdrop-blur-md border border-white/40 hover:border-white shadow-md transition-all transform hover:-translate-y-0.5"
                          >
                            <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                            <span>{slide.secondaryCta}</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 2. SLIDE CONTROLS: PREVIOUS / NEXT ARROWS & INDICATORS   */}
        {/* ======================================================== */}
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#0b542c] text-white shadow-xl backdrop-blur-md flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border border-white/20"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#0b542c] text-white shadow-xl backdrop-blur-md flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border border-white/20"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Animated Progress Countdown Bar for the "Few Seconds" Transition */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/40 z-30">
          <div 
            key={currentSlide}
            className={`h-full bg-gradient-to-r from-emerald-400 via-[#e86014] to-emerald-300 ${
              isPaused ? '' : 'animate-[marquee_3.5s_linear_infinite]'
            }`}
            style={{
              animation: isPaused ? 'none' : `progressCountdown ${SLIDE_DURATION}ms linear infinite`
            }}
          />
        </div>

        {/* Bottom Slide Indicators (Dots & Mini Titles) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide 
                  ? 'w-8 h-2.5 bg-[#e86014] shadow-md shadow-orange-500/50' 
                  : 'w-2.5 h-2.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}

          {/* Pause / Play indicator */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume auto-play" : "Pause auto-play"}
            className="ml-1 text-white/70 hover:text-white transition"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. NUTRITION PARTNER RIBBON (MATCHING USER REFERENCE)    */}
      {/* ======================================================== */}
      <div className="relative bg-gradient-to-r from-[#042813] via-[#0b542c] to-[#042813] text-white border-t-2 border-[#e86014]">
        
        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* 4 Feature Badges with Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full lg:w-auto">
              
              {/* Feature 1: Increased Milk Production */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-amber-300 shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M4 2h16l-2 18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L4 2zm3.1 4l1.2 12h7.4l1.2-12H7.1zM9 9h6v2H9V9z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Increased Milk
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    Production (+4L)
                  </div>
                </div>
              </div>

              {/* Feature 2: Healthy Animals */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-emerald-300 shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2a4 4 0 0 1 4 4c0 .73-.2 1.41-.54 2H18a3 3 0 0 1 3 3v1a6 6 0 0 1-6 6h-2v2h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2H9a6 6 0 0 1-6-6v-1a3 3 0 0 1 3-3h2.54A3.98 3.98 0 0 1 8 6a4 4 0 0 1 4-4z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Healthy Animals
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    & Livestock Vitality
                  </div>
                </div>
              </div>

              {/* Feature 3: Greater Profitability */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-[#e86014] shadow-sm">
                  <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Greater
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    Profitability
                  </div>
                </div>
              </div>

              {/* Feature 4: Sustainable Farming */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-emerald-300 shadow-sm">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Sustainable
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    Farming Practices
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Script Text "Your Partner in Animal Nutrition" */}
            <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-emerald-800/60 lg:border-l lg:pl-6">
              <span className="font-serif italic text-lg sm:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-amber-200 to-[#e86014] drop-shadow-sm">
                Your Partner in Animal Nutrition
              </span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
