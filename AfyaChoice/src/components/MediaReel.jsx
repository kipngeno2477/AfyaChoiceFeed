import React, { useState } from 'react';
import { Play, X, Video, Image as ImageIcon, Award, Warehouse, Truck, CheckCircle, ExternalLink } from 'lucide-react';
import { MEDIA_REEL_ITEMS, STORE_INFO } from '../data/feedsData';

export default function MediaReel() {
  const [activeMedia, setActiveMedia] = useState(null);

  return (
    <section className="py-16 bg-[#f7fbf8] border-y border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f0f9f3] text-[#0b542c] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <Warehouse className="w-3.5 h-3.5" />
              <span>Warehouse, Plant & Operational Footage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Inside Afyachoice Operations & Facilities
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mt-1.5 font-normal">
              Take an exclusive look inside our automated milling hub, high-yield bagging lines, warehouse stacks, and direct countrywide farmgate delivery fleet.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-bold text-[#0b542c] bg-white px-3.5 py-2 rounded-full border border-emerald-200 shadow-xs flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Nuscience Nutrition Partner</span>
            </span>
          </div>
        </div>

        {/* Media Grid: Real Playable Videos & Authentic Warehouse Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEDIA_REEL_ITEMS.slice(0, 4).map((item) => {
            const isVideo = item.type === 'video';
            return (
              <div
                key={item.id}
                onClick={() => setActiveMedia(item)}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900 h-80 cursor-pointer flex flex-col justify-end border border-gray-100"
              >
                {/* Background Video / Thumbnail */}
                {isVideo ? (
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      src={item.source}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#0b542c]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#e86014] transition-all duration-300">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.source}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                )}

                {/* Dark Gradient Overlay for Text Readability */}
                <div className="relative z-10 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="bg-[#e86014] text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                      {isVideo ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                      <span>{isVideo ? 'Play Video' : 'View Photo'}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-200 transition line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Gallery: Warehouse Stacks, Storefront & Official Communications */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {MEDIA_REEL_ITEMS.slice(4).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-slate-900 h-64 cursor-pointer flex flex-col justify-end border border-gray-100"
            >
              <img
                src={item.source}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                <span className="bg-[#0b542c] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded w-max mb-1 inline-block">
                  {item.badge}
                </span>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Three Value Pillars (From Poster) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f0f9f3] border border-emerald-200 flex items-center justify-center text-[#0b542c] flex-shrink-0">
              <Award className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">Quality Nutrition</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Balanced feeds formulated to support healthy birds & cows, immune resilience, high vitality, and zero digestive stress.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f0f9f3] border border-emerald-200 flex items-center justify-center text-[#0b542c] flex-shrink-0">
              <Warehouse className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">Better Growth</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Scientifically tested formulations that maximize live weight gain, continuous egg laying, high milk litres, and feed efficiency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f0f9f3] border border-emerald-200 flex items-center justify-center text-[#0b542c] flex-shrink-0">
              <Truck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">Better Returns</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Guaranteed productivity and higher profit margins for farmers across Kenya with wholesale farmgate delivery.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Media Modal for Full Video & Image Viewing */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full border border-gray-100 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-[#0b542c] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="bg-[#e86014] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded mr-2">
                  {activeMedia.badge}
                </span>
                <span className="font-bold text-sm sm:text-base">{activeMedia.title}</span>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 bg-black flex-1 flex items-center justify-center overflow-hidden min-h-[300px]">
              {activeMedia.type === 'video' ? (
                <video
                  src={activeMedia.source}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[60vh] w-full rounded-xl"
                />
              ) : (
                <img
                  src={activeMedia.source}
                  alt={activeMedia.title}
                  className="max-h-[65vh] w-auto max-w-full rounded-xl object-contain"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
              <p className="font-medium text-slate-700">{activeMedia.subtitle}</p>
              <a
                href={`https://wa.me/${STORE_INFO.phoneRaw}?text=Hello%20Afyachoice,%20I%20saw%20your%20facility%20media%20and%20want%20to%20order.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#0b542c] hover:bg-[#073d1f] text-white font-bold px-4 py-2 rounded-xl transition flex-shrink-0"
              >
                <span>Inquire on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
