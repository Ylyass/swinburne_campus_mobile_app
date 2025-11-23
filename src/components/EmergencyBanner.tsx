"use client";

import { Phone } from "lucide-react";

type Props = {
  phone: string;                   // e.g. "082-260-607"
  context?: string;                // e.g. "Security: 24/7"
  variant?: "default" | "smart";   // "smart" = frosted look
  showContext?: boolean;           // allow hiding the chip to avoid duplication
};

export default function EmergencyBanner({
  phone,
  context = "Security: 24/7",
  variant = "default",
  showContext = true,
}: Props) {
  const tel = `tel:${phone.replace(/[^0-9]/g, "")}`;

  if (variant === "smart") {
    return (
      <div className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-sm ring-1 ring-black/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <span aria-hidden>🚨</span>
          <p className="flex-1 text-sm text-rose-900">
            Need urgent help? Call Campus Security{" "}
            <a className="underline font-semibold" href={tel}>{phone}</a>.
          </p>
          {showContext && (
            <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 text-xs">
              <span className="inline-block size-1.5 rounded-full bg-current" /> {context}
            </span>
          )}
          <a
            href={tel}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-white
                       bg-gradient-to-b from-rose-500 to-rose-600 shadow-sm ring-1 ring-rose-600/20
                       hover:from-rose-500 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/40 transition"
          >
            <Phone className="h-4 w-4" />
            Call now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div role="note" aria-label="Emergency notice"
         className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
      <div className="flex items-center gap-3">
        <span aria-hidden>🚨</span>
        <p className="flex-1">
          Need urgent help? Call Campus Security{" "}
          <a className="underline font-semibold" href={tel}>{phone}</a> — available 24/7.
        </p>
        <a
          href={tel}
          className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-white
                     bg-gradient-to-b from-rose-500 to-rose-600 shadow-sm ring-1 ring-rose-600/20
                     hover:from-rose-500 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/40 transition"
        >
          <Phone className="h-4 w-4" />
          Call now
        </a>
      </div>
    </div>
  );
}
