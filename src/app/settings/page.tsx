"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "@/providers/LocaleProvider";
import { notificationManager } from "@/lib/NotificationManager";

// Toast component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900 text-white text-sm rounded-full shadow-lg backdrop-blur-sm">
      {message}
    </div>
  );
}

// Glass card component
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// Toggle component
function Toggle({ 
  checked, 
  onChange, 
  disabled = false 
}: { 
  checked: boolean; 
  onChange: (checked: boolean) => void; 
  disabled?: boolean;
}) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
      // Haptic feedback (client-only)
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? 'bg-blue-600' : 'bg-slate-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// Slider component - hydration-safe
function Slider({ 
  value, 
  options, 
  onChange,
  mounted = true
}: { 
  value: string; 
  options: { value: string; label: string }[]; 
  onChange: (value: string) => void;
  mounted?: boolean;
}) {
  const currentIndex = options.findIndex(opt => opt.value === value);
  
  return (
    <div className="flex bg-slate-100 rounded-xl p-1">
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            mounted && index === currentIndex
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          suppressHydrationWarning
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Bottom sheet component
function BottomSheet({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" style={{ overscrollBehavior: 'contain' }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div 
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-[1.25rem] shadow-2xl overflow-y-auto"
        style={{ 
          maxHeight: 'calc(80vh - env(safe-area-inset-bottom))',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
          overscrollBehavior: 'contain'
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  // Stable initial state for hydration
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { settings: localeSettings, updateSettings: updateLocaleSettings } = useLocale();
  const [notificationSettings, setNotificationSettings] = useState(notificationManager.getSettings());
  const [toast, setToast] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [textSize, setTextSize] = useState<'small' | 'default' | 'large'>('default');

  // Load client-only state after mount
  useEffect(() => {
    setMounted(true);
    
    // Check if app is installed
    if (typeof window !== 'undefined') {
      setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);
    }

    // Load text size from localStorage
    if (typeof window !== 'undefined') {
      const storedTextSize = localStorage.getItem('swin-app-text-size') as 'small' | 'default' | 'large' | null;
      if (storedTextSize) {
        setTextSize(storedTextSize);
      }
    }

    // Subscribe to notification settings changes
    const unsubscribe = notificationManager.subscribe(setNotificationSettings);
    return () => {
      unsubscribe();
    };
  }, []);

  // Apply text size changes
  useEffect(() => {
    if (!mounted) return;
    
    const html = document.documentElement;
    html.style.setProperty('--text-scale', 
      textSize === 'small' ? '0.875' : 
      textSize === 'large' ? '1.125' : '1'
    );
    if (typeof window !== 'undefined') {
      localStorage.setItem('swin-app-text-size', textSize);
    }
  }, [textSize, mounted]);

  const showToast = (message: string) => {
    setToast(message);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    showToast("Theme updated");
  };

  const handleLocaleChange = (updates: Partial<typeof localeSettings>) => {
    updateLocaleSettings(updates);
    showToast("Preferences saved");
  };

  const handleTextSizeChange = (newSize: string) => {
    setTextSize(newSize as 'small' | 'default' | 'large');
    showToast("Text size updated");
  };

  const handleNotificationChange = (updates: Partial<typeof notificationSettings>) => {
    notificationManager.updateSettings(updates);
    showToast("Notification settings updated");
  };

  const handleReset = () => {
    if (typeof window === 'undefined') return;
    
    // Reset all settings
    localStorage.clear();
    setTheme('system');
    setTextSize('default');
    notificationManager.updateSettings({
      eventReminders: false,
      announcements: false,
      reminderLeadTime: 30
    });
    setShowResetConfirm(false);
    showToast("App data reset");
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleInstallApp = async () => {
    if (isInstalled) {
      // Open the app
      window.location.href = '/';
      return;
    }

    // Check if browser supports PWA installation
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      try {
        // This would typically be handled by a PWA install prompt
        // For now, show the help sheet
        setShowInstallHelp(true);
      } catch (error) {
        console.error('Installation failed:', error);
        showToast("Installation not supported");
      }
    } else {
      setShowInstallHelp(true);
    }
  };

  const handleNotificationPermission = async () => {
    try {
      const permission = await notificationManager.requestPermission();
      if (permission === 'granted') {
        showToast("Notifications enabled");
        handleNotificationChange({ eventReminders: true, announcements: true });
      } else {
        showToast("Notification permission denied");
      }
    } catch {
      showToast("Notifications not supported");
    }
  };

  const formatCacheSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const copyLogs = () => {
    if (typeof window === 'undefined') return;
    
    const logs = JSON.stringify({
      browser: navigator.userAgent.split(' ').pop() || 'Unknown',
      os: navigator.platform,
      theme: theme || 'system',
      textSize: textSize,
      notifications: notificationSettings.eventReminders || notificationSettings.announcements
    }, null, 2);
    
    navigator.clipboard.writeText(logs);
    showToast("Logs copied to clipboard");
  };

  // Use stable theme value until mounted
  const displayTheme = mounted ? (theme || 'system') : 'system';

  // Show minimal skeleton until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="bg-white/80 backdrop-blur-lg border-b border-white/20">
          <div className="maxw container-px py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-lg">⚙️</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
                <p className="text-sm text-slate-600">Loading...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="maxw container-px py-6 space-y-6">
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-sm p-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="maxw container-px py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-lg">⚙️</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
              <p className="text-sm text-slate-600">Customize your experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="maxw container-px py-6 space-y-6">
        {/* Appearance */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
              <Slider
                value={displayTheme}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'system', label: 'Match device' }
                ]}
                onChange={handleThemeChange}
                mounted={mounted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Text Size</label>
              <Slider
                value={textSize}
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'default', label: 'Default' },
                  { value: 'large', label: 'Large' }
                ]}
                onChange={handleTextSizeChange}
                mounted={mounted}
              />
            </div>
          </div>
        </GlassCard>

        {/* Regional Settings */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Regional Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Time Format</label>
              <Slider
                value={localeSettings.timeFormat}
                options={[
                  { value: '12h', label: '12-hour' },
                  { value: '24h', label: '24-hour' }
                ]}
                onChange={(value) => handleLocaleChange({ timeFormat: value as '12h' | '24h' })}
                mounted={mounted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
              <Slider
                value={localeSettings.dateFormat}
                options={[
                  { value: 'short', label: '21/10' },
                  { value: 'long', label: 'Mon 21 Oct' }
                ]}
                onChange={(value) => handleLocaleChange({ dateFormat: value as 'short' | 'long' })}
                mounted={mounted}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Temperature</label>
              <Slider
                value={localeSettings.temperatureUnit}
                options={[
                  { value: 'celsius', label: '°C' },
                  { value: 'fahrenheit', label: '°F' }
                ]}
                onChange={(value) => handleLocaleChange({ temperatureUnit: value as 'celsius' | 'fahrenheit' })}
                mounted={mounted}
              />
            </div>
          </div>
        </GlassCard>

        {/* Notifications & Reminders */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Notifications & Reminders</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Event reminders</div>
                <div className="text-sm text-slate-600">Get notified before events</div>
              </div>
              <Toggle
                checked={notificationSettings.eventReminders}
                onChange={(checked) => handleNotificationChange({ eventReminders: checked })}
                disabled={!notificationManager.isSupported()}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Announcements</div>
                <div className="text-sm text-slate-600">Important updates and news</div>
              </div>
              <Toggle
                checked={notificationSettings.announcements}
                onChange={(checked) => handleNotificationChange({ announcements: checked })}
                disabled={!notificationManager.isSupported()}
              />
            </div>
            {!notificationManager.isSupported() && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <div className="text-sm text-amber-800">
                  Notifications not supported in this browser
                </div>
              </div>
            )}
            {mounted && notificationManager.isSupported() && notificationManager.getPermission() === 'denied' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <div className="text-sm text-red-800 mb-2">
                  Notifications are blocked. Enable them in your browser settings.
                </div>
                <button
                  onClick={handleNotificationPermission}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Try again →
                </button>
              </div>
            )}
            {notificationSettings.eventReminders && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reminder time</label>
                <Slider
                  value={notificationSettings.reminderLeadTime.toString()}
                  options={[
                    { value: '15', label: '15 min' },
                    { value: '30', label: '30 min' },
                    { value: '60', label: '1 hour' },
                    { value: '1440', label: 'Morning of' }
                  ]}
                  onChange={(value) => handleNotificationChange({ reminderLeadTime: parseInt(value) })}
                  mounted={mounted}
                />
              </div>
            )}
          </div>
        </GlassCard>

        {/* Install App */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Install App</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900">
                {isInstalled ? 'Installed' : 'Install Swinburne App'}
              </div>
              <div className="text-sm text-slate-600">
                {isInstalled ? 'App is installed on your device' : 'Add to home screen for quick access'}
              </div>
            </div>
            <button
              onClick={handleInstallApp}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {isInstalled ? 'Open app' : 'Install'}
            </button>
          </div>
        </GlassCard>

        {/* Privacy & Data */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Privacy & Data</h2>
          <div className="space-y-4">
            <div className="text-sm text-slate-600">
              Your preferences are stored locally on this device only. No personal data is sent to our servers.
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Cache size</div>
                <div className="text-sm text-slate-600">{formatCacheSize(0)}</div>
              </div>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
              Reset app data
            </button>
          </div>
        </GlassCard>

        {/* About & Diagnostics */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">About & Diagnostics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Version</div>
                <div className="text-sm text-slate-600">1.0.0 (Build 2024.1)</div>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View changelog →
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Send feedback →
              </button>
              <button
                onClick={copyLogs}
                className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Share basic logs →
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Bottom Sheets */}
      <BottomSheet
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Reset App Data"
      >
        <div className="space-y-4">
          <p className="text-slate-600">
            This will reset all your preferences and clear cached data. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={showInstallHelp}
        onClose={() => setShowInstallHelp(false)}
        title="Install App"
      >
        <div className="space-y-4">
          <p className="text-slate-600">
            To install this app on your device:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <div>
                <div className="font-medium text-slate-900">Look for the install button</div>
                <div className="text-sm text-slate-600">In your browser&apos;s address bar or menu</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <div>
                <div className="font-medium text-slate-900">Tap &quot;Add to Home Screen&quot;</div>
                <div className="text-sm text-slate-600">Follow the prompts to complete installation</div>
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
