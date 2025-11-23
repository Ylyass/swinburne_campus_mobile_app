"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import ProfileGuest from "./ProfileGuest";
import ProfileSignedIn, { type Session } from "./ProfileSignedIn";
import type { Role, Workspace } from "./ProfileUI";

const DevSwitches = dynamic(() => import("@/components/DevSwitches"), { ssr: false });

/* hooks */
function useLocalStorage<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal] as const;
}
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.*+?^${}()|[\\]\\\\])/g, "\\$1") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}
function readUserFromCookie(): { name: string; email: string; campusId: string; roles: Role[] } | null {
  if (typeof document === "undefined") return null;
  try {
    const raw = getCookie("user"); if (!raw) return null;
    const u = JSON.parse(raw);
    const rolesOk: Role[] = Array.isArray(u.roles) ? u.roles.filter((r: string) => ["student","staff","admin"].includes(r)) : ["student"];
    return { name: u.name || "Student", email: u.email || "", campusId: u.campusId || "", roles: rolesOk.length ? rolesOk : ["student"] };
  } catch { return null; }
}

/* page */
export default function ProfileClient() {
  // guest prefs
  const [guestTheme, setGuestTheme] = useLocalStorage<"system" | "light" | "dark">("guest_theme", "system");
  const [guestLang, setGuestLang] = useLocalStorage("guest_lang", "English");

  // session bootstrap
  const bootstrap = useMemo(() => readUserFromCookie(), []);
  const [session, setSession] = useState<Session>({
    signedIn: !!bootstrap,
    name: bootstrap?.name ?? "Guest",
    email: bootstrap?.email ?? "",
    avatar: null,
    campusId: bootstrap?.campusId ?? "",
    roles: (bootstrap?.roles ?? []) as Role[],
    workspace: ((bootstrap?.roles ?? ["student"])[0]) as Workspace,
  });

  // profile prefs
  const [language, setLanguage] = useLocalStorage("profile_lang", "English");
  const [theme, setTheme] = useLocalStorage<"system" | "light" | "dark">("profile_theme", "system");
  const [notificationsEmail, setNotificationsEmail] = useLocalStorage("notif_email", true);
  const [notificationsPush, setNotificationsPush] = useLocalStorage("notif_push", true);
  const [accessibilityText, setAccessibilityText] = useLocalStorage<"normal" | "large">("a11y_text", "normal");
  const [accessibilityContrast, setAccessibilityContrast] = useLocalStorage<"normal" | "high">("a11y_contrast", "normal");
  const [twoFA, setTwoFA] = useLocalStorage("two_fa", false);

  // avatar preview
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  function onPickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const url = URL.createObjectURL(f);
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    setAvatarUrl(url);
    setSession((s) => ({ ...s, avatar: url }));
  }
  useEffect(() => () => { if (avatarUrl) URL.revokeObjectURL(avatarUrl); }, [avatarUrl]);

  function handleSignOut() {
    if (typeof document !== "undefined") {
      document.cookie = "auth=; Max-Age=0; path=/";
      document.cookie = "user=; Max-Age=0; path=/";
    }
    setSession((s) => ({ ...s, signedIn: false, roles: [], workspace: "student", avatar: null, name: "Guest", email: "", campusId: "" }));
  }

  return (
    <>
      {session.signedIn ? (
        <ProfileSignedIn
          session={session} setSession={setSession}
          theme={theme} setTheme={setTheme}
          language={language} setLanguage={setLanguage}
          notificationsEmail={notificationsEmail} setNotificationsEmail={setNotificationsEmail}
          notificationsPush={notificationsPush} setNotificationsPush={setNotificationsPush}
          accessibilityText={accessibilityText} setAccessibilityText={setAccessibilityText}
          accessibilityContrast={accessibilityContrast} setAccessibilityContrast={setAccessibilityContrast}
          twoFA={twoFA} setTwoFA={setTwoFA}
          avatarUrl={avatarUrl} onPickAvatar={onPickAvatar} fileInputRef={fileInputRef}
          handleSignOut={handleSignOut}
        />
      ) : (
        <ProfileGuest
          guestTheme={guestTheme} setGuestTheme={setGuestTheme}
          guestLang={guestLang} setGuestLang={setGuestLang}
        />
      )}
      <DevSwitches />
    </>
  );
}
