"use client";

import { useEffect, useState } from "react";

const KEY = "announce_v1_dismissed";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const off = globalThis?.localStorage?.getItem(KEY) === "1";
    if (!off) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="maxw container-px mt-3">
      <div className="rounded-xl border border-amber-300/60 bg-amber-50 text-amber-900 px-3 py-2 flex items-center justify-between shadow-sm">
        <div className="text-sm">
          <span className="mr-2" aria-hidden>📣</span>
          Orientation week starts Monday — check your timetable and events.
        </div>
        <button
          className="text-sm px-2 py-1 rounded-md hover:bg-amber-100"
          onClick={() => { try { localStorage.setItem(KEY, "1"); } catch {} ; setVisible(false); }}
          aria-label="Dismiss announcement"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
