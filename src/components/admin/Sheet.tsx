"use client";
import { useEffect } from "react";

export default function Sheet({
  open, title, children, onClose, onSubmit, submitLabel="Save",
}:{
  open:boolean; title:string; children:React.ReactNode;
  onClose:()=>void; onSubmit?:()=>void; submitLabel?:string;
}) {
  useEffect(()=>{ document.documentElement.style.overflow = open ? "hidden" : ""; },[open]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 sm:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <section className="absolute inset-x-0 bottom-0 max-h-[85%] rounded-t-3xl bg-white p-4 shadow-2xl dark:bg-slate-900">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200" />
        <header className="mt-2 flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-lg px-2 py-1 text-sm underline">Close</button>
        </header>
        <div className="mt-3 space-y-3 overflow-auto pb-24">{children}</div>
        <div className="fixed inset-x-0 bottom-0 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <button onClick={onClose} className="rounded-xl ring-1 ring-slate-200 px-3 py-2 dark:ring-slate-700">Cancel</button>
          {onSubmit &&
            <button onClick={onSubmit} className="rounded-xl bg-slate-900 px-3 py-2 text-white dark:bg-white dark:text-slate-900">
              {submitLabel}
            </button>}
        </div>
      </section>
    </div>
  );
}
