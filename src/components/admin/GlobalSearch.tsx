"use client";
import { useEffect, useMemo, useState } from "react";
import { globalIndex } from "@/app/admin/(console)/_data/mock";

export default function GlobalSearch() {
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState("");
  const data = useMemo(()=>{
    const s=q.trim().toLowerCase();
    if(!s) return globalIndex.slice(0,8);
    return globalIndex.filter(x => (x.id+" "+x.title).toLowerCase().includes(s)).slice(0,8);
  },[q]);

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); setOpen(o=>!o); }
    };
    window.addEventListener("keydown", onKey);
    return ()=>window.removeEventListener("keydown", onKey);
  },[]);

  if(!open) return (
    <button onClick={()=>setOpen(true)} className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm">
      ⌘K Search…
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4" onClick={()=>setOpen(false)}>
      <div className="w-full max-w-xl rounded-2xl bg-white p-3 shadow-xl" onClick={(e)=>e.stopPropagation()}>
        <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search incidents, services, banners…"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none" />
        <div className="mt-2 divide-y rounded-lg border border-slate-200">
          {data.map(x=>(
            <a key={x.id} href={linkFor(x)} className="block px-3 py-2 text-sm hover:bg-slate-50">
              <span className="mr-2 rounded bg-slate-100 px-2 py-0.5 text-[11px] uppercase">{x.type}</span>
              <span className="font-medium">{x.title}</span>
              <span className="ml-2 text-slate-500">#{x.id}</span>
            </a>
          ))}
          {!data.length && <div className="px-3 py-6 text-center text-sm text-slate-500">No results</div>}
        </div>
        <div className="mt-2 text-right text-xs text-slate-500">Press Esc to close · ⌘K to toggle</div>
      </div>
    </div>
  );
}
function linkFor(x:{type:string;id:string}) {
  if(x.type==="incident") return "/admin/incidents";
  if(x.type==="banner") return "/admin/banners";
  if(x.type==="service") return "/admin/services";
  return "/admin/logs";
}
