// tiny client helper to send analytics beacons
export function track(event: string, data: Record<string, unknown> = {}) {
  try {
    const body = JSON.stringify({ event, ts: Date.now(), ...data });
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/analytics", blob);
    } else {
      fetch("/api/analytics", { method: "POST", body, headers: { "Content-Type": "application/json" } });
    }
  } catch { /* no-op */ }
}
