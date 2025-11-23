"use client";

export type TextSize = 'small' | 'default' | 'large';
export type TimeFormat = '12h' | '24h';
export type DateFormat = 'short' | 'long';
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface SettingsState {
  // Appearance
  textSize: TextSize;
  
  // Language & Region
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
  temperatureUnit: TemperatureUnit;
  
  // Notifications
  eventReminders: boolean;
  announcements: boolean;
  reminderLeadTime: number; // minutes
  
  // Privacy
  cacheSize: number; // bytes
}

class SettingsStore {
  private listeners: Set<(state: SettingsState) => void> = new Set();
  private state: SettingsState = {
    textSize: 'default',
    timeFormat: '12h',
    dateFormat: 'short',
    temperatureUnit: 'celsius',
    eventReminders: false,
    announcements: false,
    reminderLeadTime: 30,
    cacheSize: 0
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
      this.updateCacheSize();
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('swin-app-settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.state = { ...this.state, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load settings from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('swin-app-settings', JSON.stringify(this.state));
    } catch (error) {
      console.warn('Failed to save settings to storage:', error);
    }
  }

  private updateCacheSize() {
    try {
      if ('caches' in window) {
        caches.keys().then(keys => {
          Promise.all(keys.map(key => caches.open(key).then(cache => cache.keys())))
            .then(requests => {
              const totalSize = requests.flat().length * 1000; // Rough estimate
              this.state.cacheSize = totalSize;
              this.notifyListeners();
            });
        });
      }
    } catch (error) {
      console.warn('Failed to calculate cache size:', error);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  updateSettings(updates: Partial<SettingsState>) {
    this.state = { ...this.state, ...updates };
    this.saveToStorage();
    this.notifyListeners();
  }

  getState(): SettingsState {
    return { ...this.state };
  }

  subscribe(listener: (state: SettingsState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  reset() {
    this.state = {
      textSize: 'default',
      timeFormat: '12h',
      dateFormat: 'short',
      temperatureUnit: 'celsius',
      eventReminders: false,
      announcements: false,
      reminderLeadTime: 30,
      cacheSize: 0
    };
    this.saveToStorage();
    this.notifyListeners();
  }
}

export const settingsStore = new SettingsStore();

