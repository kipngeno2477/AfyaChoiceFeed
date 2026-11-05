import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/feedsData';
import AfyaLogo from '../components/AfyaLogo';

export default function AboutPage() {
  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="mb-3">
              <AfyaLogo variant="navbar" size="lg" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-farm-primary bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              About Afyachoice Feeds
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Empowering Kenyan Farmers With Science-Backed Nutrition
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Afyachoice Feeds is an agribusiness initiative under <b>Afyachicks Kenya Limited</b>, headquartered along Mirema Road, Marurui off Northern Bypass in Nairobi.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In partnership with international nutrition pioneer <b>Nuscience</b>, we provide scientifically balanced concentrates, complete feeds, and raw materials engineered to maximize animal productivity and farmer profitability.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-farm-surface border border-emerald-200">
                <p className="text-2xl font-black text-farm-primary">10,000+</p>
                <p className="text-xs text-slate-600">Bags Distributed Monthly</p>
              </div>
              <div className="p-4 rounded-xl bg-farm-surface border border-emerald-200">
                <p className="text-2xl font-black text-farm-primary">5 Hubs</p>
                <p className="text-xs text-slate-600">Across Central & Rift Valley</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80"
                alt="Afyachoice Feeds Store Warehouse"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-farm-dark text-white p-5 rounded-2xl shadow-xl max-w-xs border border-green-800 hidden sm:block">
              <p className="text-xs uppercase font-bold text-amber-400">Our Motto</p>
              <p className="text-sm font-black mt-1">"Better Feeds. Better Yield."</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-farm-surface rounded-3xl p-8 sm:p-12 border border-emerald-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why Farmers Choose Afyachoice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-farm-primary flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900">High Bypass Protein</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Dairy Meal utilizes rumen-protected amino acids to directly boost milk synthesis and butterfat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-farm-primary flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900">Zero Toxin Tolerance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All raw materials and grains undergo strict mycotoxin screening to protect flock and herd health.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-farm-primary flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900">On-Farm Advisory</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our animal nutritionists offer formulation support to optimize your on-farm feed mixing.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}