"use client";

import { useEffect, useMemo, useState } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { CampusEvent } from "@/lib/types";
import { EVENTS } from "@/app/data/events";
import EventRow from "@/app/events/EventRow";
import EventsFilterBar from "@/app/events/EventsFilterBar";
import Image from "next/image";

/* ---------- UTC-safe date helpers ---------- */
function ymdUTC(iso: string) {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function dayLabelUTC(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const WD = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const MN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const today = new Date();
  const tk = ymdUTC(today.toISOString());
  const tmr = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));
  const tmk = ymdUTC(tmr.toISOString());
  if (key === tk) return "Today";
  if (key === tmk) return "Tomorrow";
  return `${WD[dt.getUTCDay()]}, ${String(d).padStart(2, "0")} ${MN[dt.getUTCMonth()]} ${y}`;
}

function group(list: CampusEvent[]) {
  const map = new Map<string, CampusEvent[]>();
  for (const e of list) {
    const k = ymdUTC(e.date);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(e);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}

/* ---------- Empty State Components ---------- */
function EmptyStateToday() {
  return (
    <div className="text-center py-12 px-4">
      <div className="text-6xl mb-4">📅</div>
            <h2 className="text-lg font-semibold text-slate-700 mb-2">Nothing scheduled today</h2>
            <p className="text-sm text-slate-500 mb-6">Check out what&apos;s happening tomorrow or this week.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
          Tomorrow
        </button>
        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors border border-slate-200">
          This week
        </button>
        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors border border-slate-200">
          All categories
        </button>
      </div>
    </div>
  );
}

function EmptyStateFavourites() {
  return (
    <div className="text-center py-12 px-4">
      <div className="text-6xl mb-4">⭐</div>
      <h2 className="text-lg font-semibold text-slate-700 mb-2">You haven&apos;t saved any events yet</h2>
      <p className="text-sm text-slate-500 mb-6">Bookmark events you&apos;re interested in to see them here.</p>
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200">
        Browse upcoming
      </button>
    </div>
  );
}

function EmptyStateError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12 px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-lg font-semibold text-slate-700 mb-2">Can&apos;t load events right now</h2>
      <p className="text-sm text-slate-500 mb-6">Check your connection and try again.</p>
      <button 
        onClick={onRetry}
        className="px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

function OfflineBadge() {
  return (
    <div className="fixed top-4 right-4 z-50 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full border border-amber-200">
      Offline
    </div>
  );
}

/* ---------- Hero Image ---------- */
function HeroImage() {
  const [error, setError] = useState(false);
  const src = error ? "/images/swinburne-logo.jpg" : "/images/campus-map.jpeg";
  return (
    <Image 
      src={src} 
      alt="" 
      fill 
      priority 
      onError={() => setError(true)} 
      className="object-cover saturate-[.9] contrast-[1.05]" 
    />
  );
}

export default function EventsListPage() {
  const { ready, ids } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<CampusEvent[]>(EVENTS);
  const [filterState, setFilterState] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  
  useEffect(() => setMounted(true), []);

  // Simulate loading and error states for demo
  useEffect(() => {
    if (mounted) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Simulate occasional errors
        if (Math.random() < 0.1) {
          setHasError(true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const groups = useMemo(() => group(filteredEvents), [filteredEvents]);

  const handleFilterChange = (list: CampusEvent[], state: Record<string, unknown>) => {
    setFilteredEvents(list);
    setFilterState(state);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  if (!mounted || !ready) {
    return (
      <div className="min-h-screen">
        <header className="relative h-[32vh] min-h-[220px] overflow-hidden">
          <HeroImage />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white/0" />
          <div className="absolute bottom-4 left-0 right-0 maxw container-px">
            <h1 className="text-white/95 text-[20px] font-semibold">Events</h1>
            <p className="text-white/90 text-[13px]">Loading events...</p>
          </div>
        </header>
        <div className="maxw container-px pb-20">
          <div className="text-[12px] text-slate-500 py-6">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div className="min-h-screen">
        <header className="relative h-[32vh] min-h-[220px] overflow-hidden">
          <HeroImage />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white/0" />
          <div className="absolute bottom-4 left-0 right-0 maxw container-px">
            <h1 className="text-white/95 text-[20px] font-semibold">Events</h1>
            <p className="text-white/90 text-[13px]">Something went wrong</p>
          </div>
        </header>
        <div className="maxw container-px pb-20">
          <EmptyStateError onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <header className="relative h-[32vh] min-h-[220px] overflow-hidden">
          <HeroImage />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white/0" />
          <div className="absolute bottom-4 left-0 right-0 maxw container-px">
            <h1 className="text-white/95 text-[20px] font-semibold">Events</h1>
            <p className="text-white/90 text-[13px]">Loading events...</p>
          </div>
        </header>
        <div className="maxw container-px pb-20">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="relative h-[32vh] min-h-[220px] overflow-hidden">
        <HeroImage />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white/0" />
        <div className="absolute bottom-4 left-0 right-0 maxw container-px">
          <h1 className="text-white/95 text-[20px] font-semibold">Events</h1>
          <p className="text-white/90 text-[13px]">
            {filterState.onlySaved 
              ? `Your saved events (${filteredEvents.length})`
              : `${filteredEvents.length} events found`
            }
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <EventsFilterBar data={EVENTS} onChange={handleFilterChange} />

      <div className="maxw container-px pb-20">
        {/* Show offline badge if offline */}
        {isOffline && <OfflineBadge />}

        {/* Empty States */}
        {filteredEvents.length === 0 ? (
          filterState.onlySaved ? (
            <EmptyStateFavourites />
          ) : filterState.range === "today" ? (
            <EmptyStateToday />
          ) : (
            <div className="text-center py-12 px-4">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-lg font-semibold text-slate-700 mb-2">No events found</h2>
              <p className="text-sm text-slate-500 mb-6">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )
        ) : (
          groups.map(([key, items]) => (
            <div key={key} className="mb-2">
              <div className="sticky top-[52px] z-[1] bg-white/90 backdrop-blur">
                <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700 py-1">
                  <span className="inline-block h-4 w-1.5 bg-[var(--brand-red,#D42A30)] rounded-sm" />
                  <h2 suppressHydrationWarning>{dayLabelUTC(key)}</h2>
                  <span className="text-[11px] text-slate-500">• {items.length}</span>
                </div>
                <div className="h-px bg-slate-200" />
              </div>

              <div className="divide-y divide-slate-200">
                {items.map((ev) => (
                  <EventRow key={ev.id} ev={ev} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
