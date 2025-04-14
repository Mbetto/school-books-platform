import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme, isSystemDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`theme-toggle ${theme}`}
      data-testid="theme-toggle"
      type="button"
    >
      <span className="theme-toggle-icons">
        <span className="sun-icon" aria-hidden="true">☀️</span>
        <span className="moon-icon" aria-hidden="true">🌙</span>
      </span>
      <span className="visually-hidden">
        Current mode: {theme} (System prefers: {isSystemDark ? 'dark' : 'light'})
      </span>
    </button>
  );
}