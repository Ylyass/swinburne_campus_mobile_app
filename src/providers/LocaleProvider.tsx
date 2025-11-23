"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type TimeFormat = '12h' | '24h';
export type DateFormat = 'short' | 'long';
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface LocaleSettings {
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
  temperatureUnit: TemperatureUnit;
}

interface LocaleContextType {
  settings: LocaleSettings;
  updateSettings: (updates: Partial<LocaleSettings>) => void;
  isLoaded: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const defaultSettings: LocaleSettings = {
  timeFormat: '12h',
  dateFormat: 'short',
  temperatureUnit: 'celsius'
};

// Load settings synchronously on client to prevent hydration mismatch
function getInitialSettings(): LocaleSettings {
  if (typeof window === 'undefined') return defaultSettings;
  
  try {
    const stored = localStorage.getItem('swin-app-locale-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultSettings, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load locale settings:', error);
  }
  return defaultSettings;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Initialize with the same value on both server and client
  const [settings, setSettings] = useState<LocaleSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load actual stored settings after mount (hydration complete)
    const storedSettings = getInitialSettings();
    setSettings(storedSettings);
    setIsLoaded(true);
  }, []);

  const updateSettings = (updates: Partial<LocaleSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    
    try {
      localStorage.setItem('swin-app-locale-settings', JSON.stringify(newSettings));
    } catch (error) {
      console.warn('Failed to save locale settings:', error);
    }
  };

  return (
    <LocaleContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
