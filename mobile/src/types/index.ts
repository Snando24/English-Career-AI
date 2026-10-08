// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface User {
  id: string;
  email: string;
  userProfile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  professionalArea: string;
  currentLevel: string;
  learningGoal: string;
  dailyMinutes: number;
  weakAreas: string[];
  createdAt: string;
  updatedAt: string;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  professionalAreas: string[];
  difficultyLevel: string;
  modules?: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  lessons?: Lesson[];
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  contentType: 'text' | 'markdown' | 'video' | 'audio';
  estimatedMinutes: number;
  orderIndex: number;
  exercises?: Exercise[];
  createdAt: string;
  updatedAt: string;
}

// Exercise Types
export type ExerciseType = 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'FILL_BLANK' | 'OPEN_RESPONSE';

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  question: string;
  correctAnswer?: string;
  options?: ExerciseOption[];
  alternativeAnswers?: string[];
  explanation?: string;
  difficultyLevel: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseOption {
  id: string;
  text: string;
}

export interface SubmitAnswerRequest {
  answerText: string;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  score: number;
  explanation: string;
  correctAnswer: string;
}

// Progress Types
export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  lastAttempted?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAnswer {
  id: string;
  userId: string;
  exerciseId: string;
  answerText: string;
  isCorrect: boolean;
  score: number;
  explanationGiven?: string;
  attemptedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  completedExercises: number;
  totalExercises: number;
  score: number;
}

export interface UserSkills {
  id: string;
  userId: string;
  grammarScore: number;
  vocabularyScore: number;
  listeningScore: number;
  speakingScore: number;
  writingScore: number;
  technicalEnglishScore: number;
  xpTotal: number;
  streakDays: number;
  lastStudiedAt?: string;
  updatedAt: string;
}

export interface Dashboard {
  xp: number;
  streakDays: number;
  weeklyGoal: number;
  skills: UserSkills;
  recentErrors: UserError[];
  achievements: Achievement[];
}

export interface UserError {
  id: string;
  userId: string;
  errorType: string;
  category: string;
  frequency: number;
  lastSeen: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  name: string;
  description?: string;
  earnedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  status: string;
  code: number;
  message?: string;
  errors?: string[];
  timestamp: string;
  path?: string;
}

// Error Types
export interface ApiError {
  status: string;
  code: number;
  message: string;
  path?: string;
  timestamp: string;
  errors?: string[];
}
