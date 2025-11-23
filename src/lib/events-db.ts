import type { CampusEvent, EventCategory } from "@/lib/types";

export type DbEvent = {
  id: string;
  title: string;
  category: string | null;
  date: string;              // timestamptz
  end_date: string | null;
  venue: unknown | null;
  lat: number | null;
  lng: number | null;
  organizer: string | null;
  description: string | null;
  images: unknown | null;
  tags: string[] | null;
  capacity: number | null;
  pricing: unknown | null;
  registration: unknown | null;
  accessibility: string[] | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
};

export function rowToEvent(r: DbEvent): CampusEvent {
  return {
    id: r.id,
    title: r.title,
    category: (r.category ?? "Other") as EventCategory,
    date: r.date,
    endDate: r.end_date ?? undefined,
    venue: (r.venue as CampusEvent["venue"]) ?? { building: "" },
    lat: r.lat ?? undefined,
    lng: r.lng ?? undefined,
    organizer: r.organizer ?? undefined,
    description: r.description ?? undefined,
    images: (r.images as CampusEvent["images"]) ?? undefined,
    tags: r.tags ?? undefined,
    capacity: r.capacity ?? undefined,
    pricing: (r.pricing as CampusEvent["pricing"]) ?? undefined,
    registration: (r.registration as CampusEvent["registration"]) ?? undefined,
    accessibility: r.accessibility ?? undefined,
    isPublished: r.is_published ?? undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export function eventToRow(e: Partial<CampusEvent>) {
  return {
    id: e.id,
    title: e.title,
    category: e.category,
    date: e.date,
    end_date: e.endDate ?? null,
    venue: e.venue ?? { building: "" },
    lat: e.lat ?? null,
    lng: e.lng ?? null,
    organizer: e.organizer ?? null,
    description: e.description ?? null,
    images: e.images ?? null,
    tags: e.tags ?? null,
    capacity: e.capacity ?? null,
    pricing: e.pricing ?? null,
    registration: e.registration ?? null,
    accessibility: e.accessibility ?? null,
    is_published: e.isPublished ?? true,
  };
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
