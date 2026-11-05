import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Lock } from 'lucide-react';
import { STORE_INFO, BRANCHES } from '../data/feedsData';
import AfyaLogo from './AfyaLogo';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-[#063d20] text-slate-300 border-t border-[#042b16] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">

          {/* Brand Col */}
          <div className="space-y-4">
            <div
              className="cursor-pointer inline-block"
              onClick={() => setCurrentPage('home')}
            >
              <AfyaLogo variant="footer" size="lg" />
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Operating under Afyachicks Kenya Limited. Providing high performance animal feeds, Nuscience concentrates, custom mixing services, and raw materials.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_INFO.phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#e86014] hover:bg-[#cf500d] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white transition">Home</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('store')} className="hover:text-white transition">Our Feeds Store</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-white transition">Custom Feed Mixing Services</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('branches')} className="hover:text-white transition">Store Branches & Pickup Points</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-white transition">About Afyachoice</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin')} className="text-[#e86014] hover:underline font-bold transition">Admin Portal</button>
              </li>
            </ul>
          </div>

          {/* Branches List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Branches</h4>
            <ul className="space-y-2 text-xs">
              {BRANCHES.map(b => (
                <li key={b.id} className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e86014] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">{b.name}:</span>
                    <span className="text-emerald-200/80 block text-[11px]">{b.location}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Head Office Contacts */}
          <div id="footer-contact" className="space-y-3 scroll-mt-24">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Head Office & Contact</h4>
            <div className="space-y-2 text-xs text-emerald-100/90">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e86014] flex-shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e86014] flex-shrink-0" />
                <span>0792 764 002</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#e86014] flex-shrink-0" />
                <span>info@afyachoicefeeds.co.ke</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e86014] flex-shrink-0" />
                <span>Mon-Sat: 7:00 AM - 6:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-3">
          <p>© {new Date().getFullYear()} Afyachoice Feeds (Afyachicks Kenya Ltd). All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="italic text-emerald-300 font-serif">Better Feeds. Better Yield.</span>
            <span className="text-emerald-800">•</span>
            <button
              onClick={() => setCurrentPage('admin')}
              className="text-emerald-300/60 hover:text-emerald-200 flex items-center gap-1 transition text-[11px]"
              title="Afyachoice Store Administration & Staff Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Staff & Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
