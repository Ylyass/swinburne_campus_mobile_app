"use client";

export default function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-tile">
      <div className="flex items-center gap-2">
        {icon && (
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200">
            {icon}
          </div>
        )}
        <div className="text-sm font-semibold text-slate-800">{label}</div>
      </div>
      <div className="mt-3 text-2xl font-bold text-slate-900">{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}
