"use client";

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
}

class ThemeStore {
  private listeners: Set<(state: ThemeState) => void> = new Set();
  private state: ThemeState = {
    theme: 'system',
    resolvedTheme: 'light'
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
      this.updateResolvedTheme();
      this.listenToSystemTheme();
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('swin-app-theme');
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        this.state.theme = stored as Theme;
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    }
  }

  private saveToStorage(theme: Theme) {
    try {
      localStorage.setItem('swin-app-theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  }

  private updateResolvedTheme() {
    if (this.state.theme === 'system') {
      this.state.resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      this.state.resolvedTheme = this.state.theme;
    }
    this.applyTheme();
  }

  private applyTheme() {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(this.state.resolvedTheme);
  }

  private listenToSystemTheme() {
    if (this.state.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => {
        this.updateResolvedTheme();
        this.notifyListeners();
      };
      mediaQuery.addEventListener('change', handler);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  setTheme(theme: Theme) {
    this.state.theme = theme;
    this.saveToStorage(theme);
    this.updateResolvedTheme();
    this.notifyListeners();
  }

  getState(): ThemeState {
    return { ...this.state };
  }

  subscribe(listener: (state: ThemeState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const themeStore = new ThemeStore();

