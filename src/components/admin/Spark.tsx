"use client";
export default function Spark({ data, label, w=120, h=32 }: { data:number[]; label?:string; w?:number; h?:number }) {
  const max = Math.max(...data, 1);
  const step = w / (data.length - 1 || 1);
  const points = data.map((v,i)=>`${i*step},${h - (v/max)*h}`).join(" ");
  return (
    <svg width={w} height={h} role="img" aria-label={label ?? "sparkline"} className="overflow-visible">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
