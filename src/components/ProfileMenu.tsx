"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

function useIsAdmin() {
  return useMemo(() => {
    if (process.env.NEXT_PUBLIC_IS_ADMIN === "1") return true;
    const c = typeof document !== "undefined" ? document.cookie : "";
    const role = c.split("; ").find(x => x.startsWith("role="))?.split("=")[1];
    return role === "admin";
  }, []);
}

type Props = {
  children?: ReactNode;          // your existing avatar icon
  className?: string;            // keep the same button style
  srLabel?: string;
};

export default function ProfileMenu({ children, className = "", srLabel = "Open account menu" }: Props) {
  const [open, setOpen] = useState(false);
  const isAdmin = useIsAdmin();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    function onClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (btnRef.current && !btnRef.current.contains(t)) {
        const m = document.getElementById("profile-menu");
        if (m && !m.contains(t)) setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("mousedown", onClick); };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`grid h-10 w-10 place-content-center rounded-full ${className}`}
      >
        <span className="sr-only">{srLabel}</span>
        {children ?? <span aria-hidden>👤</span>}
      </button>

      {open && (
        <div
          id="profile-menu"
          role="menu"
          className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
        >
          <div className="px-3 py-2 text-xs text-slate-500">Account</div>

          <Link href="/profile"  className="block px-3 py-2 text-sm hover:bg-slate-50" role="menuitem">Profile</Link>
          <Link href="/settings" className="block px-3 py-2 text-sm hover:bg-slate-50" role="menuitem">Settings</Link>

          {isAdmin && (
            <>
              <div className="my-1 border-t border-slate-200" />
              <Link href="/admin" className="block px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50" role="menuitem">
                Admin Console
              </Link>
            </>
          )}

          <div className="my-1 border-t border-slate-200" />
          <button disabled className="block w-full cursor-not-allowed px-3 py-2 text-left text-sm text-slate-400" role="menuitem">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
