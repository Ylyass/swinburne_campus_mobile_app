import type { AuditLog } from "@/lib/types";

export default function ActivityList({ items }: { items: AuditLog[] }) {
  if (!items?.length) return <div className="p-4 text-sm text-slate-600">No recent activity.</div>;
  return (
    <div className="divide-y divide-slate-200">
      {items.map(a => (
        <div key={a.id} className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-[5rem_10rem_1fr] sm:items-center">
          <div className="text-xs text-slate-500">#{a.id}</div>
          <div className="text-xs text-slate-500">{a.ts} · {a.who}</div>
          <div className="text-sm">{a.what}</div>
        </div>
      ))}
    </div>
  );
}
