import React from 'react';
import BrandHero from '../components/BrandHero';
import TrustBar from '../components/TrustBar';
import CategoryShowcase from '../components/CategoryShowcase';
import FeaturedProducts from '../components/FeaturedProducts';
import BottomBanner from '../components/BottomBanner';
import MediaReel from '../components/MediaReel';
import { STORE_INFO } from '../data/feedsData';
import { MessageCircle } from 'lucide-react';
import AfyaLogo from '../components/AfyaLogo';

export default function HomePage({ products, onAddToCart, setCurrentPage, setSelectedCategory }) {
  const handleCategorySelect = (categoryKey) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryKey);
    }
    setCurrentPage('store');
  };

  const handleContactClick = () => {
    const el = document.getElementById('footer-contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(
        `https://wa.me/${STORE_INFO.phoneRaw}?text=Hello%20Afyachoice%20Feeds,%20I%20would%20like%20to%20learn%20more%20about%20your%20feeds.`,
        '_blank'
      );
    }
  };

  return (
    <div>
      {/* 1. Brand Hero with Two-Tone Heading, Farm Animals, Feed Bags & Curved Orange Swoosh */}
      <BrandHero
        onShopClick={() => setCurrentPage('store')}
        onContactClick={handleContactClick}
      />

      {/* 2. Trust Bar: 4 Column Features (Premium Quality, Higher Yields, Reliable Delivery, Expert Advice) */}
      <TrustBar />

      {/* 3. Category Showcase: 5 Animal Feed Cards + Our Commitment Box */}
      <CategoryShowcase
        onCategorySelect={handleCategorySelect}
        onContactClick={handleContactClick}
      />

      {/* 4. Bottom Slogan Bar: Partnering with Farmers for a Food Secure Kenya */}
      <BottomBanner />

      {/* 5. Featured Products Catalog */}
      <FeaturedProducts
        products={products}
        onAddToCart={onAddToCart}
      />

      {/* 6. Media & Clips Reel */}
      <MediaReel />

      {/* 7. Nuscience Concentrates Spotlight Banner */}
      <section className="bg-gradient-to-r from-[#0b542c] via-[#084223] to-[#063a1e] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-[#e86014] text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-sm">
              Exclusive Nutrition Technology
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight">
              Maximize Feed Conversion With Nuscience Concentrates
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Cut feed formulation costs while maximizing daily live weight gain in broilers and egg numbers in commercial layers. Available in 5%, 20%, and 30% packaging.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-white/10 p-1.5 rounded-2xl backdrop-blur-sm border border-white/20 hidden xl:block">
              <AfyaLogo variant="navbar" size="sm" />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentPage('store')}
                className="bg-white text-[#0b542c] hover:bg-emerald-50 font-bold px-6 py-3 rounded-xl shadow-lg transition"
              >
                View Concentrates
              </button>
              <a
                href={`https://wa.me/${STORE_INFO.phoneRaw}?text=Hello,%20I%20am%20interested%20in%20Nuscience%20Concentrates.`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#e86014] hover:bg-[#cf500d] text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to Nutritionist</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Farmer Testimonials */}
      <section className="py-16 bg-[#f7fbf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#0b542c]">
              Real Farm Results
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">
              What Kenyan Farmers Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "We switched to Afyachoice Dairy Meal (High Yield Formula) on our Eldoret farm. Within two weeks, average milk yield jumped from 18 litres to 22.5 litres per cow!"
              </p>
              <div className="pt-2 border-t border-emerald-100">
                <p className="font-bold text-xs text-slate-900">Naomi warui </p>
                <p className="text-[11px] text-slate-500">Commercial Dairy Farmer, Eldoret</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "Their Layer 1 mash and 20% concentrate are unmatched. Our flock in Nakuru maintained a 93% lay rate through cold season without brittle egg shells."
              </p>
              <div className="pt-2 border-t border-emerald-100">
                <p className="font-bold text-xs text-slate-900">Gladys Wambui</p>
                <p className="text-[11px] text-slate-500">Poultry Producer, Nakuru</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "We mix pig starter and grower mash using their specialized premixes. Weight gain at 4 months is significantly better than conventional feeds."
              </p>
              <div className="pt-2 border-t border-emerald-100">
                <p className="font-bold text-xs text-slate-900">Peter Mutua</p>
                <p className="text-[11px] text-slate-500">Pig Producer, Matasia / Kajiado</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
