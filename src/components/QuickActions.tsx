"use client";
import Link from "next/link";

const items = [
  { href: "/emergency", label: "Emergency", icon: "🚨", accent: "bg-red-50 text-red-700 border-red-200" },
  { href: "/maps",      label: "Navigate",  icon: "🗺️", accent: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { href: "/support",   label: "Support",   icon: "💬", accent: "bg-sky-50 text-sky-700 border-sky-200" },
  { href: "/events",    label: "Events",    icon: "📅", accent: "bg-amber-50 text-amber-700 border-amber-200" },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={`rounded-xl border px-4 py-3 text-sm font-medium flex items-center gap-2 justify-center shadow ${it.accent}
                      hover:brightness-105 transition`}
        >
          <span aria-hidden className="text-base">{it.icon}</span>
          <span>{it.label}</span>
        </Link>
      ))}
    </div>
  );
}
