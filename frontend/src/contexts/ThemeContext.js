import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [storedTheme, setStoredTheme] = useLocalStorage('school_books_theme', 'light');
  const [theme, setTheme] = useState(storedTheme);
  const [isSystemDark, setIsSystemDark] = useState(false);

  const updateSystemPreference = useCallback(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsSystemDark(prefersDark);
    if (!storedTheme && prefersDark) {
      setTheme('dark');
    }
  }, [storedTheme]);

  useEffect(() => {
    updateSystemPreference();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateSystemPreference);
    return () => mediaQuery.removeEventListener('change', updateSystemPreference);
  }, [updateSystemPreference]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-theme', theme === 'dark');
    setStoredTheme(theme);
  }, [theme, setStoredTheme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setDarkMode = useCallback((isDark) => {
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme,
      isDarkMode: theme === 'dark',
      isSystemDark,
      toggleTheme,
      setTheme,
      setDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};