"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

// Global state for bookmarks to ensure all components stay in sync
let globalBookmarks = new Set<string>();
const globalListeners = new Set<() => void>();
let globalBookmarksLoaded = false;

// Load from localStorage on first access
function loadGlobalBookmarks() {
  if (!globalBookmarksLoaded && typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("bookmarks");
      if (raw) {
        globalBookmarks = new Set(JSON.parse(raw) as string[]);
      }
      globalBookmarksLoaded = true;
    } catch {}
  }
}

// Persist to localStorage
function persistBookmarks() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("bookmarks", JSON.stringify([...globalBookmarks]));
    } catch {}
  }
}

// Notify all listeners of changes
function notifyListeners() {
  globalListeners.forEach(listener => listener());
}

/** Client-only bookmark store backed by localStorage with global state sync. */
export function useBookmarks() {
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [setStore, setSetStore] = useState<Set<string>>(new Set());

  // load on mount
  useEffect(() => {
    loadGlobalBookmarks();
    setMounted(true);
    setSetStore(new Set(globalBookmarks));
    setReady(true);
  }, []);

  // Subscribe to global changes
  useEffect(() => {
    const listener = () => {
      setSetStore(new Set(globalBookmarks));
    };
    globalListeners.add(listener);
    return () => {
      globalListeners.delete(listener);
    };
  }, []);

  const isSaved = useCallback((id: string) => setStore.has(id), [setStore]);

  const toggle = useCallback((id: string) => {
    const wasSaved = globalBookmarks.has(id);
    if (wasSaved) {
      globalBookmarks.delete(id);
    } else {
      globalBookmarks.add(id);
    }
    persistBookmarks();
    notifyListeners();
  }, []);

  /** compatibility fields your code expects */
  const map = mounted ? setStore : new Set<string>();                 // Set<string>
  const ids = useMemo(() => mounted ? [...setStore] : [], [setStore, mounted]); // string[] with .length

  return { ready, mounted, isSaved, toggle, map, ids };
}

export default useBookmarks;
