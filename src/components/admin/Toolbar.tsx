"use client";
import { useEffect, useState } from "react";

export default function Toolbar({
  onSearch,
  extra,
  placeholder = "Search…",
}: {
  onSearch: (q: string) => void;
  extra?: React.ReactNode;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const id = setTimeout(() => onSearch(q), 200);
    return () => clearTimeout(id);
  }, [q]);
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <input
        className="input w-full sm:w-72"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search"
      />
      <div className="flex flex-wrap gap-2">{extra}</div>
    </div>
  );
}
