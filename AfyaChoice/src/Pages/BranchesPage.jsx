import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { BRANCHES, STORE_INFO } from '../data/feedsData';

export default function BranchesPage({ onSelectBranch }) {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-farm-primary bg-emerald-100 px-3 py-1 rounded-full">
            Countrywide Presence
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            Our Store Branches Across Kenya
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Visit any of our distribution depots to collect your feed orders, buy Nuscience concentrates, or schedule custom feed mixing.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANCHES.map(branch => (
            <div
              key={branch.id}
              className={`bg-white rounded-3xl border ${
                branch.isHQ ? 'border-farm-primary ring-2 ring-farm-primary/20' : 'border-slate-200'
              } p-6 shadow-sm hover:shadow-xl transition flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-extrabold text-rooster-red bg-red-50 px-2.5 py-1 rounded-md">
                    {branch.county}
                  </span>
                  {branch.isHQ && (
                    <span className="text-xs font-bold text-farm-primary bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Main HQ & Mixing Plant
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  {branch.name}
                </h3>

                <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-farm-primary flex-shrink-0 mt-0.5" />
                    <span>{branch.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-farm-primary flex-shrink-0" />
                    <span>{branch.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Mon - Sat: 7:00 AM - 6:00 PM</span>
                  </p>
                </div>

                {/* Services Available */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Available at this branch:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {branch.services.map((s, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                <a
                  href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Afyachoice, I would like to order feeds for pickup/delivery at the *${branch.name}* branch.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-farm-primary hover:bg-farm-light text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}