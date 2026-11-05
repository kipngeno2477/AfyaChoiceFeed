import React from 'react';
import jointLogoImg from '../assets/AfyaphT/afyachoice-nuscience-logo.jpg';
import classicLogoImg from '../assets/Afyachoice logo.jpeg';

export default function AfyaLogo({ 
  variant = 'navbar', 
  className = '',
  size = 'expanded',
  onClick 
}) {
  if (variant === 'icon') {
    return (
      <div 
        onClick={onClick}
        className={`relative overflow-hidden bg-white rounded-xl flex-shrink-0 flex items-center justify-center ${
          size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'
        } ${className}`}
      >
        <img
          src={classicLogoImg}
          alt="Afyachoice Feeds Emblem"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div 
        onClick={onClick}
        className={`relative overflow-hidden bg-white rounded-2xl shadow-md p-2.5 flex items-center justify-center max-w-md w-full border border-gray-100 ${className}`}
      >
        <img
          src={jointLogoImg}
          alt="Afyachoice Feeds | Nuscience Concentrates"
          className="h-16 sm:h-20 w-auto object-contain select-none"
        />
      </div>
    );
  }

  // Expanded Panoramic Navbar Brand Logo (Afyachoice Feeds | Nuscience Concentrates)
  const sizeClasses = {
    sm: 'h-10 sm:h-12 max-w-[240px]',
    md: 'h-13 sm:h-16 md:h-18 max-w-[320px] sm:max-w-[380px]',
    lg: 'h-14 sm:h-18 md:h-20 lg:h-22 max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]',
    expanded: 'h-14 sm:h-16 md:h-20 lg:h-[84px] w-auto max-w-[320px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[520px]'
  };

  return (
    <div 
      onClick={onClick}
      className={`relative flex items-center flex-shrink-0 ${sizeClasses[size] || sizeClasses.expanded} ${className}`}
    >
      <img
        src={jointLogoImg}
        alt="Afyachoice Feeds | Nuscience Concentrates - Better Feeds. Better Yield."
        className="h-full w-auto object-contain select-none pointer-events-none filter drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
  );
}
