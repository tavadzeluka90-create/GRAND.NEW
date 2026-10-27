import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, User, MapPin, Phone, Heart, UserPlus, LogIn, Upload, Camera, Check, Image as ImageIcon } from 'lucide-react';
import { Gender, RelationshipGoal, FamilyStatus } from '../types';
import { CITIES } from '../data/mockData';
import { APP_IMAGES } from '../data/assets';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    loginWithEmail,
    registerUser,
  } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [age, setAge] = useState<number>(62);
  const [gender, setGender] = useState<Gender>('ქალი');
  const [city, setCity] = useState('თბილისი');
  const [goal, setGoal] = useState<RelationshipGoal>('ქორწინება');
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus>('ქვრივი');
  const [bio, setBio] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('avatar-elene');
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const isRegister = authModalMode === 'register';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('ფაილის ზომა არ უნდა აღემატებოდეს 5MB-ს.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim()) {
      setErrorMessage('გთხოვთ მიუთითოთ სახელი.');
      return;
    }
    if (!phoneOrEmail.trim()) {
      setErrorMessage('გთხოვთ მიუთითოთ ტელეფონის ნომერი ან ელ-ფოსტა.');
      return;
    }

    const isPhone = !phoneOrEmail.includes('@');
    const chosenAvatar = customPhoto || APP_IMAGES.portraitKetevan;

    const res = registerUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: isPhone ? phoneOrEmail.trim() : undefined,
      email: isPhone ? `${phoneOrEmail.trim().replace(/[^0-9]/g, '')}@goldage.ge` : phoneOrEmail.trim(),
      age,
      gender,
      city,
      relationshipGoal: goal === 'ყველა' ? 'ქორწინება' : goal,
      familyStatus,
      bio: bio.trim() || 'ვეძებ ცხოვრების ერთგულ და თბილ თანამგზავრს.',
      photo: chosenAvatar,
    });

    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('გთხოვთ მიუთითოთ ტელეფონის ნომერი ან ელ-ფოსტა.');
      return;
    }

    const res = loginWithEmail(identifier, password);
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFF8EF] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#D6AE65]/50 relative flex flex-col max-h-[92vh] my-auto animate-in zoom-in-95 duration-200"
      >
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#45352F] shadow-sm transition-colors cursor-pointer border border-[#EADBCE]"
          aria-label="დახურვა"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D6AE65] to-[#B58F42] flex items-center justify-center text-white mx-auto mb-3 shadow-md">
              <span className="font-serif text-2xl font-bold">G</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#3B2B23]">
              {isRegister ? 'რეგისტრაცია' : 'ანგარიშში შესვლა'}
            </h2>
            <p className="text-xs text-[#7A6258] mt-1">
              {isRegister
                ? 'შეავსეთ ფორმა თქვენი პირადი პროფილის შესაქმნელად'
                : 'შეიყვანეთ თქვენი ტელეფონი ან ელ-ფოსტა თქვენს პროფილში შესასვლელად'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#FAF3E8] p-1 rounded-2xl border border-[#EADBCE] mb-6">
            <button
              onClick={() => {
                openAuthModal('register');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isRegister
                  ? 'bg-[#D6AE65] text-white shadow-xs'
                  : 'text-[#7A6258] hover:text-[#45352F]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>რეგისტრაცია</span>
            </button>
            <button
              onClick={() => {
                openAuthModal('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                !isRegister
                  ? 'bg-white text-[#45352F] shadow-xs'
                  : 'text-[#7A6258] hover:text-[#45352F]'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>შესვლა</span>
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* REGISTRATION FORM */}
          {isRegister ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">

              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">თქვენი სახელი *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="მაგ: მარიამი"
                      className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">გვარი</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="მაგ: ბერიძე"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              {/* Contact: Phone or Email */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">
                  ტელეფონის ნომერი ან ელ-ფოსტა *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="მაგ: 599 12 34 56 ან mariam@mail.ge"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">პაროლი</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">ასაკი (წელი)</label>
                  <select
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  >
                    {Array.from({ length: 36 }, (_, i) => 50 + i).map((a) => (
                      <option key={a} value={a}>{a} წლის</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">სქესი</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  >
                    <option value="ქალი">ქალი</option>
                    <option value="მამაკაცი">მამაკაცი</option>
                  </select>
                </div>
              </div>

              {/* City and Family status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">ქალაქი</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-[#EADBCE] rounded-xl pl-8 pr-2 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                    >
                      {CITIES.filter((c) => c !== 'ყველა').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">სტატუსი</label>
                  <select
                    value={familyStatus}
                    onChange={(e) => setFamilyStatus(e.target.value as FamilyStatus)}
                    className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  >
                    <option value="ქვრივი">ქვრივი</option>
                    <option value="განქორწინებული">განქორწინებული</option>
                    <option value="დასაოჯახებელი">დასაოჯახებელი</option>
                  </select>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">ურთიერთობის მიზანი</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as RelationshipGoal)}
                  className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  <option value="ქორწინება">ქორწინება და თანაცხოვრება</option>
                  <option value="სერიოზული ურთიერთობა">სერიოზული ურთიერთობა</option>
                  <option value="მეგობრობა">მეგობრობა და საუბარი</option>
                </select>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">მოკლედ თქვენ შესახებ</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="რამდენიმე სიტყვა თქვენს პროფესიაზე ან ხასიათზე..."
                  className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
              </div>

              {/* Profile Photo / Upload File */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#7A6258]">
                  პროფილის ფოტო
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* File upload action card */}
                {customPhoto ? (
                  <div className="p-3 rounded-2xl bg-[#FAF0E1] border-2 border-[#D6AE65] flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={customPhoto}
                        alt="თქვენი ფოტო"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#3B2B23] block">თქვენი ფოტო ატვირთულია</span>
                        <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> არჩეულია პროფილისთვის
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F3E7D3] text-[#8C6D2B] text-xs font-bold border border-[#D6AE65] transition-all cursor-pointer shadow-xs"
                    >
                      შეცვლა
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 px-4 rounded-2xl bg-[#FAF3E8] hover:bg-[#F3E7D3] border-2 border-dashed border-[#D6AE65] flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FAF0E1] group-hover:bg-white flex items-center justify-center text-[#B58F42] shadow-xs">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#45352F] block">ატვირთეთ თქვენი პროფილის ფოტო</span>
                      <span className="text-[11px] text-[#8C766B]">დააჭირეთ აქ ფაილის ასარჩევად (JPG, PNG)</span>
                    </div>
                  </button>
                )}

                {/* Quick Avatar Presets from authentic portraits */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-[#8C766B] block mb-1.5">
                    ან აირჩიეთ ნიმუში ფოტო:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1.5">
                    {[
                      { id: 'ket', img: APP_IMAGES.portraitKetevan, name: 'ქეთევან' },
                      { id: 'mar', img: APP_IMAGES.portraitMarina, name: 'მარინა' },
                      { id: 'tam', img: APP_IMAGES.portraitTamar, name: 'თამარ' },
                      { id: 'nat', img: APP_IMAGES.portraitNatela, name: 'ნათელა' },
                      { id: 'ia', img: APP_IMAGES.portraitIa, name: 'ია' },
                      { id: 'ele', img: APP_IMAGES.portraitElene, name: 'ელენე' },
                      { id: 'ket2', img: APP_IMAGES.portraitKeti, name: 'ქეთი' },
                      { id: 'nin', img: APP_IMAGES.portraitNino, name: 'ნინო' },
                      { id: 'nan', img: APP_IMAGES.portraitNana, name: 'ნანა' },
                      { id: 'lal', img: APP_IMAGES.portraitLali, name: 'ლალი' },
                      { id: 'ete', img: APP_IMAGES.portraitEter, name: 'ეთერ' },
                      { id: 'man', img: APP_IMAGES.portraitManana, name: 'მანანა' },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setCustomPhoto(item.img)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          customPhoto === item.img
                            ? 'border-[#B58F42] ring-2 ring-[#B58F42]/40 scale-105'
                            : 'border-transparent opacity-80 hover:opacity-100 hover:border-[#DFCFBE]'
                        }`}
                        title={item.name}
                      >
                        <img src={item.img} alt={item.name} className="w-11 h-11 object-cover" />
                        {customPhoto === item.img && (
                          <div className="absolute inset-0 bg-[#B58F42]/30 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] hover:from-[#c89f54] hover:to-[#a37d32] text-white font-bold text-sm shadow-md transition-all mt-3 flex items-center justify-center gap-2 cursor-pointer hover:scale-101"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>რეგისტრაციის დასრულება</span>
              </button>
            </form>
          ) : (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">ტელეფონი ან ელ-ფოსტა *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="შეიყვანეთ ტელეფონი ან ელ-ფოსტა"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">პაროლი</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] hover:from-[#c89f54] hover:to-[#a37d32] text-white font-bold text-sm shadow-md transition-all mt-2 cursor-pointer"
              >
                შესვლა
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="text-xs text-[#8C6D2B] hover:underline font-semibold cursor-pointer"
                >
                  არ გაქვთ პროფილი? დარეგისტრირდით აქ
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
