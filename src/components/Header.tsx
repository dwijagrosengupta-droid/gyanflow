import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/mockData';
import { Globe, Gem, Coins, Wifi, WifiOff, Menu, X } from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}) => {
  const {
    student,
    activeLanguage,
    setActiveLanguage,
    isOffline,
    toggleOffline,
    setShowAvatarModal,
    currentView,
    setCurrentView,
    t,
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === activeLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbf9f8] border-b border-[#c2c6d5]/30 px-4 md:px-8 py-3 flex items-center justify-between">
      {/* Left side: Brand or View title */}
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 text-[#424753] hover:text-[#0059b9] hover:bg-[#f0eded] rounded-full transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}

        <div
          onClick={() => setCurrentView('student-home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-[#0059b9] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            GF
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#0059b9] leading-tight flex items-center gap-1.5">
              GyanFlow
            </h1>
            <p className="hidden sm:block text-[11px] text-[#424753]/80 font-medium">
              {t('Education Platform')}
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Language, Sync Status, Gems, Coins, Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sync Status Toggle */}
        <button
          onClick={toggleOffline}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isOffline
              ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30'
              : 'bg-[#b1eeed]/40 text-[#074f4f] border border-[#2a6767]/20 hover:bg-[#b1eeed]/70'
          }`}
          title={isOffline ? t('Sync Status: Offline') : t('Sync Status: Online')}
        >
          {isOffline ? (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t('Offline Sync')}</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t('Online')}</span>
            </>
          )}
        </button>

        {/* Vernacular Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eae8e7]/60 hover:bg-[#eae8e7] text-[#424753] hover:text-[#0059b9] text-xs md:text-sm font-semibold transition-colors"
          >
            <Globe className="w-4 h-4 text-[#0059b9]" />
            <span>{currentLang.code.toUpperCase()}</span>
            <span className="hidden md:inline text-xs text-[#727784]">({currentLang.nativeName})</span>
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#c2c6d5]/40 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1 text-[11px] font-bold text-[#727784] uppercase tracking-wider">
                Select Language
              </div>
              <div className="max-h-60 overflow-y-auto">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setActiveLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs md:text-sm flex items-center justify-between hover:bg-[#f6f3f2] transition-colors ${
                      activeLanguage === lang.code ? 'font-bold text-[#0059b9] bg-[#d7e2ff]/30' : 'text-[#1b1c1c]'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[11px] text-[#727784]">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coins Pill */}
        <div className="flex items-center gap-1.5 bg-[#ffddb4]/40 border border-[#ffb953]/50 text-[#7f5300] px-2.5 py-1 rounded-full text-xs md:text-sm font-bold shadow-xs">
          <Coins className="w-4 h-4 text-[#a06900] fill-[#ffb953]" />
          <span>{student.coins.toLocaleString()}</span>
        </div>

        {/* Gems Pill */}
        <div className="flex items-center gap-1.5 bg-[#d7e2ff]/40 border border-[#acc7ff]/60 text-[#0059b9] px-2.5 py-1 rounded-full text-xs md:text-sm font-bold shadow-xs">
          <Gem className="w-4 h-4 text-[#0059b9] fill-[#acc7ff]" />
          <span>{student.gems.toLocaleString()}</span>
        </div>

        {/* Avatar trigger */}
        <button
          onClick={() => setShowAvatarModal(true)}
          className="relative group focus:outline-none"
          title="Customize Avatar"
        >
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-[#2f72d6] shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="absolute -bottom-0.5 -right-0.5 bg-[#0059b9] text-white rounded-full p-0.5 shadow-xs">
            <Gem className="w-2.5 h-2.5 fill-current" />
          </div>
        </button>
      </div>
    </header>
  );
};
