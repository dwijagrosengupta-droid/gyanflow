import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Flame, Gem, Coins, BookOpen, MapPin, School, Edit2 } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { student, setShowAvatarModal } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-16">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#c2c6d5]/40 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group cursor-pointer" onClick={() => setShowAvatarModal(true)}>
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#0059b9] shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-0 right-0 bg-[#0059b9] text-white p-2 rounded-full shadow-sm">
              <Edit2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-bold text-[#1b1c1c]">{student.name}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#d7e2ff] text-[#0059b9]">
                {student.grade}
              </span>
            </div>

            <p className="text-xs text-[#727784] flex items-center justify-center sm:justify-start gap-1">
              <School className="w-3.5 h-3.5" />
              <span>{student.school}</span>
            </p>

            <p className="text-xs text-[#727784] flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0059b9]" />
              <span>
                {student.district}, {student.state}
              </span>
            </p>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#c2c6d5]/30">
          <div className="bg-[#f6f3f2] p-4 rounded-2xl text-center">
            <span className="text-[11px] font-bold text-[#727784]">Gems Balance</span>
            <p className="text-xl font-bold text-[#0059b9] flex items-center justify-center gap-1 mt-1">
              {student.gems.toLocaleString()} <Gem className="w-4 h-4 fill-current" />
            </p>
          </div>

          <div className="bg-[#f6f3f2] p-4 rounded-2xl text-center">
            <span className="text-[11px] font-bold text-[#727784]">Coins Earned</span>
            <p className="text-xl font-bold text-[#a06900] flex items-center justify-center gap-1 mt-1">
              {student.coins.toLocaleString()} <Coins className="w-4 h-4 fill-current" />
            </p>
          </div>

          <div className="bg-[#f6f3f2] p-4 rounded-2xl text-center">
            <span className="text-[11px] font-bold text-[#727784]">Learning Streak</span>
            <p className="text-xl font-bold text-[#ba1a1a] flex items-center justify-center gap-1 mt-1">
              {student.streakDays} Days <Flame className="w-4 h-4 fill-current" />
            </p>
          </div>

          <div className="bg-[#f6f3f2] p-4 rounded-2xl text-center">
            <span className="text-[11px] font-bold text-[#727784]">Topics Mastered</span>
            <p className="text-xl font-bold text-[#2a6767] flex items-center justify-center gap-1 mt-1">
              {student.completedTopicsCount} / {student.totalTopicsCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
