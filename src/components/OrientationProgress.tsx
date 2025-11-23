"use client";
import { useEffect, useState } from "react";

const STEPS = [
  "Activate student account","Check timetable","Get ID card",
  "Join clubs","Learn safety","Explore library","Install app"
];

export default function OrientationProgress() {
  const [done, setDone] = useState<boolean[]>(
    () => JSON.parse(localStorage.getItem("o_steps") || "[]") || Array(STEPS.length).fill(false)
  );
  useEffect(() => { localStorage.setItem("o_steps", JSON.stringify(done)); }, [done]);

  const pct = Math.round((done.filter(Boolean).length / STEPS.length) * 100);

  return (
    <div className="mt-3 rounded-xl border border-white/25 bg-white/10 p-3 text-sm text-white">
      <div className="flex items-center justify-between">
        <span>Progress</span><span>{pct}%</span>
      </div>
      <div className="mt-2 h-2 rounded bg-white/20">
        <div className="h-2 rounded bg-white" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {STEPS.map((s, i) => (
          <label key={s} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!done[i]}
              onChange={() => setDone(d => d.map((v, idx) => idx === i ? !v : v))}
            />
            <span>{s}</span>
          </label>
        ))}
      </ul>
    </div>
  );
}
