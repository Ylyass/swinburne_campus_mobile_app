// src/app/admin/page.tsx
"use client";

import Link from "next/link";
import MobileHeader from "@/components/admin/MobileHeader";
import StatCard from "@/components/admin/StatCard";
import MiniStat from "@/components/admin/MiniStat";
import SLAWidget from "@/components/admin/SLAWidget";
import HealthHeatmap from "@/components/admin/HealthHeatmap";
import { metrics, heatmap } from "./_data/mock";

export default function AdminHome() {
  const recent = [
    { id:"A1092", at:"10:42", who:"admin",   what:"Published banner “Power maintenance”" },
    { id:"A1091", at:"09:18", who:"j.smith", what:"Updated service “Wi-Fi / Network” (SLA 8×5)" },
    { id:"A1090", at:"08:55", who:"admin",   what:"Closed incident “Portal login failures”" },
  ];

  return (
    <>
      <MobileHeader />
      <main className="pb-24 sm:pb-8">
        {/* KPI cards */}
        <section className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-3 sm:p-0">
          <StatCard
            label="Open incidents"
            value={2}
            sub="−1 vs. yesterday"
            icon={<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/></svg>}
          />
          <StatCard
            label="Active banners"
            value={3}
            sub="+1 scheduled"
            icon={<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3 4h18v4H3zM3 10h12v10H3z"/></svg>}
          />
          <StatCard
            label="Services"
            value={42}
            sub="5 without owners"
            icon={<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4 4h16v6H4zM4 12h16v8H4z"/></svg>}
          />
        </section>

        {/* analytics row */}
        <section className="mt-2 grid grid-cols-1 gap-3 p-3 sm:grid-cols-3 sm:p-0">
          <MiniStat label="Active users today" value={metrics.activeUsersToday} sub={`Peak ${metrics.peakHour}`} series={metrics.openIncidents7d}/>
          <MiniStat label="Services down (7d)" value={metrics.servicesDown7d.at(-1) ?? 0} sub="Last 7 days" series={metrics.servicesDown7d}/>
          <MiniStat label="Top service" value={metrics.mostAccessed} sub="Most accessed" series={[1,2,3,2,3,4,5]}/>
        </section>

        {/* health + SLA */}
        <section className="mt-2 grid grid-cols-1 gap-3 p-3 sm:grid-cols-3 sm:p-0">
          <SLAWidget within={metrics.sla.within} total={metrics.sla.total} meanHrs={metrics.avgResolutionHrs}/>
          <div className="sm:col-span-2"><HealthHeatmap rows={heatmap.rows} cols={heatmap.cols} cells={heatmap.cells}/></div>
        </section>

        {/* Quick actions */}
        <section className="mt-4 grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:p-0">
          {[
            { href:"/admin/banners",   label:"New banner" },
            { href:"/admin/incidents", label:"Report incident" },
            { href:"/admin/services",  label:"Add service" },
            { href:"/admin/services",  label:"Edit taxonomy" },
            { href:"/admin/incidents", label:"Maintenance window" },
            { href:"/admin/banners",   label:"Schedule alert" },
          ].map(a=>(
            <Link key={a.label} href={a.href}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm shadow-sm active:scale-[.99]">
              {a.label}
            </Link>
          ))}
        </section>

        {/* Recent activity */}
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent activity</h2>
            <Link href="/admin/logs" className="text-sm underline">View all logs</Link>
          </div>
          <div className="divide-y divide-slate-200">
            {recent.map(r=>(
              <div key={r.id} className="py-3 text-sm">
                <div className="text-slate-500">#{r.id} · {r.at} · {r.who}</div>
                <div className="mt-1">{r.what}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
