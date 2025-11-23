import Spark from "./Spark";

export default function MiniStat({
  label, value, sub, series,
}: { label:string; value:string|number; sub?:string; series:number[] }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
        {sub && <div className="text-xs text-slate-500">{sub}</div>}
      </div>
      <div className="text-slate-400"><Spark data={series} /></div>
    </div>
  );
}
