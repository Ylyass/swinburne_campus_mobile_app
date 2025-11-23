"use client";

import Link from "next/link";

export type EventItem = {
  date: string;
  title: string;
  location?: string;
  href?: string;
};

type MiniEventsProps = {
  items?: EventItem[];
  limit?: number;
  showHeading?: boolean;
  showSeeAll?: boolean;
  className?: string;
};

export default function MiniEvents({
  items,
  limit = 3,
  showHeading = true,
  showSeeAll = false,
  className = "",
}: MiniEventsProps) {
  const list = (items ?? []).slice(0, limit);

  return (
    <div className={className}>
      {showHeading && (
        <div className="mb-3 flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Upcoming events</h4>
          {showSeeAll && (
            <Link
              href="/events"
              prefetch={false}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              See all →
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {list.map((ev, i) =>
          ev.href ? (
            <Link
              key={i}
              href={ev.href}
              prefetch={false}
              className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,.06)] transition hover:shadow-[0_16px_40px_rgba(0,0,0,.10)]"
            >
              <div className="text-sm text-slate-500">{ev.date}</div>
              <div className="mt-1 font-semibold text-slate-900">{ev.title}</div>
              {ev.location && <div className="mt-1 text-sm text-slate-500">{ev.location}</div>}
            </Link>
          ) : (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,.06)]"
            >
              <div className="text-sm text-slate-500">{ev.date}</div>
              <div className="mt-1 font-semibold text-slate-900">{ev.title}</div>
              {ev.location && <div className="mt-1 text-sm text-slate-500">{ev.location}</div>}
            </div>
          )
        )}

        {list.length === 0 && (
          <div className="text-sm text-slate-500">No events to show.</div>
        )}
      </div>
    </div>
  );
}
