// SSR-safe, locale-agnostic helpers

// YYYY-MM-DD (UTC) – stable on server & client.
export function ymdUTC(iso: string) {
    const d = new Date(iso);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,"0")}-${String(d.getUTCDate()).padStart(2,"0")}`;
  }
  
  // Tue, 07 Oct 2025 (UTC)
  export function dayLabelUTC(isoOrKey: string) {
    const k = isoOrKey.includes("-") && isoOrKey.length === 10 ? isoOrKey : ymdUTC(isoOrKey);
    const [y,m,d] = k.split("-").map(Number);
    const dt = new Date(Date.UTC(y,m-1,d));
    const WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const MN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${WD[dt.getUTCDay()]}, ${String(d).padStart(2,"0")} ${MN[dt.getUTCMonth()]} ${y}`;
  }
  
  // 14:30 (UTC) – tabular, stable
  export function timeHMUTC(iso: string) {
    const d = new Date(iso);
    return `${String(d.getUTCHours()).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}`;
  }
  