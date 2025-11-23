"use client";
import { useEffect, useMemo, useState } from "react";
import { FAQS as DEFAULTS } from "@/app/data/support-faqs";

export type FAQ = { q: string; a: string; tags?: string[] };

const GROUPS: { name: string; match: RegExp }[] = [
  { name: "IT Issues", match: /(it|wifi|login|canvas|portal)/i },
  { name: "Facilities", match: /(facility|classroom|projector|ac)/i },
  { name: "Emergencies", match: /(emergency|security|safety)/i },
  { name: "Wellbeing", match: /(wellbeing|counsel)/i },
  { name: "Library & Academic", match: /(library|reference|academic)/i },
];

function FAQSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="h-5 w-40 animate-pulse rounded bg-slate-100" />
      <div className="mt-3 space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-4 w-full animate-pulse rounded bg-slate-100" />)}</div>
    </div>
  );
}

export default function SupportFAQ({ items: provided }: { items?: FAQ[] }) {
  const [q, setQ] = useState("");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const items = provided ?? DEFAULTS;

  const results = useMemo(() => {
    const term = q.toLowerCase();
    return items.filter(f =>
      !term ||
      f.q.toLowerCase().includes(term) ||
      f.a.toLowerCase().includes(term) ||
      (f.tags || []).some(t => t.toLowerCase().includes(term))
    );
  }, [q, items]);

  if (!hydrated) return <FAQSkeleton />;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4" aria-label="Frequently asked questions">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-semibold">FAQs</h2>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search FAQs…" className="ml-auto input !h-8 w-48" aria-label="Search FAQs"/>
      </div>

      {GROUPS.map(g => {
        const grouped = results.filter(f => g.match.test((f.tags || []).join(" ") + " " + f.q));
        if (grouped.length === 0) return null;
        return (
          <div key={g.name} className="mb-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{g.name}</h3>
            <ul className="divide-y divide-slate-200">
              {grouped.map((f, i) => (
                <li key={`${g.name}-${i}`} className="py-2">
                  <details>
                    <summary className="cursor-pointer text-sm font-medium">{f.q}</summary>
                    <p className="mt-2 text-sm text-slate-700">{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
