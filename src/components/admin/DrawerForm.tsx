"use client";
import { useEffect } from "react";

export default function DrawerForm({ open, title, children, onClose, onSubmit }:{
  open:boolean; title:string; children:React.ReactNode; onClose:()=>void; onSubmit:()=>void;
}) {
  useEffect(()=>{ document.body.style.overflow = open ? "hidden" : ""; },[open]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="h-full w-[92%] max-w-md overflow-auto bg-white p-4 shadow-2xl sm:rounded-l-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100">Close</button>
        </div>
        <div className="space-y-3">{children}</div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-3 py-2 ring-1 ring-slate-200">Cancel</button>
          <button onClick={onSubmit} className="rounded-lg bg-slate-900 px-3 py-2 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
