import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { eventToRow, rowToEvent } from "@/lib/events-db";
import type { CampusEvent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In Next 15 route handlers, params is a Promise
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ item: rowToEvent(data) });
}

export async function PATCH(req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;

  const body = (await req.json().catch(() => null)) as
    | Partial<CampusEvent>
    | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const nowIso = new Date().toISOString();

  const row = eventToRow({
    ...body,
    id,
    date: body.date ? new Date(body.date).toISOString() : undefined,
    endDate: body.endDate
      ? new Date(body.endDate).toISOString()
      : body.date
      ? new Date(body.date).toISOString()
      : undefined,
  });

  const { data, error } = await supabaseAdmin
    .from("events")
    .update({ ...row, updated_at: nowIso })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, item: rowToEvent(data) });
}

export async function DELETE(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;

  const { error } = await supabaseAdmin.from("events").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
