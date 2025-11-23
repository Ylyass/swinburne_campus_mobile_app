"use client";
import { useEffect } from "react";

export default function ForceLight() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");              // stop global dark overrides
    try {
      localStorage.setItem("profile_theme", "light");
      localStorage.setItem("guest_theme", "light");
    } catch {}
  }, []);
  return null;
}
