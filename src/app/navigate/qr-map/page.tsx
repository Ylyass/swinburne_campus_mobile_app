'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SubpageLayout from '@/components/SubpageLayout';
import { FaMapMarkerAlt, FaWalking } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

/* ===== Types & data ===== */

type LocationKey = 'lobby' | 'atrium' | 'library' | 'mph' | 'gblock';

type Location = {
  key: LocationKey;
  label: string;
  description: string;
  /** Position on the 2D map, in percentages */
  x: number;
  y: number;
  /** Where to go when user starts navigation */
  routeHref: string;
};

const LOCATIONS: Location[] = [
  {
    key: 'lobby',
    label: 'Main Lobby',
    description: 'Campus main entrance and reception area.',
    x: 50.0,
    y: 58.04,
    routeHref: '/navigate/map?from=lobby&to=lobby',
  },
  {
    key: 'atrium',
    label: 'Borneo Atrium',
    description: 'Event space and open hangout area between Block A and B.',
    x: 56.5,
    y: 70.69,
    routeHref: '/navigate/borneoatrium',
  },
  {
    key: 'library',
    label: 'Library',
    description: 'Resources, quiet zones and study rooms.',
    x: 50.0,
    y: 48.58,
    routeHref: '/navigate/library',
  },
  {
    key: 'mph',
    label: 'Multi Purpose Hall',
    description: 'Exams, events and large assemblies.',
    x: 38.7,
    y: 47.92,
    routeHref: '/navigate/mph',
  },
  {
    key: 'gblock',
    label: 'G Block (IT & Student Service)',
    description: 'IT department, labs and student service counters.',
    x: 54.22,
    y: 39.0,
    routeHref: '/navigate/gblock',
  },
];

function findLocation(key: string | null): Location | undefined {
  if (!key) return undefined;
  return LOCATIONS.find((l) => l.key === key);
}

/* ===== Page component ===== */

function QrMapContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<LocationKey | null>(null);

  // starting point comes from ?start=lobby in the QR URL
  const startKeyFromQr = searchParams.get('start');
  const startLocation = useMemo(
    () => findLocation(startKeyFromQr) ?? findLocation('lobby')!,
    [startKeyFromQr],
  );

  const selectedLocation = useMemo(
    () => (selectedKey ? findLocation(selectedKey) ?? null : null),
    [selectedKey],
  );

  // Auto-select a sensible default destination (nearest to start)
  useEffect(() => {
    if (!startLocation || selectedKey) return;
    const nearest = LOCATIONS
      .filter((l) => l.key !== startLocation.key)
      .reduce<Location | null>((best, current) => {
        if (!best) return current;
        const dBest =
          (best.x - startLocation.x) ** 2 + (best.y - startLocation.y) ** 2;
        const dCur =
          (current.x - startLocation.x) ** 2 +
          (current.y - startLocation.y) ** 2;
        return dCur < dBest ? current : best;
      }, null);
    if (nearest) setSelectedKey(nearest.key);
  }, [startLocation, selectedKey]);

  const handleStartRoute = () => {
    if (!selectedLocation) return;
    router.push(selectedLocation.routeHref);
  };

  return (
    <SubpageLayout icon="" title="" description="">
      <div className="col-span-full space-y-4">
        {/* Header */}
        <header className="-mt-12 rounded-2xl border border-red-700 bg-white p-4 shadow-md shadow-red-200">
          <div className="flex items-center gap-3">
            <Link
              href="/navigate"
              aria-label="Back"
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-300 bg-white text-slate-900 transition hover:bg-slate-100"
            >
              ←
            </Link>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-xl">
              🗺️
            </span>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900">
                2D Campus Map (QR Start)
              </h1>
              <p className="text-sm text-slate-500">
                You are here:{' '}
                <span className="font-semibold">
                  {startLocation.label}
                </span>{' '}
                (via QR code)
              </p>
            </div>
          </div>
        </header>

        {/* Map + side panel */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* 2D Map */}
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-800">
                Swinburne Sarawak 2D Map
              </h2>
              <p className="text-[11px] text-slate-500">
                Tap a pin or card to choose your destination
              </p>
            </div>

            <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
              <Image
                src="/images/qr-map.jpg"
                alt="Swinburne Sarawak 2D Map"
                fill
                className="object-contain"
                priority
              />

              {/* "You are here" marker */}
              <button
                type="button"
                className="absolute -translate-x-1/2 translate-y-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-lg"
                style={{
                  left: `${startLocation.x}%`,
                  top: `${startLocation.y + 1}%`, // move label slightly down from the pin
                }}
                aria-label="You are here"
              >
                You are here
              </button>
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${startLocation.x}%`,
                  top: `${startLocation.y}%`,
                }}
              >
                {/* pulse ring */}
                <span className="absolute inset-0 -z-10 h-6 w-6 rounded-full bg-red-500/40 animate-ping" />
                <div className="relative h-6 w-6 rounded-full border-2 border-white bg-red-600 shadow-md">
                  <FaMapMarkerAlt className="h-full w-full text-white" />
                </div>
              </div>

              {/* Destination pins */}
              {LOCATIONS.map((loc) => {
                const isSelected = loc.key === selectedKey;
                const isStart = loc.key === startLocation.key;

                return (
                  <button
                    key={loc.key}
                    type="button"
                    onClick={() => setSelectedKey(loc.key)}
                    className={[
                      'group absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-red-500 p-1 shadow-md transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500',
                      isSelected ? 'scale-110 ring-2 ring-yellow-300' : '',
                      isStart ? 'pointer-events-none opacity-0' : '',
                    ].join(' ')}
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    aria-label={loc.label}
                  >
                    <FaMapMarkerAlt className="h-5 w-5 text-white" />

                    {/* Advanced tooltip */}
                    <span className="pointer-events-none absolute left-1/2 top-[-1.8rem] w-max -translate-x-1/2 rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] text-white opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100 group-hover:top-[-2rem]">
                    <span className="block font-semibold">
                      {loc.label}
                    </span>
                    <span className="block text-[10px] text-slate-200">
                      {isSelected ? 'Selected' : 'Tap to select'}
                    </span>
                    {/* tooltip arrow */}
                    <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-[1px] rotate-45 bg-slate-900/95" />
                  </span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 shadow">
                  <FaMapMarkerAlt className="h-3 w-3 text-white" />
                </span>
                <span>Destination pin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative inline-flex h-4 w-4 items-center justify-center">
                  <span className="absolute inline-flex h-4 w-4 rounded-full bg-red-500/40" />
                  <span className="relative h-3 w-3 rounded-full bg-red-600" />
                </span>
                <span>You are here</span>
              </div>
            </div>
          </section>

          {/* Destination list / actions */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Choose your destination
            </h2>

            {/* Route summary card */}
            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">
                From:{' '}
                <span className="font-medium text-red-600">
                  {startLocation.label}
                </span>
              </p>
              <p>
                To:{' '}
                <span className="font-medium">
                  {selectedLocation
                    ? selectedLocation.label
                    : 'Select a destination on the map or list'}
                </span>
              </p>
            </div>

            <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.key}
                  type="button"
                  onClick={() => setSelectedKey(loc.key)}
                  className={[
                    'w-full rounded-2xl border px-3 py-2 text-left text-sm transition',
                    loc.key === selectedKey
                      ? 'border-red-500 bg-red-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50',
                    loc.key === startLocation.key ? 'opacity-60' : '',
                  ].join(' ')}
                  disabled={loc.key === startLocation.key}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      {loc.label}
                    </span>
                    {loc.key === selectedKey && (
                      <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-medium text-white">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[12px] text-slate-600">
                    {loc.description}
                  </p>
                  {loc.key === startLocation.key && (
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      This is your current location.
                    </p>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleStartRoute}
              disabled={!selectedLocation}
              className={[
                'inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition',
                selectedLocation
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'cursor-not-allowed bg-slate-300 text-slate-600',
              ].join(' ')}
            >
              <FaWalking className="h-4 w-4" />
              {selectedLocation
                ? `Start route to ${selectedLocation.label}`
                : 'Choose a destination to start'}
            </button>

            <p className="text-[11px] text-slate-500">
              This page is designed as a{' '}
              <span className="font-semibold">QR landing page</span>. Different
              QR codes can point here with different <code>?start=</code>{' '}
              values for other buildings or entrances.
            </p>
          </section>
        </div>
      </div>
    </SubpageLayout>
  );
}

export default function QrMapPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading map…</div>}>
      <QrMapContent />
    </Suspense>
  );
}
