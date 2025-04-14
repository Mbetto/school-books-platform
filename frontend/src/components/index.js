// Layout Components
export { default as Layout } from './layout/Layout';
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';
export { default as Sidebar } from './layout/Sidebar';
export { default as Navigation } from './layout/Navigation';
export { default as Loader } from './layout/Loader';
export { default as MobileNavigation } from './layout/MobileNavigation';
export { default as SearchBar } from './layout/SearchBar';

// UI Components
export { default as Button } from './ui/Button/Button';
export { default as Input } from './ui/Input/Input';
export { default as Card } from './ui/Card/Card';
export { default as Modal } from './ui/Modal/Modal';
export { default as Alert } from './ui/Alert/Alert';
export { default as Icon } from './ui/Icon';
export { default as FilterDropdown } from './ui/FilterDropdown';
export { default as LoadingSpinner } from './ui/LoadingSpinner';

// Feature Components
export { default as ErrorBoundary } from './ErrorBoundary'; // Moved to its own folder
export { default as ChatBot } from './ai/ChatBot';
export { default as HomeworkHelper } from './ai/HomeworkHelper';
export { default as LoginForm } from './auth/LoginForm';
export { default as RegisterForm } from './auth/RegisterForm';
export { default as BookCard } from './books/BookCard';
export { default as BookGrid } from './books/BookGrid';
export { default as BookPreview } from './books/BookPreview';
export { default as WatermarkPDF } from './books/WatermarkPDF';
export { default as Badges } from './gamification/Badges';
export { default as Leaderboard } from './gamification/Leaderboard';
export { default as Quiz } from './gamification/Quiz';
export { default as QuizWidget } from './gamification/QuizWidget';

// src/context/index.js
export * from './ThemeContext';
export * from './AuthContext';
export * from './TutorContext';
export * from './GamificationContext';