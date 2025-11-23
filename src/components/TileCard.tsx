// components/TileCard.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type TileCardProps = {
  href: string;
  title: string;
  icon: ReactNode;
  tone?: "black" | "red" | "neutral"; // kept for API compatibility
  external?: boolean;
  iconVariant?: "default" | "image";
  variant?: "default" | "spotlight"; // "spotlight" for Navigate / Maps
  subtitle?: string;
  badge?: ReactNode | string;
  status?: "open" | "closed" | "updated";
  className?: string;
};

export default function TileCard({
  href,
  title,
  icon,
  tone = "neutral",
  external,
  iconVariant = "default",
  variant = "default",
  subtitle,
  badge,
  status,
  className,
}: TileCardProps) {
  const Wrapper: any = external ? "a" : Link;
  const wrapperProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  // ── Subtle tone helpers for default cards ─────────────────────────────────
  const borderTone =
    tone === "black"
      ? "border-slate-900/15 hover:border-slate-900/30 focus-visible:ring-slate-300/70"
      : "border-slate-200 hover:border-slate-300 focus-visible:ring-slate-200/80";

  const avatarTone =
    tone === "black"
      ? "bg-slate-900"
      : "bg-slate-900"; // neutral, calm dark avatar

  // ── Spotlight (Navigate / Maps) — keep red styling ────────────────────────
  if (variant === "spotlight") {
    const dot =
      status === "closed"
        ? "bg-amber-500"
        : status === "updated"
        ? "bg-sky-500"
        : status
        ? "bg-emerald-500"
        : "";

    return (
      <Wrapper
        {...wrapperProps}
        className={[
          "group relative isolate overflow-hidden rounded-2xl h-full",
          "ring-1 ring-slate-200/70 shadow-sm",
          "bg-gradient-to-br from-white to-slate-50",
          "transition hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200",
          className || "",
        ].join(" ")}
        aria-label={title}
      >
        {/* gradient hairline (red) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl p-[1px]
                     [background:conic-gradient(from_140deg,#D42A30_0%,#ea6a6a_15%,#fecaca_35%,transparent_40%)]
                     opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* inner mask */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[1px] rounded-[calc(theme(borderRadius.2xl)-1px)]
                     bg-gradient-to-br from-white to-slate-50"
        />
        {/* soft grid + red glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl
                     bg-[linear-gradient(to_right,rgba(2,6,23,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,.06)_1px,transparent_1px)]
                     bg-[size:20px_20px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#D42A30]/15 blur-2xl"
        />

        {/* content */}
        <div className="relative z-10 grid min-h-[116px] h-full grid-cols-[auto_1fr_auto] items-center gap-4 p-6">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-900 text-white ring-1 ring-slate-900/10 shadow-sm">
            <span className="text-xl" aria-hidden>
              {icon}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {badge && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700 ring-1 ring-red-100">
                  {badge}
                </span>
              )}
              {status && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                  <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                  {status === "updated"
                    ? "Updated"
                    : status === "closed"
                    ? "Closed"
                    : "Open"}
                </span>
              )}
            </div>
            {/* full title, can wrap */}
            <div className="mt-1 text-[22px] font-semibold tracking-tight text-slate-900 whitespace-normal break-words">
              {title}
            </div>
            {subtitle && (
              <p className="mt-0.5 text-[13.5px] text-slate-600 line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>

          <div className="ml-2">
            <div
              className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-slate-200 shadow-sm
                         transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            >
              <span className="text-slate-700">→</span>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ── Default cards (Emergency, Canvas, Student Portal, etc.) ───────────────
  const tileBase =
    "group block h-full min-h-[88px] rounded-2xl bg-white/95 backdrop-blur-sm " +
    "border shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] " +
    "transition focus-visible:outline-none focus-visible:ring-4";

  const darkAvatar =
    "inline-grid h-10 w-10 place-items-center rounded-full text-white shadow-sm";
  const imageBadge =
    "inline-grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-slate-200/70 shadow-sm";

  return (
    <Wrapper
      className={`${tileBase} ${borderTone} ${className || ""}`}
      {...wrapperProps}
    >
      <div className="flex h-full items-center gap-3">
        <span
          className={
            iconVariant === "image"
              ? imageBadge
              : `${darkAvatar} ${avatarTone}`
          }
        >
          {icon}
        </span>

        <div className="flex-1 min-w-0">
          {/* title: full, wraps, no ellipsis */}
          <div className="text-sm sm:text-base font-semibold text-slate-900 leading-snug whitespace-normal break-words">
            {title}
          </div>

          {subtitle && (
            <div className="mt-0.5 text-[13.5px] text-slate-600 line-clamp-2">
              {subtitle}
            </div>
          )}
        </div>

        <span className="ml-auto text-slate-300 transition group-hover:text-slate-400">
          →
        </span>
      </div>
    </Wrapper>
  );
}