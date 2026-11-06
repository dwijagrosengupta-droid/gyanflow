import React from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { Home, GraduationCap, TrendingUp, Download, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, t } = useApp();

  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'student-home', label: t('Home'), icon: <Home className="w-5 h-5" /> },
    { id: 'quiz', label: t('Courses'), icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'teacher-analytics', label: t('Performance'), icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'downloads', label: t('Downloads'), icon: <Download className="w-5 h-5" /> },
    { id: 'profile', label: t('Profile'), icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#c2c6d5]/30 shadow-lg px-2 py-2 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all ${
              isActive
                ? 'bg-[#b1eeed] text-[#316d6d] font-bold shadow-xs -translate-y-1'
                : 'text-[#424753] hover:text-[#0059b9]'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
