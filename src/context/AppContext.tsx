import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppView,
  StudentProfile,
  LanguageCode,
  DownloadItem,
  AvatarItem
} from '../types';
import {
  DOWNLOAD_ITEMS as INITIAL_DOWNLOADS,
  AVATAR_CATALOG
} from '../data/mockData';
import { t } from '../translations';

export const DEFAULT_NEW_STUDENT: StudentProfile = {
  id: 'new-user',
  name: '',
  grade: '8',
  language: 'en',
  gems: 0,
  coins: 0,
  streakDays: 0,
  topicsMastered: 0,
  avgQuizScore: 0,
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=new-user&backgroundColor=b1eeed',
  avatarId: 'default',
  isNewUser: true,
};

interface User {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl: string;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  toggleOffline: () => void;
  activeLanguage: LanguageCode;
  setActiveLanguage: (lang: LanguageCode) => void;
  downloads: DownloadItem[];
  toggleDownload: (id: string) => void;
  avatars: AvatarItem[];
  selectAvatar: (avatar: AvatarItem) => void;
  unlockAvatar: (avatarId: string) => boolean;
  addGemsAndCoins: (gems: number, coins: number) => void;
  showAvatarModal: boolean;
  setShowAvatarModal: (show: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  t: (text: string) => string;
  user: User | null;
  authLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  completeTutorial: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('student-home');
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_NEW_STUDENT);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>('en');
  const [downloads, setDownloads] = useState<DownloadItem[]>(INITIAL_DOWNLOADS);
  const [avatars, setAvatars] = useState<AvatarItem[]>(AVATAR_CATALOG);
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gyanflow_user');
    const savedStudent = localStorage.getItem('gyanflow_student');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      setUser(parsedUser);
      if (savedStudent) {
        setStudent({ ...DEFAULT_NEW_STUDENT, ...JSON.parse(savedStudent) });
        setActiveLanguage(JSON.parse(savedStudent).language || 'en');
      } else {
        setStudent({ ...DEFAULT_NEW_STUDENT, id: parsedUser.uid, name: parsedUser.displayName });
      }
    }
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gyanflow_student', JSON.stringify(student));
    }
  }, [student, user]);

  const login = (email: string, _password: string) => {
    const isNewUser = !localStorage.getItem(`gyanflow_user_email:${email}`);
    const uid = `uid_${btoa(email).replace(/[^a-zA-Z0-9]/g, '')}`;
    const displayName = email.split('@')[0];
    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${uid}&backgroundColor=b1eeed`;
    const newUser: User = { uid, email, displayName, avatarUrl };
    localStorage.setItem('gyanflow_user', JSON.stringify(newUser));
    localStorage.setItem('gyanflow_user_email', email);

    const studentData: StudentProfile = {
      ...DEFAULT_NEW_STUDENT,
      id: uid,
      name: displayName,
      avatarUrl,
    };
    setStudent(studentData);
    localStorage.setItem('gyanflow_student', JSON.stringify(studentData));
    setUser(newUser);
    showToast(isNewUser ? 'Account created successfully!' : 'Successfully logged in!');
  };

  const logout = () => {
    setUser(null);
    setStudent(DEFAULT_NEW_STUDENT);
    localStorage.removeItem('gyanflow_user');
    showToast('Logged out successfully');
  };

  const completeTutorial = () => {
    setStudent(prev => ({ ...prev, isNewUser: false }));
  };

  const toggleOffline = () => {
    setIsOffline((prev) => {
      const next = !prev;
      showToast(next ? 'Sync Status: Offline (Low-Bandwidth Mode)' : 'Sync Status: Online (Live Cloud Sync)');
      return next;
    });
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setActiveLanguage(lang);
    setStudent((prev) => ({ ...prev, language: lang }));
    showToast(`Language updated to ${lang.toUpperCase()}`);
  };

  const toggleDownload = (id: string) => {
    setDownloads((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = !item.isDownloaded;
          showToast(newStatus ? `Downloaded "${item.title}" for offline learning!` : `Removed "${item.title}" from local storage.`);
          return {
            ...item,
            isDownloaded: newStatus,
            progress: newStatus ? 100 : 0,
            downloadDate: newStatus ? 'Just now' : 'Not downloaded',
          };
        }
        return item;
      })
    );
  };

  const selectAvatar = (avatar: AvatarItem) => {
    setStudent((prev) => ({
      ...prev,
      avatarUrl: avatar.imageUrl,
      avatarId: avatar.id,
    }));
    showToast(`Avatar updated to ${avatar.name}!`);
    setShowAvatarModal(false);
  };

  const unlockAvatar = (avatarId: string): boolean => {
    const target = avatars.find((a) => a.id === avatarId);
    if (!target) return false;
    if (student.gems < target.costGems) {
      showToast(`Not enough Gems! Required: ${target.costGems} 💎`);
      return false;
    }

    setStudent((prev) => ({
      ...prev,
      gems: prev.gems - target.costGems,
      avatarUrl: target.imageUrl,
      avatarId: target.id,
    }));

    setAvatars((prev) =>
      prev.map((a) => (a.id === avatarId ? { ...a, unlocked: true } : a))
    );

    showToast(`Unlocked new Avatar: ${target.name}! 🎉`);
    return true;
  };

  const addGemsAndCoins = (gems: number, coins: number) => {
    setStudent((prev) => ({
      ...prev,
      gems: prev.gems + gems,
      coins: prev.coins + coins,
    }));
    showToast(`+${gems} Gems 💎 and +${coins} Coins 🪙 earned!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const translate = (text: string) => t(text, activeLanguage);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        student,
        setStudent,
        isOffline,
        setIsOffline,
        toggleOffline,
        activeLanguage,
        setActiveLanguage: handleLanguageChange,
        downloads,
        toggleDownload,
        avatars,
        selectAvatar,
        unlockAvatar,
        addGemsAndCoins,
        showAvatarModal,
        setShowAvatarModal,
        toastMessage,
        showToast,
        t: translate,
        user,
        authLoading,
        login,
        logout,
        completeTutorial,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
