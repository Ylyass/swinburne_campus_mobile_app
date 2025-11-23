import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { eventToRow, rowToEvent, slugify } from "@/lib/events-db";
import type { CampusEvent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url.startsWith("http") ? req.url : `http://x${req.url}`);
  const onlyPublished = url.searchParams.get("published") === "1";

  let q = supabaseAdmin.from("events").select("*").order("date", { ascending: true });
  if (onlyPublished) q = q.eq("is_published", true);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: (data ?? []).map(rowToEvent) });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<CampusEvent> | null;
  if (!body || !body.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  // generate unique id
  const base = slugify(String(body.id ?? body.title));
  let id = base || "event";
  const { data: existing } = await supabaseAdmin.from("events").select("id").eq("id", id).maybeSingle();
  if (existing) id = `${id}-${Math.random().toString(36).slice(2, 6)}`;

  const nowIso = new Date().toISOString();
  const row = eventToRow({
    ...body,
    id,
    date: body.date ? new Date(body.date).toISOString() : nowIso,
    endDate: body.endDate ? new Date(body.endDate).toISOString() : body.date ?? nowIso,
    isPublished: body.isPublished !== false,
  });

  const { data, error } = await supabaseAdmin
    .from("events")
    .insert({ ...row, created_at: nowIso, updated_at: nowIso })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: rowToEvent(data) });
}
