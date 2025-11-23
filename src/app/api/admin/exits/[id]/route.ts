import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/fsdb";
import type { ExitRecord } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const FILE = "exits.json";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const items = await readJSON<ExitRecord[]>(FILE, []);
  const item = items.find(e => e.id === params.id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const patch = await req.json() as Partial<ExitRecord>;
  const items = await readJSON<ExitRecord[]>(FILE, []);
  const i = items.findIndex(e => e.id === params.id);
  if (i < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[i] = { ...items[i], ...patch, id: params.id,
    priority: Number.isFinite(patch.priority as number) ? Number(patch.priority) : items[i].priority };
  await writeJSON(FILE, items);
  return NextResponse.json({ ok: true, item: items[i] });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const items = await readJSON<ExitRecord[]>(FILE, []);
  const next = items.filter(e => e.id !== params.id);
  if (next.length === items.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await writeJSON(FILE, next);
  return NextResponse.json({ ok: true });
}
