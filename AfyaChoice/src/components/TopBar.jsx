import React from 'react';
import { Phone, Mail, MapPin, Sparkles, MessageCircle, Truck, Clock } from 'lucide-react';
import { STORE_INFO, BRANCHES } from '../data/feedsData';

export default function TopBar({ selectedBranch, setSelectedBranch }) {
  // Items that slide smoothly from left to right
  const contactItems = [
    {
      id: 'phone',
      content: (
        <a 
          href={`tel:${STORE_INFO.phoneRaw}`}
          className="inline-flex items-center gap-1.5 font-bold hover:text-amber-300 transition text-[#ffffff]"
        >
          <span className="w-5 h-5 rounded-full bg-[#e86014] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Phone className="w-3 h-3 fill-white" />
          </span>
          <span className="tracking-wide">0792 764 002</span>
          <span className="text-[10px] bg-emerald-800/80 text-emerald-200 px-1.5 py-0.5 rounded-full font-medium ml-1">
            Order Line
          </span>
        </a>
      )
    },
    {
      id: 'live',
      content: (
        <div className="inline-flex items-center gap-1.5 text-emerald-100 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-[11px] text-emerald-200 font-semibold tracking-wide">
            MILL DISPATCH ACTIVE 24/7
          </span>
        </div>
      )
    },
    {
      id: 'whatsapp',
      content: (
        <a 
          href={`https://wa.me/${STORE_INFO.phoneRaw}?text=Hello%20Afyachoice%20Feeds,%20I%20would%20like%20to%20order%20animal%20feeds.`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-green-300 transition text-emerald-100 font-medium"
        >
          <span className="w-5 h-5 rounded-full bg-[#25d366] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
            </svg>
          </span>
          <span>WhatsApp Nutritionist: 0792 764 002</span>
        </a>
      )
    },
    {
      id: 'email',
      content: (
        <a 
          href="mailto:info@afyachoicefeeds.co.ke"
          className="inline-flex items-center gap-1.5 hover:text-amber-300 transition text-emerald-100 font-medium"
        >
          <span className="w-5 h-5 rounded-full bg-[#e86014] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Mail className="w-3 h-3 fill-white" />
          </span>
          <span>info@afyachoicefeeds.co.ke</span>
        </a>
      )
    },
    {
      id: 'location',
      content: (
        <div className="inline-flex items-center gap-1.5 text-emerald-100 font-medium">
          <span className="w-5 h-5 rounded-full bg-[#e86014] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <MapPin className="w-3 h-3 fill-white" />
          </span>
          <span>Nairobi (Marurui Plant) • Nakuru • Eldoret • Kericho • Matasia</span>
        </div>
      )
    },
    {
      id: 'delivery',
      content: (
        <div className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
          <Truck className="w-3.5 h-3.5" />
          <span>Countrywide Farmgate Delivery & Offloading</span>
        </div>
      )
    },
    {
      id: 'slogan',
      content: (
        <span className="italic text-emerald-200 font-serif font-semibold tracking-wide">
          ✨ Better Feeds. Better Yield.
        </span>
      )
    }
  ];

  return (
    <div className="relative bg-gradient-to-r from-[#063a1e] via-[#0b542c] to-[#063a1e] text-white text-xs border-b border-[#052b16] overflow-hidden shadow-inner">
      <div className="max-w-[1920px] mx-auto flex items-center h-9 sm:h-10">
        
        {/* Left Side Quick Badge */}
        <div className="hidden md:flex items-center gap-2 pl-4 pr-3 py-1 bg-[#063a1e] border-r border-emerald-700/50 flex-shrink-0 z-20 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#e86014] animate-ping" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200 flex items-center gap-1">
            <span>Afyachoice Direct</span>
          </span>
        </div>

        {/* Central Moving Ticker: GLIDING FROM LEFT TO RIGHT */}
        <div className="relative flex-1 overflow-hidden h-full flex items-center">
          {/* Subtle gradient fades at edges for smooth entry/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0b542c] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0b542c] to-transparent z-10 pointer-events-none" />

          {/* Continuous Left-to-Right Moving Track */}
          <div 
            className="animate-marquee-ltr flex items-center gap-8 py-1 cursor-default select-none"
            title="Hover to pause motion"
          >
            {/* Set 1 */}
            {contactItems.map((item, idx) => (
              <React.Fragment key={`orig-${idx}`}>
                <div className="flex-shrink-0 flex items-center">
                  {item.content}
                </div>
                <span className="text-emerald-500/60 font-bold">•</span>
              </React.Fragment>
            ))}

            {/* Set 2 (Duplicate for continuous seamless loop) */}
            {contactItems.map((item, idx) => (
              <React.Fragment key={`dup1-${idx}`}>
                <div className="flex-shrink-0 flex items-center">
                  {item.content}
                </div>
                <span className="text-emerald-500/60 font-bold">•</span>
              </React.Fragment>
            ))}

            {/* Set 3 (Duplicate for extra wide screens) */}
            {contactItems.map((item, idx) => (
              <React.Fragment key={`dup2-${idx}`}>
                <div className="flex-shrink-0 flex items-center">
                  {item.content}
                </div>
                <span className="text-emerald-500/60 font-bold">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Side: Social Media Circles & Branch Dropdown (Stationary for easy clicking) */}
        <div className="flex items-center gap-3 pl-3 pr-4 py-1 bg-gradient-to-l from-[#063a1e] via-[#063a1e] to-transparent z-20 flex-shrink-0">
          
          {/* Social Icons */}
          <div className="flex items-center gap-1.5">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-5 h-5 rounded-full bg-[#1877f2] flex items-center justify-center text-white text-[11px] font-bold hover:scale-110 transition shadow-sm"
              title="Facebook"
            >
              f
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${STORE_INFO.phoneRaw}?text=Hello%20Afyachoice%20Feeds,%20I%20would%20like%20to%20inquire%20about%20animal%20feeds.`}
              target="_blank"
              rel="noreferrer"
              className="w-5 h-5 rounded-full bg-[#25d366] flex items-center justify-center text-white text-[10px] hover:scale-110 transition shadow-sm"
              title="WhatsApp"
            >
              <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-5 h-5 rounded-full bg-[#ff0000] flex items-center justify-center text-white text-[9px] hover:scale-110 transition shadow-sm"
              title="YouTube"
            >
              ▶
            </a>
          </div>

          {/* Branch Pill Selector */}
          {BRANCHES && BRANCHES.length > 0 && (
            <div className="hidden sm:flex items-center gap-1 bg-[#052b16] px-2.5 py-0.5 rounded-full border border-emerald-600/40 text-[11px]">
              <span className="text-emerald-300 font-medium">Depot:</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                {BRANCHES.map(b => (
                  <option key={b.id} value={b.name} className="text-slate-900 bg-white">
                    {b.name.split(' ')[0]}
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
