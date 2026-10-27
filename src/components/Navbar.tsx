import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MessageSquare, Shield, BookOpen, Users, Home, Menu, X, LogIn, UserPlus, LogOut, User, CheckCircle2 } from 'lucide-react';
import { ActiveTab, FontSizeScale } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    favorites,
    messages,
    activeTab,
    setActiveTab,
    fontSizeScale,
    setFontSizeScale,
    openAuthModal,
    logout,
    setSafetyModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Unread messages count
  const unreadCount = messages.filter((m) => m.receiverId === 'me' && !m.isRead).length;

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'მთავარი', icon: <Home className="w-4 h-4" /> },
    { id: 'members', label: 'წევრები', icon: <Users className="w-4 h-4" /> },
    { id: 'favorites', label: 'რჩეულები', icon: <Heart className="w-4 h-4" />, badge: favorites.length },
    { id: 'messages', label: 'შეტყობინებები', icon: <MessageSquare className="w-4 h-4" />, badge: unreadCount > 0 ? unreadCount : undefined },
    { id: 'profile', label: 'ჩემი პროფილი', icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8EF]/95 backdrop-blur-md border-b border-[#EADBCE] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Logo & Brand matching screenshot */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#D6AE65] to-[#B58F42] flex items-center justify-center text-white shadow-md shadow-[#D6AE65]/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#3B2B23] tracking-wide">GoldAge</span>
                <span className="text-[11px] text-[#B58F42] font-semibold">ოქროს ასაკი</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#7A6258] font-medium hidden sm:block">
                სიყვარული და ქორწინება უფროსი თაობისთვის
              </p>
            </div>
          </div>

          {/* Desktop Nav Items matching screenshot */}
          <nav className="hidden lg:flex items-center gap-1.5 shrink-0">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#3B2B23] shadow-xs font-bold border border-[#EADBCE]'
                      : 'text-[#67544C] hover:text-[#3B2B23] hover:bg-[#F5ECE0]'
                  }`}
                >
                  <span className={isActive ? 'text-[#B58F42]' : 'text-[#8C766B]'}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#FAF0E1] text-[#B58F42] border border-[#D6AE65]/40 font-bold text-[11px] leading-tight">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Font Resizer & Auth matching screenshot */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Font Size Accessibility Control matching screenshot */}
            <button
              onClick={() => {
                if (fontSizeScale === 'normal') setFontSizeScale('large');
                else if (fontSizeScale === 'large') setFontSizeScale('extra-large');
                else setFontSizeScale('normal');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#DFCFBE] text-xs font-semibold text-[#45352F] hover:bg-[#FAF3E8] transition-colors cursor-pointer shadow-xs"
              title="შრიფტის ზომის შეცვლა უფროსი თაობისთვის"
            >
              <span className="font-bold text-[#B58F42] text-sm leading-none">A</span>
              <span>შრიფტი</span>
              {fontSizeScale !== 'normal' && (
                <span className="text-[10px] text-[#B58F42] font-bold">
                  {fontSizeScale === 'large' ? '+1' : '+2'}
                </span>
              )}
            </button>

            {/* Auth Buttons / Profile Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl border border-[#EADBCE] bg-[#FAF3E8] hover:bg-[#F5ECE0] transition-all cursor-pointer"
                >
                  <img
                    src={currentUser.photo}
                    alt={currentUser.firstName}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#D6AE65]"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-xs font-bold text-[#45352F] leading-tight">
                      {currentUser.firstName}
                    </div>
                    <span className="text-[10px] text-[#7A6258] block">ჩემი პროფილი</span>
                  </div>
                </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EADBCE] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-[#F5ECE0]">
                        <p className="text-xs text-[#8C766B]">შესული ხართ როგორც:</p>
                        <p className="text-sm font-bold text-[#45352F] truncate">
                          {currentUser.firstName} {currentUser.lastName}
                        </p>
                        <p className="text-[11px] text-[#8C766B] truncate">{currentUser.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          openAuthModal('register');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm font-bold text-[#B58F42] hover:bg-[#FFF8EF] flex items-center gap-2 cursor-pointer"
                      >
                        <UserPlus className="w-4 h-4 text-[#B58F42]" />
                        რეგისტრაციის ფანჯარა
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-[#45352F] hover:bg-[#FFF8EF] flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-[#B58F42]" />
                        პროფილის რედაქტირება
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('messages');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-[#45352F] hover:bg-[#FFF8EF] flex items-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 text-[#B58F42]" />
                        შეტყობინებები
                      </button>

                      <div className="border-t border-[#F5ECE0] my-1"></div>

                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        გასვლა
                      </button>
                    </div>
                  )}
                </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Standalone Sign In button */}
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-white border border-[#DFCFBE] text-[#45352F] text-xs sm:text-sm font-semibold hover:bg-[#FAF3E8] shadow-xs transition-all cursor-pointer"
                  title="ანგარიშში შესვლა"
                >
                  შესვლა
                </button>

                {/* Standalone Register button */}
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-[#CCA258] hover:bg-[#ba9041] text-white text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-102 cursor-pointer"
                  title="რეგისტრაცია"
                >
                  რეგისტრაცია
                </button>
              </div>
            )}

            {/* Mobile / Tablet menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#45352F] hover:bg-[#F5ECE0] cursor-pointer"
              aria-label="მენიუ"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFF8EF] border-b border-[#EADBCE] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-4 duration-150">
          
          {/* Prominent Auth CTA in Mobile Menu */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#EADBCE]">
            <button
              onClick={() => {
                openAuthModal('register');
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>რეგისტრაცია</span>
            </button>
            <button
              onClick={() => {
                openAuthModal('login');
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-xl bg-white border border-[#DFCFBE] text-[#45352F] font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#B58F42]" />
              <span>შესვლა</span>
            </button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-[#EADBCE] text-[#45352F] font-bold'
                  : 'text-[#67544C] hover:bg-[#F5ECE0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#B58F42]">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-[#D6AE65] text-white font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <button
            onClick={() => {
              setSafetyModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-[#67544C] hover:bg-[#F5ECE0]"
          >
            <Shield className="w-5 h-5 text-[#B58F42]" />
            <span>უსაფრთხოების წესები</span>
          </button>

          {/* Font scale buttons for mobile */}
          <div className="pt-3 border-t border-[#EADBCE] flex items-center justify-between px-2">
            <span className="text-xs text-[#7A6258] font-semibold">შრიფტის ზომა:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSizeScale('normal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${fontSizeScale === 'normal' ? 'bg-[#D6AE65] text-white border-[#D6AE65]' : 'bg-white border-[#EADBCE]'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSizeScale('large')}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${fontSizeScale === 'large' ? 'bg-[#D6AE65] text-white border-[#D6AE65]' : 'bg-white border-[#EADBCE]'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeScale('extra-large')}
                className={`px-3 py-1.5 rounded-lg text-base font-bold border ${fontSizeScale === 'extra-large' ? 'bg-[#D6AE65] text-white border-[#D6AE65]' : 'bg-white border-[#EADBCE]'}`}
              >
                A++
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
