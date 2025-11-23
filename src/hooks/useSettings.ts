"use client";

import { useEffect, useState } from "react";
import { settingsStore, type SettingsState } from "@/lib/settings";

export function useSettings() {
  const [settingsState, setSettingsState] = useState<SettingsState>(settingsStore.getState());

  useEffect(() => {
    const unsubscribe = settingsStore.subscribe(setSettingsState);
    return () => {
      unsubscribe();
    };
  }, []);

  const updateSettings = (updates: Partial<SettingsState>) => {
    settingsStore.updateSettings(updates);
  };

  const resetSettings = () => {
    settingsStore.reset();
  };

  return {
    settings: settingsState,
    updateSettings,
    resetSettings
  };
}
