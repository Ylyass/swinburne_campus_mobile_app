// src/components/admin/AdminBottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Admin tabs (same visual style as public bottom nav)
const LEFT = [
  { href: "/admin",          label: "Home",     icon: "🏠" },
  { href: "/admin/services", label: "Services", icon: "🗂️" },
] as const;

const RIGHT = [
  { href: "/admin/banners",   label: "Banners",   icon: "📣" },
  { href: "/admin/incidents", label: "Incidents", icon: "🚦" },
] as const;

// Admin quick actions opened by the center FAB
const ACTIONS = [
  { href: "/admin/banners",   label: "New banner",      icon: "📝" },
  { href: "/admin/incidents", label: "Report incident", icon: "⚠️" },
  { href: "/admin/services",  label: "Add service",     icon: "➕" },
  { href: "/admin/incidents", label: "Maintenance",     icon: "🛠️" },
  { href: "/admin/services",  label: "Edit taxonomy",   icon: "🏷️" },
  { href: "/admin/logs",      label: "View logs",       icon: "📜" },
  { href: "/admin/users",     label: "Manage users",    icon: "👥" },
  { href: "/admin/reports",   label: "Reports",         icon: "📈" },
] as const;

export default function AdminBottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // lock page scroll when sheet is open (keeps hook order stable)
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = open ? "hidden" : prev;
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200
                   bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70
                   shadow-[0_-1px_0_rgba(2,6,23,.06),0_-8px_32px_rgba(2,6,23,.08)]
                   pb-[max(8px,env(safe-area-inset-bottom))]"
        role="navigation"
        aria-label="Admin primary"
      >
        <div className="relative mx-auto flex h-16 max-w-screen-lg items-center justify-between px-4">
          {/* left cluster */}
          <div className="flex gap-2 md:gap-3">
            {LEFT.map((t) => {
              const active = isActive(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative grid place-items-center rounded-xl px-3 py-1 text-sm transition
                    ${active
                      ? "text-[var(--brand)] font-semibold bg-[color-mix(in_oklab,var(--brand)_10%,transparent)]"
                      : "text-slate-700 hover:bg-slate-50"}`}
                >
                  <span aria-hidden className="text-[18px] leading-none">{t.icon}</span>
                  <span className="mt-0.5">{t.label}</span>
                  {active && (
                    <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-[var(--brand)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* right cluster */}
          <div className="flex gap-2 md:gap-3">
            {RIGHT.map((t) => {
              const active = isActive(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative grid place-items-center rounded-xl px-3 py-1 text-sm transition
                    ${active
                      ? "text-[var(--brand)] font-semibold bg-[color-mix(in_oklab,var(--brand)_10%,transparent)]"
                      : "text-slate-700 hover:bg-slate-50"}`}
                >
                  <span aria-hidden className="text-[18px] leading-none">{t.icon}</span>
                  <span className="mt-0.5">{t.label}</span>
                  {active && (
                    <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-[var(--brand)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* center FAB – uses brand red like public nav */}
          <button
            aria-label="Open admin services"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-5
                       grid h-16 w-16 place-items-center rounded-full
                       bg-[var(--brand)] text-white shadow-xl ring-4 ring-white
                       hover:scale-105 active:scale-95 transition"
          >
            <span className="text-2xl">💠</span>
          </button>
        </div>
      </nav>

      {/* Quick actions sheet — bottom on mobile, centered on desktop */}
      {open && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden />
          <section
            className="absolute inset-x-0 bottom-0 max-h-[85%] rounded-t-3xl bg-white p-4 shadow-2xl
                       md:inset-auto md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[80vh]
                       md:w-[720px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl"
            role="dialog" aria-modal="true" aria-label="Admin services"
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200 md:hidden" />
            <header className="mt-2 mb-2 flex items-center justify-between">
              <h3 className="text-base font-semibold">Admin services</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg px-2 py-1 text-sm underline">
                Close
              </button>
            </header>

            <div className="grid grid-cols-4 gap-3 md:grid-cols-6 overflow-auto pb-20 md:pb-0">
              {ACTIONS.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  onClick={() => setOpen(false)}
                  className="grid place-items-center gap-1 rounded-xl border border-slate-200
                             bg-white px-3 py-3 text-center text-xs shadow-sm active:scale-[.99]"
                >
                  <span aria-hidden className="text-lg">{a.icon}</span>
                  <span className="leading-tight">{a.label}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
