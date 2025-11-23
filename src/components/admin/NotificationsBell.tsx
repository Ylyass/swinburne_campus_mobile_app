"use client";
import { useState } from "react";

export default function NotificationsBell(){
  const [open,setOpen]=useState(false);
  const items = [
    { id:"n1", text:"Service update pending owner assignment", ts:"Just now" },
    { id:"n2", text:"Banner “Orientation” expiring in 2 days", ts:"1h ago" },
  ];
  return (
    <div className="relative">
      <button onClick={()=>setOpen(o=>!o)} className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm">🔔 {items.length}</button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
          <div className="text-sm font-semibold px-2 py-1">Notifications</div>
          <div className="divide-y">
            {items.map(i=>(
              <div key={i.id} className="px-2 py-2 text-sm">
                <div>{i.text}</div>
                <div className="text-xs text-slate-500">{i.ts}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
