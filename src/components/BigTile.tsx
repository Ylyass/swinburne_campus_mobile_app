"use client";
import Link from "next/link";

export default function BigTile({
  title, subtitle, href
}: { title: string; subtitle?: string; href: string }) {
  return (
    <Link
      href={href}
      className="relative block overflow-hidden rounded-2xl p-6 min-h-[190px] text-white
                 shadow-[0_18px_42px_rgba(212,42,48,0.35)] hover:brightness-105 transition"
      style={{ background: "linear-gradient(135deg,#D42A30 0%,#8E0F1B 100%)" }}
    >
      {/* subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.15,
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/30">★</span>
          <span className="uppercase tracking-wide text-sm/6">Orientation</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
        {subtitle && <p className="mt-1 text-white/85 text-sm">{subtitle}</p>}
      </div>
      <div className="relative mt-4 text-right text-2xl" aria-hidden>→</div>
    </Link>
  );
}
