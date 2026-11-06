import React from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/mockData';
import { Globe, Wifi, WifiOff, Volume2, LogOut } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    activeLanguage,
    setActiveLanguage,
    isOffline,
    toggleOffline,
    showToast,
    logout,
    t,
  } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto pb-16">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#c2c6d5]/40 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1b1c1c]">{t('Platform Preferences')}</h2>
          <p className="text-xs text-[#727784]">Customize GyanFlow for low-bandwidth & vernacular learning</p>
        </div>

        {/* Vernacular Language */}
        <div className="p-4 bg-[#f6f3f2] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#0059b9]" />
            <div>
              <h4 className="text-sm font-bold text-[#1b1c1c]">{t('Primary Vernacular Language')}</h4>
              <p className="text-xs text-[#727784]">Questions and UI text will adapt to this language</p>
            </div>
          </div>

          <select
            value={activeLanguage}
            onChange={(e) => setActiveLanguage(e.target.value as any)}
            className="bg-white text-xs font-bold py-2 px-3 rounded-xl border border-[#c2c6d5]/40 text-[#1b1c1c]"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>

        {/* Offline Simulator */}
        <div className="p-4 bg-[#f6f3f2] rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOffline ? (
              <WifiOff className="w-5 h-5 text-[#ba1a1a]" />
            ) : (
              <Wifi className="w-5 h-5 text-[#2a6767]" />
            )}
            <div>
              <h4 className="text-sm font-bold text-[#1b1c1c]">{t('Low-Connectivity / Offline Mode')}</h4>
              <p className="text-xs text-[#727784]">Forces compressed asset cache usage & local queuing</p>
            </div>
          </div>

          <button
            onClick={toggleOffline}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              isOffline ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#b1eeed] text-[#074f4f]'
            }`}
          >
            {isOffline ? t('Offline') : t('Online')}
          </button>
        </div>

        {/* Audio TTS */}
        <div className="p-4 bg-[#f6f3f2] rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-[#0059b9]" />
            <div>
              <h4 className="text-sm font-bold text-[#1b1c1c]">{t('Text-to-Speech Read Aloud')}</h4>
              <p className="text-xs text-[#727784]">Enable bilingual audio read-outs during quizzes</p>
            </div>
          </div>

          <button
            onClick={() => showToast('TTS read-aloud voice configured!')}
            className="bg-[#0059b9] text-white px-4 py-2 rounded-xl text-xs font-bold"
          >
            {t('Enabled')}
          </button>
        </div>

        {/* Logout */}
        <div className="pt-4 mt-6 border-t border-[#c2c6d5]/40">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-[#ffdad6]/50 hover:bg-[#ffdad6] text-[#ba1a1a] px-4 py-3 rounded-xl text-sm font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
