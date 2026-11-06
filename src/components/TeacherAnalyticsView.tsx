import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AT_RISK_STUDENTS, TOPIC_GAPS, RECOMMENDED_INTERVENTIONS } from '../data/mockData';
import { AtRiskStudent } from '../types';
import {
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Filter,
  Mail,
  Sliders,
  Calendar,
  Send,
  X,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const TeacherAnalyticsView: React.FC = () => {
  const { showToast, t } = useApp();

  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 8 Science');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('This Week');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  // Modal states
  const [messageModalStudent, setMessageModalStudent] = useState<AtRiskStudent | null>(null);
  const [messageText, setMessageText] = useState<string>('');

  const filteredStudents = AT_RISK_STUDENTS.filter((std) => {
    if (filterRisk === 'high') return std.riskScore >= 70;
    if (filterRisk === 'med') return std.riskScore >= 50 && std.riskScore < 70;
    return true;
  });

  const handleOpenMessageModal = (std: AtRiskStudent) => {
    setMessageModalStudent(std);
    setMessageText(
      `Dear Parent/Guardian of ${std.name},\nWe noticed Rahul is currently experiencing challenges in ${std.struggleConcept}. We have prepared tailored offline review materials in GyanFlow.`
    );
  };

  const handleSendMessage = () => {
    if (!messageModalStudent) return;
    showToast(`Message successfully sent to parent of ${messageModalStudent.name}! 📩`);
    setMessageModalStudent(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#c2c6d5]/40 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#b1eeed] text-[#074f4f]">
              {t('Teacher View')}
            </span>
            <span className="text-xs text-[#727784] font-medium">{t('Real-time Dashboard')}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1b1c1c] mt-1">
            {t('Class Performance & Risk Analytics')}
          </h2>
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="appearance-none bg-[#f6f3f2] hover:bg-[#eae8e7] text-[#1b1c1c] font-bold text-xs md:text-sm py-2.5 pl-3.5 pr-8 rounded-xl border border-[#c2c6d5]/40 focus:outline-none cursor-pointer"
            >
              <option>Grade 8 Science</option>
              <option>Grade 7 Math</option>
              <option>Grade 6 History</option>
              <option>Grade 9 Biology</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#727784] absolute right-2.5 top-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="appearance-none bg-[#f6f3f2] hover:bg-[#eae8e7] text-[#1b1c1c] font-bold text-xs md:text-sm py-2.5 pl-3.5 pr-8 rounded-xl border border-[#c2c6d5]/40 focus:outline-none cursor-pointer"
            >
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#727784] absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: Class Average */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#c2c6d5]/40 shadow-xs hover:shadow-md transition-all flex items-center gap-3 sm:gap-4 overflow-hidden">
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
                strokeDasharray="71, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute text-xs sm:text-sm text-[#2a6767] font-bold">71%</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] sm:text-xs font-semibold text-[#727784] uppercase tracking-wider truncate">
              {t('Class Average')}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
              <p className="text-base sm:text-xl font-bold text-[#1b1c1c] whitespace-nowrap">71% {t('Mastery')}</p>
              <span className="text-[10px] sm:text-xs font-semibold text-[#2a6767] bg-[#b1eeed]/40 px-2 py-0.5 rounded-full flex items-center whitespace-nowrap">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +3.2%
              </span>
            </div>
          </div>
        </div>

        {/* KPI 2: Students At-Risk */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#c2c6d5]/40 shadow-xs hover:shadow-md transition-all flex items-center gap-3 sm:gap-4 border-l-4 border-l-[#ba1a1a] overflow-hidden">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ffdad6]/60 flex items-center justify-center text-[#ba1a1a] shrink-0">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] sm:text-xs font-semibold text-[#727784] uppercase tracking-wider truncate">
              {t('Students At-Risk')}
            </h3>
            <div className="flex items-center gap-2 mt-1 overflow-hidden">
              <p className="text-base sm:text-xl font-bold text-[#1b1c1c] whitespace-nowrap">7 Students</p>
              <span className="text-[10px] sm:text-xs font-semibold text-[#ba1a1a] bg-[#ffdad6]/60 px-2 py-0.5 rounded-full whitespace-nowrap truncate">
                {t('Action Required')}
              </span>
            </div>
          </div>
        </div>

        {/* KPI 3: Weekly Activity */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#c2c6d5]/40 shadow-xs hover:shadow-md transition-all flex items-center gap-3 sm:gap-4 overflow-hidden">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#d7e2ff]/60 flex items-center justify-center text-[#0059b9] shrink-0">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] sm:text-xs font-semibold text-[#727784] uppercase tracking-wider truncate">
              {t('Weekly Activity')}
            </h3>
            <div className="flex items-center gap-2 mt-1 overflow-hidden">
              <p className="text-base sm:text-xl font-bold text-[#1b1c1c] whitespace-nowrap">4.2 hrs / std</p>
              <span className="text-[10px] sm:text-xs font-semibold text-[#0059b9] bg-[#d7e2ff]/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                +1.1 hrs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Row 2: Predictive Risk Analysis Table & Topic Mastery Gaps */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Predictive Risk Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-[#1b1c1c]">{t('Predictive Risk Analysis')}</h3>
              <p className="text-xs text-[#727784]">AI-detected learning gaps & dropoff alerts</p>
            </div>

            <div className="flex gap-1.5 self-start sm:self-auto">
              <button
                onClick={() => setFilterRisk('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  filterRisk === 'all'
                    ? 'bg-[#0059b9] text-white'
                    : 'bg-[#f6f3f2] text-[#424753] hover:bg-[#eae8e7]'
                }`}
              >
                {t('All')}
              </button>
              <button
                onClick={() => setFilterRisk('high')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  filterRisk === 'high'
                    ? 'bg-[#ba1a1a] text-white'
                    : 'bg-[#ffdad6]/40 text-[#ba1a1a] hover:bg-[#ffdad6]'
                }`}
              >
                {t('High Risk')} (&gt;70%)
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {filteredStudents.map((std) => (
              <div
                key={std.id}
                className="bg-[#f6f3f2] hover:bg-white border border-[#c2c6d5]/30 p-4 rounded-xl transition-all shadow-2xs hover:shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={std.avatarUrl}
                    alt={std.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#c2c6d5] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#1b1c1c] truncate">{std.name}</h4>
                      <span className="text-[11px] font-semibold text-[#727784]">{std.studentId}</span>
                    </div>
                    <p className="text-xs text-[#ba1a1a] font-medium mt-0.5 line-clamp-1">
                      ⚠️ {std.notes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#ffdad6] text-[#ba1a1a] inline-flex items-center gap-1">
                      {std.riskScore}% Risk
                      <TrendingDown className="w-3 h-3" />
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenMessageModal(std)}
                    className="bg-[#0059b9] hover:bg-[#2f72d6] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{t('Message')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Mastery Gaps Bar Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#1b1c1c]">{t('Class Topic Gaps')}</h3>
            <p className="text-xs text-[#727784]">Concept mastery levels across active modules</p>
          </div>

          <div className="space-y-4">
            {TOPIC_GAPS.map((gap) => {
              let barColor = 'bg-[#2a6767]';
              let badgeBg = 'bg-[#b1eeed]/40 text-[#074f4f]';

              if (gap.status === 'critical') {
                barColor = 'bg-[#ba1a1a]';
                badgeBg = 'bg-[#ffdad6] text-[#ba1a1a]';
              } else if (gap.status === 'warning') {
                barColor = 'bg-[#a06900]';
                badgeBg = 'bg-[#ffddb4] text-[#a06900]';
              }

              return (
                <div key={gap.topicName} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-[#1b1c1c]">{gap.topicName}</span>
                    <span className={`px-2 py-0.5 rounded-full ${badgeBg}`}>
                      {gap.masteryPercent}% Mastery
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#f0eded] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${gap.masteryPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Row 3: Actionable Recommended Interventions */}
      <section className="bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-[#1b1c1c]">{t('Recommended Teacher Interventions')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECOMMENDED_INTERVENTIONS.map((item) => (
            <div
              key={item.id}
              className="bg-[#f6f3f2] p-5 rounded-2xl border border-[#c2c6d5]/30 flex flex-col justify-between hover:border-[#0059b9]/40 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#d7e2ff] text-[#0059b9] flex items-center justify-center font-bold mb-3">
                  {item.type === 'message' && <Mail className="w-5 h-5" />}
                  {item.type === 'remedial' && <Users className="w-5 h-5" />}
                  {item.type === 'difficulty' && <Sliders className="w-5 h-5" />}
                </div>
                <h4 className="text-base font-bold text-[#1b1c1c]">{item.title}</h4>
                <p className="text-xs text-[#424753] mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => {
                  if (item.type === 'message') {
                    handleOpenMessageModal(AT_RISK_STUDENTS[0]);
                  } else {
                    showToast(`Applied intervention: ${item.title}`);
                  }
                }}
                className="mt-5 w-full bg-[#0059b9] hover:bg-[#2f72d6] text-white py-2.5 rounded-xl font-bold text-xs transition-colors"
              >
                {item.actionText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Message Parent Modal */}
      {messageModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl border border-[#c2c6d5]/40 relative space-y-4">
            <button
              onClick={() => setMessageModalStudent(null)}
              className="absolute top-4 right-4 text-[#727784] hover:text-[#1b1c1c] p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <img
                src={messageModalStudent.avatarUrl}
                alt={messageModalStudent.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-bold text-[#1b1c1c]">
                  Draft Parent Update: {messageModalStudent.name}
                </h4>
                <p className="text-xs text-[#727784]">{messageModalStudent.studentId}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#424753] mb-1">
                Message Body (Vernacular SMS / WhatsApp):
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
                className="w-full bg-[#f6f3f2] p-3 rounded-xl border border-[#c2c6d5]/40 text-xs text-[#1b1c1c] focus:outline-none focus:border-[#0059b9]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setMessageModalStudent(null)}
                className="flex-1 bg-[#f0eded] text-[#424753] py-2.5 rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 bg-[#0059b9] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#2f72d6] transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send SMS / WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
