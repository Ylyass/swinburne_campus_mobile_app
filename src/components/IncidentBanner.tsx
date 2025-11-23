"use client";

import { useEffect, useState } from "react";

type Item = { name: string; ok: boolean; href?: string };

export default function IncidentBanner({ items }: { items: Item[] }) {
  const hasIncident = items.some(i => !i.ok);
  const first = items.find(i => !i.ok);
  const [show, setShow] = useState(hasIncident);

  useEffect(() => setShow(hasIncident), [hasIncident]);

  if (!show || !first) return null;

  return (
    <div className="sticky top-3 z-10">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900 shadow-sm">
        <span aria-hidden>⚠️</span>{" "}
        {first.name} currently has an issue.{" "}
        {first.href && (
          <a className="underline font-medium" href={first.href}>
            See details
          </a>
        )}
        <button
          onClick={() => setShow(false)}
          className="float-right rounded-md px-2 py-0.5 text-amber-900 hover:bg-amber-100"
          aria-label="Dismiss incident banner"
        >
          ×
        </button>
      </div>
    </div>
  );
}
