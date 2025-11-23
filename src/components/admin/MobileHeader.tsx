"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MobileHeader() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);


  // ⌘K / Ctrl-K focuses the search; "/" also focuses if not typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const metaK = (e.key.toLowerCase() === "k") && (e.metaKey || e.ctrlKey);
      const slash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey;
      if (metaK || slash) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur sm:hidden">
      <div className="px-3 py-2">
        {/* Search bar */}


        {/* Quick links row */}
        <nav aria-label="Admin quick links" className="mt-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link href="/admin"          className="chip whitespace-nowrap">Overview</Link>
          <Link href="/admin/banners"  className="chip whitespace-nowrap">Banners</Link>
          <Link href="/admin/services" className="chip whitespace-nowrap">Services</Link>
          <Link href="/admin/incidents"className="chip whitespace-nowrap">Incidents</Link>

          {/* Notifications button (light UI) */}
          <button
            type="button"
            aria-label="Notifications"
            className="ml-auto relative rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm active:scale-[.98]"
            onClick={() => router.push("/admin/notifications")}
          >
            <span className="pr-3">Notifications</span>
            <span
              aria-hidden
              className="absolute right-1 top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-[var(--brand)] px-1 text-[11px] font-semibold text-white"
            >
              2
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
