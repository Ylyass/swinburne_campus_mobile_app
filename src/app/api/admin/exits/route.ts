import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/fsdb";
import type { ExitRecord } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE = "exits.json";

export async function GET() {
  const items = await readJSON<ExitRecord[]>(FILE, []);
  items.sort((a,b) => (a.priority ?? 999) - (b.priority ?? 999) || a.name.localeCompare(b.name));
  return NextResponse.json({ items });
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function POST(req: Request) {
  const body = await req.json() as Partial<ExitRecord>;
  const items = await readJSON<ExitRecord[]>(FILE, []);
  if (!body.name || !body.location) {
    return NextResponse.json({ error: "name and location required" }, { status: 400 });
  }
  const id = slug(body.id || body.name);
  if (items.some(x => x.id === id)) return NextResponse.json({ error: "id exists" }, { status: 409 });

  const rec: ExitRecord = {
    id,
    name: body.name,
    location: body.location,
    distance: body.distance ?? "",
    estimatedTime: body.estimatedTime ?? "",
    direction: body.direction ?? "",
    status: (body.status as ExitRecord["status"]) ?? "Open",
    priority: Number.isFinite(body.priority as number) ? Number(body.priority) : 1,
    lat: body.lat, lng: body.lng,
  };
  items.push(rec);
  await writeJSON(FILE, items);
  return NextResponse.json({ ok: true, item: rec }, { status: 201 });
}
