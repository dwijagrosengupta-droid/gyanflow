import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUBJECT_TOPICS, RECOMMENDED_LESSONS, LEADERBOARD_DATA } from '../data/mockData';
import {
  Flame,
  Award,
  Play,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles,
  BarChart2,
  CheckCircle2,
  Download
} from 'lucide-react';

export const StudentHomeView: React.FC = () => {
  const { student, setCurrentView, downloads, toggleDownload, t } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const filteredLessons = RECOMMENDED_LESSONS.filter((lesson) => {
    if (selectedTopic === 'all') return true;
    return lesson.subject.toLowerCase().includes(selectedTopic.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16 md:pb-8">
      {/* Personalized Greeting Header */}
      <div className="bg-gradient-to-r from-[#0059b9]/10 via-[#b1eeed]/20 to-[#fbf9f8] p-6 rounded-2xl border border-[#acc7ff]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1b1c1c]">
            {t('Welcome back,')} <span className="text-[#0059b9]">{student.name}</span>!
          </h2>
          <p className="text-sm text-[#424753] mt-1">
            {t("Let's continue learning today. You're on a")} <strong className="text-[#a06900]">{student.streakDays}{t('-day streak!')}</strong> 🔥
          </p>
        </div>
        <button
          onClick={() => setCurrentView('quiz')}
          className="bg-[#0059b9] hover:bg-[#2f72d6] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{t('Resume Last Lesson')}</span>
        </button>
      </div>

      {/* Row 1: KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Course Progress Ring */}
        <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-xs hover:shadow-md transition-all border border-[#c2c6d5]/40 flex items-center gap-3 sm:gap-4 overflow-hidden">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-[#e4e2e1]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-[#2a6767]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${student.totalTopicsCount ? Math.round(((student.completedTopicsCount || 0) / student.totalTopicsCount) * 100) : 0}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute text-xs sm:text-sm text-[#2a6767] font-bold">
              {student.totalTopicsCount ? Math.round(((student.completedTopicsCount || 0) / student.totalTopicsCount) * 100) : 0}%
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] sm:text-xs font-semibold text-[#727784] uppercase tracking-wider truncate">
              {t('Course Progress')}
            </h3>
            <p className="text-sm sm:text-base font-bold text-[#1b1c1c] mt-1 truncate">
              {student.completedTopicsCount || 0} of {student.totalTopicsCount || 0} topics done
            </p>
          </div>
        </div>

        {/* Card 2: Avg Quiz Score */}
        <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-xs hover:shadow-md transition-all border border-[#c2c6d5]/40 flex items-center gap-3 sm:gap-4 overflow-hidden">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#d7e2ff]/50 flex items-center justify-center text-[#0059b9] shrink-0">
            <BarChart2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] sm:text-xs font-semibold text-[#727784] uppercase tracking-wider truncate">
              {t('Avg Quiz Score')}
            </h3>
            <div className="flex items-baseline gap-2 mt-1 overflow-hidden">
              <p className="text-base sm:text-xl font-bold text-[#1b1c1c]">{student.avgQuizScore || 0}%</p>
              <span className="text-[10px] sm:text-xs font-semibold text-[#0059b9] bg-[#d7e2ff]/50 px-2 py-0.5 rounded-full whitespace-nowrap">
                {student.avgQuizScore ? 'B- average' : 'No Data'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Daily Streak */}
        <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-xs hover:shadow-md transition-all border border-[#c2c6d5]/40 flex items-center gap-3 sm:gap-4 overflow-hidden">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ffdad6]/60 flex items-center justify-center text-[#ba1a1a] shrink-0">
            <Flame className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] sm:text-xs font-semibold text-[#727784] uppercase tracking-wider truncate">
              {t('Daily Streak')}
            </h3>
            <div className="flex items-baseline gap-2 mt-1 overflow-hidden">
              <p className="text-base sm:text-xl font-bold text-[#1b1c1c] whitespace-nowrap">{student.streakDays || 0} {t('Days')}</p>
              <span className="text-[10px] sm:text-xs font-semibold text-[#ba1a1a] bg-[#ffdad6]/50 px-2 py-0.5 rounded-full whitespace-nowrap">
                {student.streakDays ? 'Keep it going!' : 'Start Learning!'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Row 2: Your Topics & Recommended Lessons Grid + Community Leaderboard */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Lessons Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#1b1c1c]">{t('Your Topics')}</h3>
            <span className="text-xs font-medium text-[#727784]">{t('Grade 1-12 Curriculum')}</span>
          </div>

          {/* Topic Pills */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedTopic === 'all'
                  ? 'bg-[#0059b9] text-white shadow-xs'
                  : 'bg-white text-[#424753] hover:bg-[#f0eded] border border-[#c2c6d5]/40'
              }`}
            >
              {t('All Subjects')}
            </button>
            {SUBJECT_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  selectedTopic === topic.id
                    ? 'bg-[#0059b9] text-white shadow-xs'
                    : `${topic.bgClass} ${topic.colorClass} hover:opacity-80`
                }`}
              >
                <span>{topic.name}</span>
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div className="pt-2">
            <h3 className="text-lg font-bold text-[#1b1c1c] mb-4">{t('Recommended Lessons')}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredLessons.map((lesson) => {
                const isDl = downloads.some((d) => d.id === lesson.id && d.isDownloaded);

                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-2xl border border-[#c2c6d5]/40 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="h-36 relative overflow-hidden bg-[#f0eded]">
                        <img
                          src={lesson.imageUrl}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-[#0059b9] flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3 text-[#0059b9] fill-[#acc7ff]" />
                          <span>+{lesson.gemReward} Gems</span>
                        </div>
                        <button
                          onClick={() => toggleDownload(lesson.id)}
                          className={`absolute top-3 left-3 p-1.5 rounded-full text-xs font-bold backdrop-blur-xs transition-colors ${
                            isDl
                              ? 'bg-[#2a6767] text-white'
                              : 'bg-black/40 text-white hover:bg-black/60'
                          }`}
                          title={isDl ? 'Downloaded for offline' : 'Download for offline use'}
                        >
                          {isDl ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Content Info */}
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[11px] font-bold text-[#2a6767] uppercase tracking-wider">
                            {lesson.grade}
                          </span>
                          <span className="text-xs font-medium text-[#727784]">
                            {lesson.durationMinutes} mins
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#1b1c1c] leading-snug group-hover:text-[#0059b9] transition-colors">
                          {lesson.title}
                        </h4>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex justify-between text-xs font-semibold text-[#727784] mb-1">
                            <span>{t('Progress')}</span>
                            <span>{lesson.progressPercent}%</span>
                          </div>
                          <div className="w-full bg-[#e4e2e1] rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-[#2a6767] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${lesson.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => setCurrentView('quiz')}
                        className="w-full bg-[#f6f3f2] hover:bg-[#0059b9] hover:text-white text-[#0059b9] font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{lesson.progressPercent > 0 ? t('Continue Lesson') : t('Start Lesson')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leaderboard Column */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1b1c1c]">{t('Community Leaderboard')}</h3>
              <span className="text-xs font-semibold text-[#a06900] bg-[#ffddb4]/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#a06900]" />
                {t('Top Students')}
              </span>
            </div>

            {/* Podium for top 3 */}
            <div className="flex justify-center items-end gap-2 mb-8 h-36 px-2">
              {/* 2nd Place */}
              <div className="flex flex-col items-center w-1/3">
                <img
                  src={LEADERBOARD_DATA[1].avatarUrl}
                  alt={LEADERBOARD_DATA[1].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#c2c6d5] mb-2"
                />
                <div className="w-full h-16 bg-[#f0eded] rounded-t-lg flex flex-col items-center justify-center p-1">
                  <span className="text-xs font-bold text-[#424753]">2</span>
                  <span className="text-[10px] font-semibold text-[#727784] truncate max-w-full">
                    {LEADERBOARD_DATA[1].name}
                  </span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center w-1/3">
                <Award className="w-5 h-5 text-[#ffb953] fill-[#ffb953] mb-1" />
                <img
                  src={LEADERBOARD_DATA[0].avatarUrl}
                  alt={LEADERBOARD_DATA[0].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#ffb953] mb-2 shadow-xs"
                />
                <div className="w-full h-20 bg-[#d7e2ff] rounded-t-lg flex flex-col items-center justify-center p-1 border-t-4 border-[#0059b9]">
                  <span className="text-xs font-bold text-[#0059b9]">1</span>
                  <span className="text-[10px] font-bold text-[#0059b9] truncate max-w-full">
                    {LEADERBOARD_DATA[0].name}
                  </span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center w-1/3">
                <img
                  src={LEADERBOARD_DATA[2].avatarUrl}
                  alt={LEADERBOARD_DATA[2].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#c2c6d5] mb-2"
                />
                <div className="w-full h-12 bg-[#f0eded] rounded-t-lg flex flex-col items-center justify-center p-1">
                  <span className="text-xs font-bold text-[#424753]">3</span>
                  <span className="text-[10px] font-semibold text-[#727784] truncate max-w-full">
                    {LEADERBOARD_DATA[2].name}
                  </span>
                </div>
              </div>
            </div>

            {/* List for ranks 4-6 */}
            <div className="space-y-2.5">
              {LEADERBOARD_DATA.slice(3).map((item) => (
                <div
                  key={item.rank}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                    item.isCurrentUser
                      ? 'bg-[#d7e2ff]/50 border border-[#0059b9]/30 font-bold'
                      : 'hover:bg-[#f6f3f2]'
                  }`}
                >
                  <span className="text-xs font-bold text-[#727784] w-4 text-center">
                    {item.rank}
                  </span>
                  <img
                    src={item.isCurrentUser ? student.avatarUrl : item.avatarUrl}
                    alt={item.isCurrentUser ? student.name : item.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#c2c6d5]"
                  />
                  <span className="text-xs font-semibold text-[#1b1c1c] flex-1 truncate">
                    {item.isCurrentUser ? `${student.name} (You)` : item.name}
                  </span>
                  <span className="text-xs font-bold text-[#0059b9]">{item.score}</span>
                  {item.trend === 'up' && <ArrowUp className="w-3.5 h-3.5 text-[#2a6767]" />}
                  {item.trend === 'down' && <ArrowDown className="w-3.5 h-3.5 text-[#ba1a1a]" />}
                  {item.trend === 'same' && <Minus className="w-3.5 h-3.5 text-[#727784]" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#c2c6d5]/30 text-center">
            <button
              onClick={() => setCurrentView('quiz')}
              className="text-xs font-bold text-[#0059b9] hover:underline"
            >
              {t('Earn +50 Gems to climb top ranks!')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
