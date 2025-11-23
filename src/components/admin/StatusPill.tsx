export default function StatusPill({ s }: { s: "Operational" | "Degraded" | "Outage" | "Maintenance" }) {
  const tone =
    s === "Operational" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" :
    s === "Degraded"    ? "bg-amber-50 text-amber-800 ring-amber-200" :
    s === "Maintenance" ? "bg-sky-50 text-sky-700 ring-sky-200" :
                          "bg-rose-50 text-rose-700 ring-rose-200";
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] ring-1 ${tone}`}>{s}</span>
  );
}
