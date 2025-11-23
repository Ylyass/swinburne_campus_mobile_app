"use client";

import { useEffect } from "react";

type Theme = "system" | "light" | "dark";
type TextSize = "normal" | "large";
type Contrast = "normal" | "high";

function resolveTheme(pref: Theme): "light" | "dark" {
  if (pref === "system" && typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return pref === "system" ? "light" : pref;
}

function apply(theme: "light" | "dark", text: TextSize, contrast: Contrast) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("a11y-text-large", text === "large");
  root.classList.toggle("a11y-contrast-high", contrast === "high");
}

function setThemeColorMeta(isDark: boolean) {
  let el = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = "theme-color";
    document.head.appendChild(el);
  }
  el.content = isDark ? "#0b1220" : "#ffffff";
}

export default function AppearanceClient(props?: {
  themePref?: Theme;
  textSize?: TextSize;
  contrast?: Contrast;
}) {
  const { themePref, textSize, contrast } = props ?? {};

  useEffect(() => {
    // Helper that reads current prefs (from props → localStorage) and applies them.
    const readAndApply = () => {
      const effectiveThemePref =
        themePref ??
        ((localStorage.getItem("profile_theme") as Theme) ??
          (localStorage.getItem("guest_theme") as Theme) ??
          "system");

      const effectiveText =
        (textSize ?? (localStorage.getItem("a11y_text") as TextSize) ?? "normal") as TextSize;

      const effectiveContrast =
        (contrast ?? (localStorage.getItem("a11y_contrast") as Contrast) ?? "normal") as Contrast;

      const resolved = resolveTheme(effectiveThemePref);
      apply(resolved, effectiveText, effectiveContrast);
      setThemeColorMeta(resolved === "dark");

      return { effectiveThemePref };
    };

    // Initial apply
    let { effectiveThemePref } = readAndApply();

    // --- Storage sync across tabs / components
    const onStorage = (e: StorageEvent) => {
      if (!e.key) return;
      if (["profile_theme", "guest_theme", "a11y_text", "a11y_contrast"].includes(e.key)) {
        ({ effectiveThemePref } = readAndApply());
      }
    };
    window.addEventListener("storage", onStorage);

    // --- Live update when OS theme changes (only if pref is "system")
    const cleanups: Array<() => void> = [() => window.removeEventListener("storage", onStorage)];

    const attachMatchMedia = () => {
      if (effectiveThemePref !== "system") return;
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => readAndApply();
      mq.addEventListener?.("change", onChange);
      mq.addListener?.(onChange); // Safari < 14
      cleanups.push(() => {
        mq.removeEventListener?.("change", onChange);
        mq.removeListener?.(onChange);
      });
    };
    attachMatchMedia();

    // Cleanup all listeners
    return () => cleanups.forEach((fn) => fn());
  }, [themePref, textSize, contrast]);

  return null;
}
