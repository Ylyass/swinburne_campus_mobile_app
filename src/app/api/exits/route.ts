import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { ExitRecord } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DIR = path.join(process.cwd(), "src", "data");
const FILE = path.join(DIR, "exits.json");

async function ensure() {
  await mkdir(DIR, { recursive: true });
  try { await readFile(FILE, "utf8"); } catch {
    const seed: ExitRecord[] = [
      {
        id: "adm-main",
        name: "Main Entrance - ADM Building",
        location: "ADM Building, Level 2",
        distance: "45m",
        estimatedTime: "1 minute",
        direction: "Head straight, then turn left near the stairwell",
        status: "Open",
        priority: 1
      }
    ];
    await writeFile(FILE, JSON.stringify(seed, null, 2), "utf8");
  }
}
async function readAll(): Promise<ExitRecord[]> {
  await ensure();
  const raw = await readFile(FILE, "utf8").catch(() => "[]");
  const list = JSON.parse(raw) as ExitRecord[];
  return list.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));
}
async function writeAll(list: ExitRecord[]) {
  await ensure();
  await writeFile(FILE, JSON.stringify(list, null, 2), "utf8");
}
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function GET() {
  const items = await readAll();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<ExitRecord>;
  const items = await readAll();
  const id = slug(body.id || body.name || "exit");
  if (!body.name || !body.location) return NextResponse.json({ error: "name and location required" }, { status: 400 });
  if (items.some(e => e.id === id)) return NextResponse.json({ error: "id exists" }, { status: 409 });

  const rec: ExitRecord = {
    id,
    name: body.name!,
    location: body.location!,
    distance: body.distance ?? "",
    estimatedTime: body.estimatedTime ?? "",
    direction: body.direction ?? "",
    status: (body.status as ExitRecord["status"]) ?? "Open",
    priority: Number.isFinite(body.priority as number) ? Number(body.priority) : 1,
    lat: body.lat, lng: body.lng
  };
  items.push(rec);
  await writeAll(items);
  return NextResponse.json({ ok: true, item: rec });
}
