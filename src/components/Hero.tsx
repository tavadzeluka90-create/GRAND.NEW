import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../data/assets';
import { CITIES } from '../data/mockData';
import { Search, ShieldCheck, Heart, Users, Sparkles, Compass } from 'lucide-react';
import { Gender } from '../types';

interface HeroProps {
  onSearchFilterChange?: (filters: { gender: Gender | 'ყველა'; city: string; minAge: number; maxAge: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchFilterChange }) => {
  const { setActiveTab, openAuthModal } = useApp();

  const [gender, setGender] = useState<Gender | 'ყველა'>('ყველა');
  const [city, setCity] = useState<string>('ყველა');
  const [minAge, setMinAge] = useState<number>(50);
  const [maxAge, setMaxAge] = useState<number>(75);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchFilterChange) {
      onSearchFilterChange({ gender, city, minAge, maxAge });
    }
    setActiveTab('members');
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-14 lg:pt-10 lg:pb-16 bg-[#FFF8EF]">
      {/* Subtle warm decorative aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#D6AE65]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#E8B7B7]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Action Buttons matching reference screenshot */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E1] border border-[#EADBCE] text-[#8C6D2B] text-xs sm:text-sm font-semibold shadow-xs">
              <span className="text-orange-500 text-sm">🧡</span>
              <span>საქართველოს #1 გაცნობის სივრცე უფროსი თაობისთვის</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#332219] tracking-tight leading-[1.18]">
              „სიყვარულისთვის<br />
              არასდროს არის გვიან<br />
              <span className="inline-flex items-center gap-2">❤️ “</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#67544C] max-w-xl leading-relaxed">
              იპოვე ადამიანი, რომელთანაც შეძლებ ცხოვრების ლამაზი მომენტების გაზიარებას. დაიწყე ახალი ისტორია დღესვე!
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  const searchEl = document.getElementById('quick-search-box');
                  if (searchEl) {
                    searchEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveTab('members');
                  }
                }}
                className="px-6 py-3.5 rounded-xl bg-[#CCA258] hover:bg-[#ba9041] text-white font-bold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
              >
                <Search className="w-4 h-4" />
                <span>იპოვე პარტნიორი</span>
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('register')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF3E8] text-[#3B2B23] font-bold text-sm sm:text-base border border-[#DFCFBE] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-[#CCA258] hover:scale-102"
              >
                <Sparkles className="w-4 h-4 text-[#D6AE65]" />
                <span>შექმენი პროფილი</span>
              </button>
            </div>

            {/* Trust highlights under buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs sm:text-sm text-[#7A6258] font-medium">
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-2">
                  <img src={APP_IMAGES.portraitKetevan} alt="ქეთევან" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
                  <img src={APP_IMAGES.portraitMarina} alt="მარინა" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
                  <img src={APP_IMAGES.portraitTamar} alt="თამარ" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
                  <img src={APP_IMAGES.portraitNatela} alt="ნათელა" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
                  <img src={APP_IMAGES.portraitElene} alt="ელენე" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
                </div>
                <span>შემოწმებული წევრები</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B58F42]" />
                <span>100% უსაფრთხო გარემო</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                <span>ნამდვილი ქორწინებები</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with Quote & Goal card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white shadow-[#45352F]/10 group">
                <img
                  src={APP_IMAGES.heroCouple}
                  alt="GoldAge ბედნიერი წყვილი"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                {/* Bottom quote overlay on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-sm sm:text-base leading-snug">
                    „საუკეთესო წლები ჯერ კიდევ წინ არის“
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/80 mt-0.5">
                    GoldAge — ადგილი, სადაც მარტოობა სითბოთი იცვლება
                  </p>
                </div>
              </div>

              {/* Card directly below photo */}
              <div className="mt-4 bg-white/95 rounded-2xl p-4 border border-[#EADBCE] shadow-sm flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#3B2B23]">სერიოზული მიზნები</h4>
                  <p className="text-xs text-[#7A6258]">მეგობრობა, თანადგომა და ქორწინება</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Search Section matching reference screenshot */}
        <div id="quick-search-box" className="mt-10 sm:mt-12 bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-[#EADBCE]">
          <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-bold text-[#3B2B23]">
            <div className="w-5 h-5 rounded-full border border-[#D6AE65] flex items-center justify-center text-[#B58F42]">
              <Compass className="w-3.5 h-3.5 text-[#B58F42]" />
            </div>
            <span className="text-sm font-bold">სწრაფი პარტნიორის ძიება</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-[#7A6258] mb-1.5">ვეძებ</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender | 'ყველა')}
                className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
              >
                <option value="ყველა">ქალსა და მამაკაცს</option>
                <option value="ქალი">ქალბატონს</option>
                <option value="მამაკაცი">მამაკაცს</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#7A6258] mb-1.5">ასაკობრივი ჯგუფი</label>
              <select
                value={`${minAge}-${maxAge}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  setMinAge(min);
                  setMaxAge(max);
                }}
                className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
              >
                <option value="50-75">50 – 75 წელი</option>
                <option value="50-60">50 – 60 წელი</option>
                <option value="60-70">60 – 70 წელი</option>
                <option value="70-85">70+ წელი</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#7A6258] mb-1.5">ქალაქი</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c === 'ყველა' ? 'ყველა ქალაქი' : c}</option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-6 rounded-xl bg-[#CCA258] hover:bg-[#ba9041] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
              >
                <Search className="w-4 h-4" />
                <span>შედეგების ნახვა</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
