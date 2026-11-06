import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WATER_CYCLE_QUIZ } from '../data/mockData';
import { QuizQuestion } from '../types';
import {
  Volume2,
  Mic,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Gem,
  Award,
  Sparkles,
  HelpCircle,
  X,
  RotateCcw
} from 'lucide-react';

export const AdaptiveQuizView: React.FC = () => {
  const { addGemsAndCoins, isOffline, activeLanguage, setCurrentView, t } = useApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(3); // 1-5
  const [speechActive, setSpeechActive] = useState<boolean>(false);
  const [sttListening, setSttListening] = useState<boolean>(false);

  // Hint modal state
  const [hintModalOpen, setHintModalOpen] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');
  const [isLoadingHint, setIsLoadingHint] = useState<boolean>(false);

  // Completion modal state
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const currentQ: QuizQuestion = WATER_CYCLE_QUIZ[currentIndex] || WATER_CYCLE_QUIZ[0];
  const progressPercent = Math.round(((currentIndex + 1) / WATER_CYCLE_QUIZ.length) * 100);

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitOrNext = () => {
    if (!isAnswerSubmitted) {
      if (!selectedOptionId) return;
      setIsAnswerSubmitted(true);

      const isCorrect = selectedOptionId === currentQ.correctOptionId;
      if (isCorrect) {
        setScoreCount((prev) => prev + 1);
        setCurrentDifficulty((prev) => Math.min(prev + 1, 5));
      } else {
        setCurrentDifficulty((prev) => Math.max(prev - 1, 1));
      }
    } else {
      // Advance to next question or complete
      if (currentIndex + 1 < WATER_CYCLE_QUIZ.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
      } else {
        // Finish Quiz
        setQuizCompleted(true);
        addGemsAndCoins(50, 100);
      }
    }
  };

  // Text To Speech handler
  const handleTTS = () => {
    setSpeechActive(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${currentQ.questionTextVernacular}. ${currentQ.englishTranslation}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = activeLanguage === 'hi' ? 'hi-IN' : 'en-US';
      utterance.onend = () => setSpeechActive(false);
      utterance.onerror = () => setSpeechActive(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setSpeechActive(false), 2000);
    }
  };

  // Speech To Text handler
  const handleSTT = () => {
    setSttListening(true);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = activeLanguage === 'hi' ? 'hi-IN' : 'en-US';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setSttListening(false);

        // Auto-match option if spoken
        if (transcript.includes('leaf') || transcript.includes('पत्ती') || transcript.includes('b')) {
          handleSelectOption('B');
        } else if (transcript.includes('root') || transcript.includes('जड़') || transcript.includes('a')) {
          handleSelectOption('A');
        } else if (transcript.includes('stem') || transcript.includes('तना') || transcript.includes('c')) {
          handleSelectOption('C');
        } else if (transcript.includes('flower') || transcript.includes('फूल') || transcript.includes('d')) {
          handleSelectOption('D');
        }
      };
      recognition.onerror = () => setSttListening(false);
      recognition.start();
    } else {
      setTimeout(() => {
        setSttListening(false);
        // Fallback simulation
        handleSelectOption('B');
      }, 1500);
    }
  };

  // AI Request Hint handler
  const handleRequestHint = async () => {
    setHintModalOpen(true);
    setIsLoadingHint(true);

    if (isOffline) {
      setHintText(
        `💡 Offline Hint: Think about which plant organs have stomata pores exposed to light and air for gas exchange!`
      );
      setIsLoadingHint(false);
      return;
    }

    try {
      const res = await fetch('/api/ai/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.questionText,
          options: currentQ.options,
          language: activeLanguage,
          difficulty: currentDifficulty,
        }),
      });
      const data = await res.json();
      setHintText(data.hint || currentQ.explanation);
    } catch {
      setHintText(
        `💡 Adaptive Hint: Stomata are tiny microscopic pores located primarily on green leaves!`
      );
    } finally {
      setIsLoadingHint(false);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScoreCount(0);
    setQuizCompleted(false);
    setCurrentDifficulty(3);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300 pb-16">
      {/* Session Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d7e2ff] text-[#0059b9]">
              Grade 7-8 Science
            </span>
            <span className="text-xs text-[#727784] font-medium">Adaptive Session</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1b1c1c] mt-1">
            Science Practice: The Water Cycle
          </h2>
        </div>

        {/* Rewards Pill */}
        <div className="flex items-center gap-2 bg-[#d7e2ff]/40 border border-[#acc7ff] px-4 py-2 rounded-full shadow-2xs self-start md:self-auto">
          <Gem className="w-5 h-5 text-[#0059b9] fill-[#acc7ff]" />
          <span className="text-xs md:text-sm font-bold text-[#0059b9]">
            +50 Gems upon completion
          </span>
        </div>
      </div>

      {/* Progress & Difficulty Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-[11px] font-bold text-[#727784] uppercase tracking-wider">
                {t('Current Progress')}
              </span>
              <p className="text-lg font-bold text-[#1b1c1c]">
                {t('Question')} {currentIndex + 1} {t('of')} {WATER_CYCLE_QUIZ.length}
              </p>
            </div>
            <span className="text-sm font-bold text-[#2a6767]">{progressPercent}% {t('Complete')}</span>
          </div>
          <div className="w-full h-3 bg-[#b1eeed]/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2a6767] rounded-full transition-all duration-500 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Difficulty Adaptation Chart */}
        <div className="bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#727784] uppercase tracking-wider">
              {t('Difficulty Adaptation')}
            </span>
            <span className="text-xs font-bold text-[#0059b9] bg-[#d7e2ff] px-2 py-0.5 rounded-full">
              {t('Level')} {currentDifficulty}
            </span>
          </div>

          <div className="relative h-14 flex items-end pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="100" y2="10" stroke="#e4e2e1" strokeDasharray="2 2" strokeWidth="0.5" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#e4e2e1" strokeDasharray="2 2" strokeWidth="0.5" />
              <path
                d="M 0 35 C 20 35, 40 20, 60 15 S 80 5, 100 5"
                fill="none"
                stroke="#acc7ff"
                strokeWidth="2.5"
              />
              <circle cx="60" cy="15" r="5" fill="#0059b9" className="animate-pulse" />
              <circle cx="20" cy="32" r="2.5" fill="#727784" />
              <circle cx="40" cy="22" r="2.5" fill="#727784" />
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-[#727784] font-semibold -mb-2">
              <span>{t('Easy')}</span>
              <span className="text-[#0059b9]">{t('Hard')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Question Bento Container */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#c2c6d5]/40 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b1eeed]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {/* Audio Tools Bar */}
        <div className="w-full flex justify-end gap-2.5 mb-4">
          <button
            onClick={handleTTS}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              speechActive
                ? 'bg-[#0059b9] text-white animate-bounce'
                : 'bg-[#f6f3f2] hover:bg-[#eae8e7] text-[#424753]'
            }`}
            title="Read Question Aloud (Text to Speech)"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleSTT}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              sttListening
                ? 'bg-[#ba1a1a] text-white animate-pulse'
                : 'bg-[#f6f3f2] hover:bg-[#eae8e7] text-[#424753]'
            }`}
            title="Speak Answer (Speech to Text)"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Question Text */}
        <div className="max-w-2xl w-full mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-[#1b1c1c] leading-tight">
            {currentQ.questionTextVernacular}
          </h3>
          <p className="text-sm md:text-base text-[#727784] mt-2 italic">
            ({currentQ.englishTranslation})
          </p>
        </div>

        {/* Options Grid */}
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrectOption = opt.id === currentQ.correctOptionId;

            let buttonStyle =
              'bg-white border-2 border-[#c2c6d5]/60 text-[#1b1c1c] hover:border-[#0059b9]/50 hover:bg-[#f6f3f2]';
            let badgeStyle = 'border-2 border-[#c2c6d5] text-[#727784]';

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                buttonStyle = 'bg-[#b1eeed]/20 border-2 border-[#2a6767] text-[#1b1c1c] shadow-xs';
                badgeStyle = 'bg-[#2a6767] border-2 border-[#2a6767] text-white';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'bg-[#ffdad6]/30 border-2 border-[#ba1a1a] text-[#1b1c1c]';
                badgeStyle = 'bg-[#ba1a1a] border-2 border-[#ba1a1a] text-white';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-[#d7e2ff]/30 border-2 border-[#0059b9] text-[#0059b9] font-bold shadow-xs';
              badgeStyle = 'bg-[#0059b9] border-2 border-[#0059b9] text-white';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswerSubmitted}
                className={`relative w-full text-left p-4.5 rounded-xl transition-all duration-200 flex items-center gap-3.5 ${buttonStyle}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${badgeStyle}`}
                >
                  {isAnswerSubmitted && isCorrectOption ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isAnswerSubmitted && isSelected && !isCorrectOption ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    opt.id
                  )}
                </div>
                <span className="text-base font-semibold">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Answer Feedback Banner */}
        {isAnswerSubmitted && (
          <div className="w-full max-w-2xl mt-6 p-4 rounded-xl text-left animate-in fade-in bg-[#f6f3f2] border border-[#c2c6d5]/40">
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {selectedOptionId === currentQ.correctOptionId ? (
                <span className="text-[#2a6767] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Correct Answer! +10 Gems
                </span>
              ) : (
                <span className="text-[#ba1a1a] flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Not quite right. Let's review:
                </span>
              )}
            </div>
            <p className="text-xs text-[#424753] leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-2">
        <button
          onClick={handleRequestHint}
          className="w-full sm:w-auto px-5 py-3 rounded-full border-2 border-[#ffb953] text-[#7f5300] text-xs md:text-sm font-bold hover:bg-[#ffddb4]/20 transition-colors flex items-center justify-center gap-2"
        >
          <Lightbulb className="w-4 h-4 text-[#a06900]" />
          <span>{t('Request Hint')}</span>
        </button>

        <button
          onClick={handleSubmitOrNext}
          disabled={!selectedOptionId && !isAnswerSubmitted}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
            !selectedOptionId && !isAnswerSubmitted
              ? 'bg-[#e4e2e1] text-[#727784] cursor-not-allowed'
              : 'bg-[#2a6767] hover:bg-[#316d6d] text-white hover:shadow-md'
          }`}
        >
          <span>{isAnswerSubmitted ? t('Next Question') : t('Submit Answer')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* AI Request Hint Modal */}
      {hintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-[#c2c6d5]/40 relative space-y-4">
            <button
              onClick={() => setHintModalOpen(false)}
              className="absolute top-4 right-4 text-[#727784] hover:text-[#1b1c1c] p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 text-[#0059b9]">
              <Sparkles className="w-5 h-5 text-[#0059b9] fill-[#acc7ff]" />
              <h4 className="text-base font-bold">GyanFlow Adaptive Hint</h4>
            </div>

            {isLoadingHint ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-8 h-8 border-3 border-[#0059b9] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#727784] font-medium">Analyzing concept difficulty...</p>
              </div>
            ) : (
              <div className="p-4 bg-[#d7e2ff]/30 rounded-xl border border-[#acc7ff]/50">
                <p className="text-sm text-[#1b1c1c] leading-relaxed">{hintText}</p>
              </div>
            )}

            <button
              onClick={() => setHintModalOpen(false)}
              className="w-full bg-[#0059b9] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#2f72d6] transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {/* Completion Summary Modal */}
      {quizCompleted && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl text-center space-y-6 border border-[#c2c6d5]/40">
            <div className="w-16 h-16 rounded-full bg-[#b1eeed] text-[#2a6767] flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#0059b9] uppercase tracking-wider">
                {t('Practice Session Complete!')}
              </span>
              <h3 className="text-2xl font-bold text-[#1b1c1c] mt-1">{t('Great Effort!')}</h3>
              <p className="text-xs text-[#727784] mt-1">
                You completed the adaptive session on Water Cycle & Algebra Basics.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#f6f3f2] p-4 rounded-2xl">
              <div className="text-center border-r border-[#c2c6d5]/40 pr-2">
                <span className="text-[11px] font-semibold text-[#727784]">{t('Accuracy')}</span>
                <p className="text-xl font-bold text-[#2a6767]">
                  {Math.round((scoreCount / WATER_CYCLE_QUIZ.length) * 100)}%
                </p>
              </div>
              <div className="text-center pl-2">
                <span className="text-[11px] font-semibold text-[#727784]">{t('Gems Earned')}</span>
                <p className="text-xl font-bold text-[#0059b9] flex items-center justify-center gap-1">
                  +50 <Gem className="w-4 h-4 fill-current text-[#0059b9]" />
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={restartQuiz}
                className="flex-1 bg-[#f0eded] hover:bg-[#eae8e7] text-[#424753] py-3 rounded-full font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('Retry')}</span>
              </button>
              <button
                onClick={() => setCurrentView('student-home')}
                className="flex-1 bg-[#0059b9] hover:bg-[#2f72d6] text-white py-3 rounded-full font-bold text-xs transition-colors shadow-sm"
              >
                {t('Back to Dashboard')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
