"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Service } from "../app/types/support";
import Fuse, { type IFuseOptions } from "fuse.js";
import { track } from "@/lib/analytics";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

const CATS = ["All", "IT Support", "Facilities", "Safety", "Wellbeing", "Academic"] as const;

const TONE: Record<string, string> = {
  "IT Support": "ring-sky-200 bg-sky-50",
  Facilities: "ring-amber-200 bg-amber-50",
  Safety: "ring-rose-200 bg-rose-50",
  Wellbeing: "ring-emerald-200 bg-emerald-50",
  Academic: "ring-violet-200 bg-violet-50",
};

function CatBadge({ cat }: { cat: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-slate-700 ring-1 ${TONE[cat] ?? "ring-slate-200 bg-slate-50"}`}>
      {cat}
    </span>
  );
}

/* ---------- Shimmer skeleton ---------- */
function DirectorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
          <div className="h-20 animate-pulse rounded-xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%]" />
        </div>
      ))}
    </div>
  );
}

const FUSE_OPTS: IFuseOptions<Service> = {
  keys: [
    { name: "name",     weight: 0.6 },
    { name: "desc",     weight: 0.3 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
};

export default function SupportDirectory({
  services,
  preset,
}: {
  services: Service[];
  preset?: { cat?: string; q?: string };
}) {
  const [cat, setCat] = useState<(typeof CATS)[number]>(
    (preset?.cat as (typeof CATS)[number]) ?? "All"
  );
  const [q, setQ] = useState(preset?.q ?? "");
  const [hydrated, setHydrated] = useState(false);
  const [debouncedQ, setDebouncedQ] = useState(q);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQ(q);
      if (q.trim()) track("support_search", { q, cat });
    }, 160);
    return () => clearTimeout(t);
  }, [q, cat]);

  // Counts for chips
  const counts = useMemo(() => {
    const base: Record<(typeof CATS)[number], number> = { All: services.length, "IT Support": 0, Facilities: 0, Safety: 0, Wellbeing: 0, Academic: 0 };
    services.forEach(s => (base[s.category as keyof typeof base] as number)++);
    return base;
  }, [services]);

  const filtered = useMemo(() => {
    const subset = cat === "All" ? services : services.filter(s => s.category === cat);
    if (!debouncedQ.trim()) return subset;
    const idx = new Fuse<Service>(subset, FUSE_OPTS);
    return idx.search(debouncedQ).map(r => r.item);
  }, [services, cat, debouncedQ]);

  if (!hydrated) return <DirectorySkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="rounded-full px-3 py-1.5 text-xs bg-white ring-1 ring-slate-200 data-[active=true]:bg-slate-900 data-[active=true]:text-white transition"
            data-active={cat === c}
            aria-pressed={cat === c}
            title={`Show ${c} services`}
          >
            {c} ({c === "All" ? counts.All : counts[c]})
          </button>
        ))}
        <input
          placeholder="Search services…"
          className="ml-auto input !h-9 w-56"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search support services"
        />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((s) => {
            const tel = s.phone ? `tel:${s.phone.replace(/[^0-9]/g, "")}` : null;
            const mail = s.email ? `mailto:${s.email}` : null;
            const page = `/support/${s.slug}`;
            const href = tel ?? mail ?? page;
            const isExternal = /^(mailto:|tel:|https?:)/.test(href);

            const CardInner = (
              <motion.div
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 hover:shadow-md hover:ring-slate-300 transition will-change-transform focus-within:ring-2 focus-within:ring-rose-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-[15px] font-semibold text-slate-900">{s.name}</h3>
                      <CatBadge cat={s.category} />
                    </div>
                    <div className="text-xs text-slate-500">{s.hours}</div>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-700">{s.desc}</p>

                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-slate-700 underline">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      View details
                    </span>
                  </div>

                  {/* Quick actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
                    {tel && (
                      <a href={tel} className="rounded-lg px-2 py-1 text-[12px] ring-1 ring-slate-200 hover:bg-slate-50" title="Call">
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                    {mail && (
                      <a href={mail} className="rounded-lg px-2 py-1 text-[12px] ring-1 ring-slate-200 hover:bg-slate-50" title="Email">
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );

            return isExternal ? (
              <a key={s.slug} href={href} onClick={() => track("support_card_click", { slug: s.slug })}>
                {CardInner}
              </a>
            ) : (
              <Link key={s.slug} href={href} onClick={() => track("support_card_click", { slug: s.slug })}>
                {CardInner}
              </Link>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-2xl bg-white p-5 text-sm text-slate-600 ring-1 ring-slate-200">
              No matching services. Try a different search or category.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
