import React from 'react';
import { ShieldCheck, TrendingUp, Truck, Headphones } from 'lucide-react';

export default function TrustBar() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      subtitle: "Feeds"
    },
    {
      icon: TrendingUp,
      title: "Higher Yields",
      subtitle: "& Profits"
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      subtitle: "& Support"
    },
    {
      icon: Headphones,
      title: "Expert Advice",
      subtitle: "& Support"
    }
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
                }`}
              >
                {/* Green Outline Icon Circle */}
                <div className="w-12 h-12 rounded-xl bg-[#f0f9f3] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 text-[#0b542c]">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Text */}
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {f.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    {f.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

