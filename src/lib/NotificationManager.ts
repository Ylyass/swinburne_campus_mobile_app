"use client";

export interface NotificationSettings {
  eventReminders: boolean;
  announcements: boolean;
  reminderLeadTime: number; // minutes
}

class NotificationManager {
  private listeners: Set<(settings: NotificationSettings) => void> = new Set();
  private settings: NotificationSettings = {
    eventReminders: false,
    announcements: false,
    reminderLeadTime: 30
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('swin-app-notifications');
      if (stored) {
        this.settings = { ...this.settings, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load notification settings:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('swin-app-notifications', JSON.stringify(this.settings));
    } catch (error) {
      console.warn('Failed to save notification settings:', error);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.settings));
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  getPermission(): NotificationPermission {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'denied';
    return Notification.permission;
  }

  updateSettings(updates: Partial<NotificationSettings>) {
    this.settings = { ...this.settings, ...updates };
    this.saveToStorage();
    this.notifyListeners();
  }

  getSettings(): NotificationSettings {
    return { ...this.settings };
  }

  subscribe(listener: (settings: NotificationSettings) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async scheduleEventReminder(event: {
    id: string;
    title: string;
    date: string;
    venue: string;
  }) {
    if (!this.settings.eventReminders || this.getPermission() !== 'granted') {
      return;
    }

    const eventDate = new Date(event.date);
    const reminderTime = new Date(eventDate.getTime() - (this.settings.reminderLeadTime * 60 * 1000));
    const now = new Date();

    if (reminderTime <= now) {
      return; // Event is too soon
    }

    // Schedule notification
    const timeout = reminderTime.getTime() - now.getTime();
    
    setTimeout(() => {
      if (this.getPermission() === 'granted') {
        new Notification(`Event Reminder: ${event.title}`, {
          body: `Starting in ${this.settings.reminderLeadTime} minutes at ${event.venue}`,
          icon: '/favicon.ico',
          tag: `event-reminder-${event.id}`,
          requireInteraction: false
        });
      }
    }, timeout);
  }

  async sendAnnouncement(title: string, body: string) {
    if (!this.settings.announcements || this.getPermission() !== 'granted') {
      return;
    }

    new Notification(title, {
      body,
      icon: '/favicon.ico',
      tag: 'announcement',
      requireInteraction: false
    });
  }
}

export const notificationManager = new NotificationManager();
