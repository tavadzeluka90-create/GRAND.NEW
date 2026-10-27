import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { User, MapPin, Heart, CheckCircle2, Save, LogOut, Phone, Mail, Camera, UserPlus, LogIn, Sparkles, Upload, Check } from 'lucide-react';
import { CITIES } from '../data/mockData';
import { RelationshipGoal, FamilyStatus } from '../types';
import { APP_IMAGES } from '../data/assets';

export const ProfileView: React.FC = () => {
  const { currentUser, updateProfile, openAuthModal, logout, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [age, setAge] = useState<number>(currentUser?.age || 60);
  const [city, setCity] = useState(currentUser?.city || 'თბილისი');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [goal, setGoal] = useState<RelationshipGoal>(currentUser?.relationshipGoal || 'ქორწინება');
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus>(currentUser?.familyStatus || 'ქვრივი');
  const [lifestyle, setLifestyle] = useState(currentUser?.lifestyle || '');
  const [preferredAgeMin, setPreferredAgeMin] = useState(currentUser?.preferredAgeMin || 55);
  const [preferredAgeMax, setPreferredAgeMax] = useState(currentUser?.preferredAgeMax || 75);
  const [photo, setPhoto] = useState(currentUser?.photo || APP_IMAGES.portraitElene);
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState<string[]>(currentUser?.interests || ['კითხვა', 'ბუნება']);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Sync state if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setPhone(currentUser.phone || '');
      setEmail(currentUser.email);
      setAge(currentUser.age);
      setCity(currentUser.city);
      setBio(currentUser.bio);
      setGoal(currentUser.relationshipGoal);
      setFamilyStatus(currentUser.familyStatus);
      setLifestyle(currentUser.lifestyle);
      setPreferredAgeMin(currentUser.preferredAgeMin);
      setPreferredAgeMax(currentUser.preferredAgeMax);
      setPhoto(currentUser.photo);
      setInterests(currentUser.interests || ['კითხვა', 'ბუნება']);
    }
  }, [currentUser]);

  const avatarOptions = [
    { id: 'avatar-elene', label: 'ელენე (52)', url: APP_IMAGES.portraitElene },
    { id: 'avatar-levan', label: 'ლევანი (55)', url: APP_IMAGES.portraitLevan },
    { id: 'avatar-keti', label: 'ქეთი (50)', url: APP_IMAGES.portraitKeti },
    { id: 'avatar-irakli', label: 'ირაკლი (58)', url: APP_IMAGES.portraitIrakli },
    { id: 'avatar-nino', label: 'ნინო (56)', url: APP_IMAGES.portraitNino },
    { id: 'avatar-1', label: 'თამარი', url: APP_IMAGES.portraitTamar },
    { id: 'avatar-2', label: 'გიორგი', url: APP_IMAGES.portraitGiorgi },
    { id: 'avatar-3', label: 'ნათელა', url: APP_IMAGES.portraitNatela },
    { id: 'avatar-4', label: 'რეზო', url: APP_IMAGES.portraitRezo },
    { id: 'avatar-5', label: 'ია', url: APP_IMAGES.portraitIa },
    { id: 'avatar-6', label: 'ნანა', url: APP_IMAGES.portraitNana },
    { id: 'avatar-7', label: 'დავითი', url: APP_IMAGES.portraitDavit },
  ];

  if (!currentUser) {
    return (
      <div className="py-16 bg-[#FFF8EF] min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#EADBCE] max-w-md w-full shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#FAF3E8] text-[#D6AE65] flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#3B2B23] mb-2">
            ჩემი პროფილი
          </h2>
          <p className="text-sm text-[#7A6258] mb-6 leading-relaxed">
            თქვენი პირადი პროფილის სანახავად და სამართავად გთხოვთ გაიაროთ რეგისტრაცია ან შედით თქვენს ანგარიშში.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('register')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] text-white font-bold text-sm shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>ახალი პროფილის რეგისტრაცია</span>
            </button>
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3.5 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE] text-[#45352F] font-bold text-sm hover:bg-[#FAF3E8] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>ანგარიშში შესვლა</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      phone,
      email,
      age,
      city,
      bio,
      relationshipGoal: goal === 'ყველა' ? 'ქორწინება' : goal,
      familyStatus,
      lifestyle,
      preferredAgeMin,
      preferredAgeMax,
      photo,
      gallery: [photo],
      interests,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('ფაილის ზომა არ უნდა აღემატებოდეს 5MB-ს.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const uploadedUrl = reader.result;
          setPhoto(uploadedUrl);
          updateProfile({
            photo: uploadedUrl,
            gallery: [uploadedUrl],
          });
          showToast('პროფილის ფოტო წარმატებით განახლდა!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  return (
    <div className="py-10 bg-[#FFF8EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-md mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <img
                src={photo}
                alt={currentUser.firstName}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#FAF3E8] shadow-md"
              />
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="absolute bottom-0 right-0 bg-[#D6AE65] hover:bg-[#B58F42] text-white p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110"
                title="ფოტოს შეცვლა"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2B23]">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E1] text-[#8C6D2B] text-xs font-bold border border-[#EADBCE]">
                  ჩემი პროფილი
                </span>
                {currentUser.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ვერიფიცირებული
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#7A6258] mt-1.5">
                {currentUser.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#B58F42]" />
                    {currentUser.phone}
                  </span>
                )}
                {currentUser.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#B58F42]" />
                    {currentUser.email}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#5C4940] mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B58F42]" />
                  {currentUser.city}, {currentUser.country} ({currentUser.age} წლის)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  {currentUser.relationshipGoal}
                </span>
                <span>•</span>
                <span className="text-[#8C6D2B] font-medium">
                  {currentUser.familyStatus}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>გასვლა</span>
            </button>
          </div>

          {/* Hidden file input for custom photo upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Avatar / Photo selector modal/box if toggled */}
          {showAvatarPicker && (
            <div className="mt-6 pt-5 border-t border-[#F5ECE0] animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-xs font-bold text-[#45352F]">პროფილის ფოტოს განახლება:</p>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(false)}
                  className="text-xs text-[#8C766B] hover:text-[#45352F] px-2 py-1"
                >
                  დახურვა ✕
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#FAF3E8] border border-[#EADBCE]">
                <img
                  src={photo}
                  alt={currentUser.firstName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-bold text-[#3B2B23]">ატვირთეთ თქვენი რეალური ფოტო</p>
                  <p className="text-[11px] text-[#7A6258] mt-0.5">აირჩიეთ ფაილი თქვენი მოწყობილობიდან (JPG, PNG)</p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] text-white text-xs font-bold shadow-md hover:from-[#c89f54] hover:to-[#a37d32] transition-all cursor-pointer hover:scale-102"
                >
                  <Upload className="w-4 h-4" />
                  <span>ფოტოს ატვირთვა ფაილიდან</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Edit Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-md">
          <div className="mb-6 pb-4 border-b border-[#F5ECE0]">
            <h2 className="font-serif text-xl font-bold text-[#3B2B23]">
              პროფილის რედაქტირება
            </h2>
            <p className="text-xs text-[#7A6258] mt-1">
              შეცვალეთ თქვენი მონაცემები და შეინახეთ ცვლილებები
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">სახელი *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">გვარი</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
              </div>
            </div>

            {/* Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ტელეფონის ნომერი</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="მაგ: 599 12 34 56"
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ელ-ფოსტა</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@mail.ge"
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
              </div>
            </div>

            {/* Age, City, Family Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ასაკი (წელი)</label>
                <select
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  {Array.from({ length: 36 }, (_, i) => 50 + i).map((a) => (
                    <option key={a} value={a}>{a} წლის</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ქალაქი</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  {CITIES.filter((c) => c !== 'ყველა').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ოჯახური მდგომარეობა</label>
                <select
                  value={familyStatus}
                  onChange={(e) => setFamilyStatus(e.target.value as FamilyStatus)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  <option value="ქვრივი">ქვრივი</option>
                  <option value="განქორწინებული">განქორწინებული</option>
                  <option value="დასაოჯახებელი">დასაოჯახებელი</option>
                </select>
              </div>
            </div>

            {/* Avatar Selection in Edit Form */}
            <div>
              <label className="block text-xs font-bold text-[#7A6258] mb-1.5">პროფილის ფოტო</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {avatarOptions.map((av) => (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => setPhoto(av.url)}
                    className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      photo === av.url
                        ? 'border-[#D6AE65] ring-2 ring-[#D6AE65]/50 scale-105'
                        : 'border-transparent opacity-80 hover:opacity-100 hover:scale-102'
                    }`}
                  >
                    <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ჩემ შესახებ (ავტობიოგრაფია)</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="მოგვიყევით თქვენს პროფესიაზე, ინტერესებსა და იმ თვისებებზე, რასაც პარტნიორში აფასებთ..."
                className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl p-3 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
              />
            </div>

            {/* Interests Tagging */}
            <div>
              <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ინტერესები და გატაცებები</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="ახალი ჰობი (მაგ: თეატრი, მებაღეობა, ჭადრაკი)..."
                  className="flex-1 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className="py-2 px-4 rounded-xl bg-[#FAF0E1] border border-[#EADBCE] text-xs font-bold text-[#45352F] hover:bg-[#F5ECE0] cursor-pointer"
                >
                  დამატება
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF3E8] border border-[#EADBCE] text-xs font-medium text-[#45352F]"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeInterest(item)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Goal and Age Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ურთიერთობის მიზანი</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as RelationshipGoal)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  <option value="ქორწინება">ქორწინება და თანაცხოვრება</option>
                  <option value="სერიოზული ურთიერთობა">სერიოზული ურთიერთობა</option>
                  <option value="მეგობრობა">მეგობრობა და საუბარი</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">სასურველი ასაკობრივი დიაპაზონი</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={preferredAgeMin}
                    onChange={(e) => setPreferredAgeMin(Number(e.target.value))}
                    className="w-1/2 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F]"
                    min={50}
                    max={90}
                  />
                  <span className="text-xs text-[#8C766B]">-დან</span>
                  <input
                    type="number"
                    value={preferredAgeMax}
                    onChange={(e) => setPreferredAgeMax(Number(e.target.value))}
                    className="w-1/2 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F]"
                    min={50}
                    max={90}
                  />
                  <span className="text-xs text-[#8C766B]">-მდე</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ყოველდღიური ცხოვრების სტილი</label>
              <input
                type="text"
                value={lifestyle}
                onChange={(e) => setLifestyle(e.target.value)}
                placeholder="მაგ: დილის სეირნობა, მებაღეობა, საღამოს კითხვა..."
                className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
              />
            </div>

            <div className="pt-4 border-t border-[#F5ECE0] flex justify-end">
              <button
                type="submit"
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] hover:from-[#c89f54] hover:to-[#a37d32] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
              >
                <Save className="w-4 h-4" />
                <span>მონაცემების შენახვა</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
