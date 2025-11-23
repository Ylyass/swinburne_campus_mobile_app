"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CampusEvent } from "@/lib/types";
import EventsFilterBar, { type FilterState } from "@/app/events/EventsFilterBar";
import EventRow from "@/app/events/EventRow";

export default function EventsPage() {
  const [data, setData] = useState<CampusEvent[]>([]);
  const [list, setList] = useState<CampusEvent[]>([]);
  const [filters, setFilters] = useState<FilterState | null>(null);

  useEffect(() => {
    fetch("/api/events?published=1", { cache: "no-store" })
      .then(r => r.json())
      .then(j => {
        const items = (j.items as CampusEvent[]) ?? [];
        items.sort((a,b) => +new Date(a.date) - +new Date(b.date));
        setData(items);
        setList(items);
      })
      .catch(() => { setData([]); setList([]); });
  }, []);

  const groups = useMemo(() => {
    const key = (iso: string) => {
      const d = new Date(iso);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,"0")}-${String(d.getUTCDate()).padStart(2,"0")}`;
    };
    const m = new Map<string, CampusEvent[]>();
    for (const e of list) { const k = key(e.date); (m.get(k) ?? m.set(k, []).get(k)!).push(e); }
    return Array.from(m.entries()).sort(([a],[b]) => a.localeCompare(b));
  }, [list]);

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* header omitted */}
      <div className="sticky top-0 z-30">
        <EventsFilterBar data={data} onChange={(filtered, s) => { setList(filtered); setFilters(s); }} />
      </div>

      <section className="maxw container-px pb-20 pt-6">
        {groups.length === 0 ? (
          <div className="text-center py-16 text-slate-600">No events.</div>
        ) : (
          groups.map(([day, items]) => (
            <div key={day} className="mb-8">
              <div className="text-sm text-slate-700 font-semibold mb-2">{day}</div>
              <div className="space-y-3">
                {items.map(ev => <EventRow key={ev.id} ev={ev} />)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
