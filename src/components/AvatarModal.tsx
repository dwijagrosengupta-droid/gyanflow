import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Gem, CheckCircle2, Lock } from 'lucide-react';

export const AvatarModal: React.FC = () => {
  const {
    student,
    avatars,
    selectAvatar,
    unlockAvatar,
    showAvatarModal,
    setShowAvatarModal,
  } = useApp();

  if (!showAvatarModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-[#c2c6d5]/40 relative space-y-6">
        <button
          onClick={() => setShowAvatarModal(false)}
          className="absolute top-5 right-5 text-[#727784] hover:text-[#1b1c1c] p-1.5 rounded-full hover:bg-[#f0eded] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold text-[#0059b9] uppercase tracking-wider">
            Gamification Store
          </span>
          <h3 className="text-2xl font-bold text-[#1b1c1c] mt-1">Customize Your Avatar</h3>
          <p className="text-xs text-[#727784] mt-1">
            Earn Gems by completing daily adaptive lessons to unlock special avatars!
          </p>
        </div>

        {/* Current Gems Display */}
        <div className="flex items-center justify-between bg-[#d7e2ff]/40 p-4 rounded-2xl border border-[#acc7ff]">
          <span className="text-xs font-bold text-[#0059b9]">Your Gem Balance</span>
          <div className="flex items-center gap-1.5 text-base font-bold text-[#0059b9]">
            <Gem className="w-5 h-5 text-[#0059b9] fill-[#acc7ff]" />
            <span>{student.gems.toLocaleString()} Gems</span>
          </div>
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-2 gap-4 max-h-72 overflow-y-auto p-1">
          {avatars.map((avatar) => {
            const isSelected = student.avatarId === avatar.id;

            return (
              <div
                key={avatar.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 relative ${
                  isSelected
                    ? 'border-[#0059b9] bg-[#d7e2ff]/30 shadow-xs'
                    : 'border-[#c2c6d5]/40 hover:border-[#0059b9]/40 bg-white'
                }`}
              >
                <img
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#0059b9]/50 shadow-2xs"
                />
                <h4 className="text-xs font-bold text-[#1b1c1c]">{avatar.name}</h4>

                {avatar.unlocked ? (
                  <button
                    onClick={() => selectAvatar(avatar)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#0059b9] text-white cursor-default'
                        : 'bg-[#f0eded] hover:bg-[#eae8e7] text-[#0059b9]'
                    }`}
                  >
                    {isSelected ? 'Equipped ✓' : 'Equip'}
                  </button>
                ) : (
                  <button
                    onClick={() => unlockAvatar(avatar.id)}
                    className="w-full bg-[#ffb953] hover:bg-[#ffaa2a] text-[#7f5300] py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock ({avatar.costGems} 💎)</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
