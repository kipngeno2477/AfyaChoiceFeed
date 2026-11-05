import React from 'react';

export default function BottomBanner() {
  return (
    <div className="relative bg-[#0b542c] text-white overflow-hidden py-4 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Left: Handshake Icon & Partnership Slogan */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
            <svg 
              className="w-6 h-6 fill-none stroke-current stroke-2" 
              viewBox="0 0 24 24" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m11 17 2 2a1 1 0 1 0 3-3" />
              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
              <path d="m21 3 1 11h-2" />
              <path d="M3 3 2 14l10 7 2-2" />
              <path d="m3 14 6 5" />
            </svg>
          </div>

          <p className="text-sm sm:text-base font-bold italic tracking-wide text-white">
            Afyachoice Feeds – Partnering with Farmers for a Food Secure Kenya
          </p>
        </div>

        {/* Right side teaser */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-emerald-200">
          <span>Countrywide branches & farm delivery</span>
        </div>

      </div>

      {/* Decorative Orange Curved Swoosh Accent on the Right */}
      <div className="absolute right-0 top-0 bottom-0 w-36 sm:w-64 pointer-events-none overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 200 60" 
          preserveAspectRatio="none"
        >
          <path 
            d="M 50,0 Q 120,30 200,60 L 200,0 Z" 
            fill="#e86014" 
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
}

