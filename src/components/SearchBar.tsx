"use client";

import { useRef, useState } from "react";

export default function SearchBar({ onSubmit }: { onSubmit?: (q: string) => void }) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      role="search"
      className="relative"
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(q.trim()); }}
    >
      <input
        ref={ref}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search campus • facilities, events, support"
        aria-label="Search campus"
        enterKeyHint="search"
        autoComplete="off"
        className="w-full h-11 rounded-xl border border-slate-300 bg-white pl-10 pr-9 outline-none focus:ring-2 focus:ring-[#D42A30]/60"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden>🔎</span>
      {q && (
        <button
          type="button"
          onClick={() => { setQ(""); ref.current?.focus(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-slate-500 hover:text-slate-700"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </form>
  );
}
