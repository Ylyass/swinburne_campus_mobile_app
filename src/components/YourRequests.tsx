"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  category: string;
  message: string;
  status: "new" | "in_progress" | "closed";
  createdAt: string;
};

export default function YourRequests() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/support")
      .then(r => r.json())
      .then(j => alive && setItems(j.items?.slice(0, 3) ?? []))
      .catch(() => alive && setItems([]));
    return () => { alive = false; };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h4 className="mb-2 text-sm font-semibold">Your recent requests</h4>

      {!items && (
        <div className="animate-pulse space-y-2">
          <div className="h-4 rounded bg-slate-100" />
          <div className="h-4 rounded bg-slate-100" />
          <div className="h-4 w-2/3 rounded bg-slate-100" />
        </div>
      )}

      {items && items.length === 0 && (
        <p className="text-sm text-slate-600">No requests yet.</p>
      )}

      {items && items.length > 0 && (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium">{it.category}</div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  it.status === "closed"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : it.status === "in_progress"
                    ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                    : "bg-slate-50 text-slate-700 ring-1 ring-slate-200"
                }`}>
                  {it.status.replace("_", " ")}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{it.message}</p>
              <div className="mt-1 text-xs text-slate-400">
                {new Date(it.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
