import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Target, Download, TrendingUp, Trophy } from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    title: 'Welcome to GyanFlow! 🎉',
    description: "Your personalized learning journey starts here. Let's take a quick tour of what you can do.",
    icon: <Target className="w-10 h-10 text-[#0059b9]" />,
  },
  {
    title: 'Learn Offline',
    description: 'No internet? No problem! You can download lessons and quizzes to learn anytime, anywhere using the Downloads section.',
    icon: <Download className="w-10 h-10 text-[#2a6767]" />,
  },
  {
    title: 'Track Your Performance',
    description: 'Teachers and students can monitor progress, mastery, and daily streaks to stay on top of the learning goals.',
    icon: <TrendingUp className="w-10 h-10 text-[#ba1a1a]" />,
  },
  {
    title: 'Earn Rewards',
    description: 'Complete quizzes to earn Gems and Coins. Use them to unlock cool avatars and climb the community leaderboard!',
    icon: <Trophy className="w-10 h-10 text-[#a06900]" />,
  },
];

export const GuidedTutorial: React.FC = () => {
  const { completeTutorial, t } = useApp();
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < TUTORIAL_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      completeTutorial();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-[#c2c6d5]/40 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Progress dots */}
          <div className="flex gap-1.5 mb-8">
            {TUTORIAL_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === step ? 'w-6 bg-[#0059b9]' : 'w-1.5 bg-[#c2c6d5]'
                }`}
              />
            ))}
          </div>

          <div className="mb-6 p-4 rounded-full bg-[#f6f3f2]">
            {TUTORIAL_STEPS[step].icon}
          </div>

          <h2 className="text-2xl font-bold text-[#1b1c1c] mb-3">
            {t(TUTORIAL_STEPS[step].title)}
          </h2>
          <p className="text-[#424753] text-sm leading-relaxed mb-8">
            {t(TUTORIAL_STEPS[step].description)}
          </p>

          <button
            onClick={nextStep}
            className="w-full bg-[#0059b9] hover:bg-[#2f72d6] text-white font-bold py-3.5 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            {step < TUTORIAL_STEPS.length - 1 ? (
              <>
                <span>{t('Continue')}</span>
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <span>{t("Let's Get Started!")}</span>
            )}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
