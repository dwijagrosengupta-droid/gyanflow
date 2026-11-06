export type LanguageCode = 'hi' | 'en' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'or';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export type AppView =
  | 'student-home'
  | 'course-browser'
  | 'quiz'
  | 'teacher-analytics'
  | 'downloads'
  | 'profile'
  | 'settings';

export interface CourseModule {
  name: string;
}

export interface CourseChapter {
  name: string;
  pdfUrl?: string;
  modules: string[];
}

export interface CourseSubject {
  name: string;
  chapters: CourseChapter[];
}

export interface CourseClass {
  className: string;
  subjects: CourseSubject[];
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  school?: string;
  district?: string;
  state?: string;
  avatarUrl: string;
  avatarId: string;
  gems: number;
  coins: number;
  streakDays: number;
  completedTopicsCount?: number;
  totalTopicsCount?: number;
  topicsMastered?: number;
  avgQuizScore: number;
  language: LanguageCode;
  isNewUser?: boolean;
}

export interface SubjectTopic {
  id: string;
  name: string;
  iconName: string;
  gradeLevel: string;
  colorClass: string;
  bgClass: string;
}

export interface LessonCardData {
  id: string;
  title: string;
  subject: string;
  grade: string;
  durationMinutes: number;
  gemReward: number;
  progressPercent: number;
  imageUrl: string;
  downloaded: boolean;
  fileSizeBytes: number;
  contentType: 'video' | 'text' | 'audio' | 'quiz';
}

export interface QuizQuestionOption {
  id: string;
  text: string;
  textVernacular?: string;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  questionTextVernacular: string;
  englishTranslation: string;
  options: QuizQuestionOption[];
  correctOptionId: string;
  explanation: string;
  difficultyLevel: 1 | 2 | 3 | 4 | 5; // 1: Easy, 3: Medium, 5: Hard
  topic: string;
}

export interface LeaderboardStudent {
  rank: number;
  name: string;
  score: number;
  avatarUrl: string;
  trend: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

export interface AtRiskStudent {
  id: string;
  name: string;
  studentId: string;
  riskScore: number; // e.g. 78% Risk
  trend: 'down' | 'flat' | 'up';
  notes: string;
  avatarUrl: string;
  grade: string;
  struggleConcept: string;
}

export interface TopicGap {
  topicName: string;
  masteryPercent: number;
  status: 'critical' | 'warning' | 'on-track';
}

export interface InterventionAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionText: string;
  type: 'message' | 'remedial' | 'difficulty';
}

export interface DownloadItem {
  id: string;
  title: string;
  subject: string;
  grade: string;
  fileType: 'Video (WebP/MP4)' | 'ePub / Text' | 'Audio Note';
  sizeMB: number;
  downloadDate: string;
  isDownloaded: boolean;
  progress: number;
}

export interface AvatarItem {
  id: string;
  name: string;
  imageUrl: string;
  unlocked: boolean;
  costGems: number;
}
