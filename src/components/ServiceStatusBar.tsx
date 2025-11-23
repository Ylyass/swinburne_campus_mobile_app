"use client";

function Dot({ ok }: { ok: boolean }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${ok ? "bg-emerald-500" : "bg-amber-500"}`} />;
}

export const STATUS_ITEMS = [
  { name: "Wi-Fi",          ok: true, href: "/support/wifi",           tip: "Operational on campus" },
  { name: "Canvas",         ok: true, href: "/support/canvas-status",  tip: "All systems operational" },
  { name: "Student Portal", ok: true, href: "/support/student-portal", tip: "Operational" },
];

export default function ServiceStatusBar({ items = STATUS_ITEMS }: { items?: typeof STATUS_ITEMS }) {
  return (
    <div className="maxw container-px">
      <div className="rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200/70">
        <ul className="flex flex-wrap items-center gap-2">
          {items.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                title={s.tip}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-white to-slate-50
                           px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200/70 hover:ring-slate-300 transition"
              >
                <Dot ok={s.ok} />
                <span className="font-medium">{s.name}</span>
                <span className={`ml-1 rounded-full px-1.5 py-0.5 ${s.ok ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-amber-50 text-amber-800 ring-1 ring-amber-200"}`}>
                  {s.ok ? "Operational" : "Issue"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
