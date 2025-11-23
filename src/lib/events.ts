import type { CampusEvent } from "@/lib/types";
import { EVENTS as FALLBACK } from "@/app/data/events";

export async function fetchEvents(publishedOnly = true): Promise<CampusEvent[]> {
  try {
    const r = await fetch(`/api/events?published=${publishedOnly ? "1" : "0"}`, { cache: "no-store" });
    if (!r.ok) throw new Error();
    const { items } = await r.json();
    return items as CampusEvent[];
  } catch {
    return FALLBACK; // still works offline / first run
  }
}

export async function fetchEvent(id: string): Promise<CampusEvent | null> {
  try {
    const r = await fetch(`/api/events/${id}`, { cache: "no-store" });
    if (!r.ok) return null;
    const { item } = await r.json();
    return item as CampusEvent;
  } catch { return null; }
}
