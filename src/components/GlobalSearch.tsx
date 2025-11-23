"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import events from "@/data/events.json";
import { coreTiles } from "@/data/tiles";
import Link from "next/link";

type Ev = { id: string; title: string; date: string; venue: string; type: string };

export default function GlobalSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return { tiles: [], evs: [] as Ev[] };
    const tiles = coreTiles.filter(t =>
      t.title.toLowerCase().includes(query) || t.subtitle?.toLowerCase().includes(query)
    ).slice(0, 5);
    const evs = (events as unknown as Ev[])
      .filter(e => e.title.toLowerCase().includes(query) || e.venue.toLowerCase().includes(query))
      .slice(0,5);
    return { tiles, evs };
  }, [q]);

  return (
    <div className="relative" ref={ref}>
      <input
        value={q}
        onChange={(e)=>{ setQ(e.target.value); setOpen(true); }}
        onFocus={()=>setOpen(true)}
        className="w-full rounded-xl border px-3 py-2 shadow-sm"
        placeholder="Search tiles & events…"
      />
      {open && (results.tiles.length || results.evs.length) ? (
        <div className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow-lg overflow-hidden">
          {results.tiles.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs text-gray-500">Tiles</div>
              <ul className="max-h-60 overflow-auto">
                {results.tiles.map(t => (
                  <li key={t.title}>
                    <Link href={t.href} className="block px-3 py-2 hover:bg-gray-50">{t.title}</Link>
                  </li>
                ))}
              </ul>
              {results.evs.length > 0 && <div className="h-px bg-gray-100" />}
            </>
          )}
          {results.evs.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs text-gray-500">Events</div>
              <ul className="max-h-60 overflow-auto">
                {results.evs.map(e => (
                  <li key={e.id} className="px-3 py-2 hover:bg-gray-50">
                    <Link href="/events" className="block">
                      <div className="font-medium">{e.title}</div>
                      <div className="text-xs text-gray-500">{new Date(e.date).toLocaleString()} • {e.venue}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
