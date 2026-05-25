import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@HolaMundoApp:theme';
const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    background: '#F5F0E8',
    surface: '#FFFFFF',
    primary: '#2D6A4F',
    accent: '#F4A261',
    text: '#1B1B1B',
    textSecondary: '#5A5A5A',
    textMuted: '#9A9A9A',
    border: '#E8E0D0',
    inputBg: '#F9F5EE',
    card: '#FDFAF5',
    toggleBg: '#D4E8DC',
    toggleLabel: 'Cambiar a Oscuro',
    statusBar: 'dark',
  },
  dark: {
    name: 'dark',
    background: '#0D1117',
    surface: '#161B22',
    primary: '#58A6FF',
    accent: '#F78166',
    text: '#E6EDF3',
    textSecondary: '#8B949E',
    textMuted: '#484F58',
    border: '#30363D',
    inputBg: '#0D1117',
    card: '#1C2128',
    toggleBg: '#1C2128',
    toggleLabel: 'Cambiar a Claro',
    statusBar: 'light',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved !== null) setIsDark(saved === 'dark');
      } catch (e) {
        console.warn('Error cargando tema:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    try {
      await AsyncStorage.setItem(THEME_KEY, newValue ? 'dark' : 'light');
    } catch (e) {
      console.warn('Error guardando tema:', e);
    }
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return context;
};