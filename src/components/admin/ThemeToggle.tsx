"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle(){
  const [dark,setDark]=useState(false);
  useEffect(()=>{
    document.documentElement.classList.toggle("dark", dark);
  },[dark]);
  return (
    <button onClick={()=>setDark(v=>!v)} className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm">
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
