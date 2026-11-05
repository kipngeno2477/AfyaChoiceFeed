import React from 'react';
import { Sparkles, MessageCircle, Settings, Layers, HelpCircle } from 'lucide-react';
import { STORE_INFO } from '../data/feedsData';

export default function ServicesPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-farm-primary bg-emerald-100 px-3 py-1 rounded-full">
            Store Capabilities
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            Services & Feed Mixing
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Beyond pre-bagged feeds, Afyachoice provides custom milling, bulk concentrates, and raw materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-primary flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Custom Feed Mixing Services</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Have your own maize, soya, or wheat pollard? Bring your raw ingredients to our Marurui plant. We grind, incorporate micro-premixes, and homogenize your custom feed batch to your exact formula.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2">
              <li>• Automated computerized batching</li>
              <li>• Inclusion of Nuscience Concentrates & toxin binders</li>
              <li>• Rapid turnaround for commercial poultry and dairy farms</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-primary flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Raw Materials Sourcing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We supply wholesale raw materials at factory prices to farmers who prefer self-mixing:
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2">
              <li>• Maize Germ & Maize Bran</li>
              <li>• Wheat Pollard & Wheat Bran</li>
              <li>• Soya Bean Meal & Sunflower Cake</li>
              <li>• Feed Lime, Bone Meal & Dicalcium Phosphate (DCP)</li>
            </ul>
          </div>

        </div>

        {/* WhatsApp Consultation Card */}
        <div className="mt-12 bg-farm-primary text-white p-8 rounded-3xl text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-black">Need a Custom Ration Formulated?</h3>
          <p className="text-xs text-emerald-100 max-w-lg mx-auto">
            Speak directly with our technical nutrition team on WhatsApp to formulate a high-yield ration for your herd or flock.
          </p>
          <a
            href={`https://wa.me/${STORE_INFO.phoneRaw}?text=Hello%20Afyachoice,%20I%20need%20custom%20feed%20mixing%20services.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-farm-primary font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-50 transition"
          >
            <MessageCircle className="w-5 h-5 text-farm-primary" />
            <span>Consult Our Nutritionist</span>
          </a>
        </div>

      </div>
    </div>
  );
}