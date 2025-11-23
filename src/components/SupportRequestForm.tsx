"use client";
import { useMemo, useState } from "react";

const CATS = ["General", "IT Support", "Facilities", "Safety", "Wellbeing", "Academic"] as const;
type Cat = typeof CATS[number];

function suggestCategory(msg: string): Cat {
  const m = msg.toLowerCase();
  if (/(login|password|canvas|portal|wifi|wi-?fi)/.test(m)) return "IT Support";
  if (/(projector|air.?con|ac|classroom|maintenance|facility)/.test(m)) return "Facilities";
  if (/(emergency|security|theft|injur|harass)/.test(m)) return "Safety";
  if (/(counsel|wellbeing|mental|stress)/.test(m)) return "Wellbeing";
  if (/(library|reference|loan)/.test(m)) return "Academic";
  return "General";
}

export default function SupportRequestForm() {
  const [loading, setLoading] = useState(false);
  const [okId, setOkId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const suggestion = useMemo(() => suggestCategory(msg), [msg]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null); setOkId(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;

    // validate email domain
    const email = (payload.email || "").trim();
    if (!/@swin\.edu\.my$/i.test(email)) {
      setLoading(false);
      setErr("Please use your @swin.edu.my email.");
      return;
    }

    const res = await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const j = await res.json().catch(() => ({}));
    if (!res.ok) setErr(j?.error || "Something went wrong.");
    else { setOkId(j.id); (e.target as HTMLFormElement).reset(); setMsg(""); }
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h4 className="mb-1 text-sm font-semibold">After-hours request</h4>
      <p className="mb-3 text-xs text-slate-500">We’ll respond within <strong>1 business day</strong>.</p>

      <div aria-live="polite" className="space-y-2">
        {okId && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
            Request received. Reference <span className="font-mono">{okId}</span>
          </div>
        )}
        {err && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm">
            {err}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-3 grid grid-cols-1 gap-3">
        <div className="grid gap-1">
          <label className="text-xs font-medium">Name *</label>
          <input name="name" required className="input" placeholder="Your name" />
        </div>
        <div className="grid gap-1">
          <label className="text-xs font-medium">Email *</label>
          <input name="email" type="email" required className="input" placeholder="you@swin.edu.my" />
        </div>
        <div className="grid gap-1">
          <label className="text-xs font-medium">Category</label>
          <select name="category" className="input" defaultValue={suggestion}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
          <p className="text-[11px] text-slate-500">Suggested: <span className="font-medium">{suggestion}</span></p>
        </div>
        <div className="grid gap-1">
          <label className="text-xs font-medium">Message *</label>
          <textarea
            name="message"
            required
            rows={4}
            className="input"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Tell us what happened…"
          />
        </div>
        <button
          disabled={loading}
          className="mt-1 rounded-xl bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send request"}
        </button>
      </form>
    </div>
  );
}
