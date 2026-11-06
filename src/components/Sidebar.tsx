import React from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import {
  Home,
  GraduationCap,
  TrendingUp,
  Download,
  User,
  Settings,
  PlayCircle,
  WifiOff,
  Wifi,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onItemClick }) => {
  const { currentView, setCurrentView, isOffline, toggleOffline, t } = useApp();

  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'student-home', label: t('Home'), icon: <Home className="w-5 h-5" /> },
    { id: 'course-browser', label: t('NCERT Syllabus'), icon: <BookOpen className="w-5 h-5" /> },
    { id: 'quiz', label: t('My Courses & Quizzes'), icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'teacher-analytics', label: t('Teacher Analytics'), icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'downloads', label: t('Offline Downloads'), icon: <Download className="w-5 h-5" /> },
    { id: 'profile', label: t('Profile'), icon: <User className="w-5 h-5" /> },
    { id: 'settings', label: t('Settings'), icon: <Settings className="w-5 h-5" /> },
  ];

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    if (onItemClick) onItemClick();
  };

  return (
    <aside
      className={`w-[280px] h-screen bg-[#b1eeed]/60 dark:bg-[#074f4f] border-r border-[#95d1d1]/30 flex flex-col py-6 px-4 shrink-0 transition-all ${className}`}
    >
      {/* Brand Header */}
      <div className="px-3 mb-6">
        <h2 className="text-2xl font-bold text-[#316d6d] dark:text-[#b1eeed]">GyanFlow</h2>
        <p className="text-xs text-[#316d6d]/80 font-medium mt-0.5">{t('Education Platform')}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 mt-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-white text-[#0059b9] shadow-sm scale-[0.98]'
                  : 'text-[#316d6d] dark:text-[#95d1d1] hover:bg-white/50 dark:hover:bg-black/20'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* CTA Button */}
      <div className="px-2 my-6">
        <button
          onClick={() => handleNav('quiz')}
          className="w-full bg-[#0059b9] hover:bg-[#2f72d6] text-white font-bold py-3.5 px-4 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>{t('Start Learning')}</span>
        </button>
      </div>

      {/* Sync Status Footer */}
      <div
        onClick={toggleOffline}
        className="px-3 py-3 border-t border-[#95d1d1]/40 flex items-center gap-2.5 text-xs text-[#316d6d] dark:text-[#95d1d1] font-medium cursor-pointer hover:opacity-80 transition-opacity"
      >
        {isOffline ? (
          <>
            <WifiOff className="w-4 h-4 text-[#ba1a1a]" />
            <span>{t('Sync Status: Offline')}</span>
          </>
        ) : (
          <>
            <Wifi className="w-4 h-4 text-[#2a6767]" />
            <span>{t('Sync Status: Online')}</span>
          </>
        )}
      </div>
    </aside>
  );
};
