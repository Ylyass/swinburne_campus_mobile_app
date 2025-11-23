export default function EmptyState({
  title, hint, action,
}: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="text-sm font-medium">{title}</div>
      {hint && <p className="mt-1 text-xs text-slate-600">{hint}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
