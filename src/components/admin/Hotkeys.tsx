"use client";
import { useEffect } from "react";

export default function Hotkeys() {
  useEffect(()=>{
    const on = (e:KeyboardEvent)=>{
      if(e.key.toLowerCase()==="n"){ if(document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA") return; window.location.href="/admin/banners"; }
      if(e.key.toLowerCase()==="i"){ if(document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA") return; window.location.href="/admin/incidents"; }
    };
    window.addEventListener("keydown", on);
    return ()=>window.removeEventListener("keydown", on);
  },[]);
  return null;
}
