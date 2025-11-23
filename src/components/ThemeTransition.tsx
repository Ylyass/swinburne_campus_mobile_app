"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeTransition() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Re-enable transitions after theme is loaded
    const timer = setTimeout(() => {
      document.documentElement.style.transition = "background-color 0.3s ease, color 0.3s ease";
    }, 100);

    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  return null;
}



