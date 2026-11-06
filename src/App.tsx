import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { StudentHomeView } from './components/StudentHomeView';
import { AdaptiveQuizView } from './components/AdaptiveQuizView';
import { TeacherAnalyticsView } from './components/TeacherAnalyticsView';
import { DownloadsView } from './components/DownloadsView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { AvatarModal } from './components/AvatarModal';
import { AuthView } from './components/AuthView';
import { GuidedTutorial } from './components/GuidedTutorial';
import { CourseBrowserView } from './components/CourseBrowserView';

const MainContent: React.FC = () => {
  const { currentView, toastMessage, user, authLoading, student } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0059b9] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthView />
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#0059b9] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs md:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
            <span>{toastMessage}</span>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans flex flex-col antialiased selection:bg-[#d7e2ff]">
      {student.isNewUser && <GuidedTutorial />}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex shrink-0 sticky top-0 h-screen" />

        {/* Mobile Slide-Over Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <Sidebar
              className="relative z-10 w-[280px] bg-white h-full"
              onItemClick={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        )}

        {/* Right Area: Header + Scrollable View */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <Header
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            isMobileSidebarOpen={isMobileSidebarOpen}
          />

          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            {currentView === 'student-home' && <StudentHomeView />}
            {currentView === 'course-browser' && <CourseBrowserView />}
            {currentView === 'quiz' && <AdaptiveQuizView />}
            {currentView === 'teacher-analytics' && <TeacherAnalyticsView />}
            {currentView === 'downloads' && <DownloadsView />}
            {currentView === 'profile' && <ProfileView />}
            {currentView === 'settings' && <SettingsView />}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Avatar Modal */}
      <AvatarModal />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#0059b9] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs md:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
