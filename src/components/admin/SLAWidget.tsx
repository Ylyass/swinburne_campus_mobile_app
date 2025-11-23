export default function SLAWidget({ within, total, meanHrs }:{
  within:number; total:number; meanHrs:number;
}) {
  const pct = total ? Math.round((within/total)*1000)/10 : 0;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold">SLA compliance</div>
          <div className="mt-1 text-xs text-slate-600">{within}/{total} within SLA</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold">{pct}%</div>
          <div className="text-xs text-slate-500">Avg resolution {meanHrs}h</div>
        </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
