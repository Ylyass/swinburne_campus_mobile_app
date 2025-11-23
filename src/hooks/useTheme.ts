"use client";

import { useEffect, useState } from "react";
import { themeStore, type Theme, type ThemeState } from "@/lib/theme";

export function useTheme() {
  const [themeState, setThemeState] = useState<ThemeState>(themeStore.getState());

  useEffect(() => {
    const unsubscribe = themeStore.subscribe(setThemeState);
    return () => {
      unsubscribe();
    };
  }, []);

  const setTheme = (theme: Theme) => {
    themeStore.setTheme(theme);
  };

  return {
    theme: themeState.theme,
    resolvedTheme: themeState.resolvedTheme,
    setTheme
  };
}
