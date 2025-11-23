import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { eventToRow, rowToEvent } from "@/lib/events-db";
import type { CampusEvent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ✅ Fix: params is a Promise in Next 15 route handlers
type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, ctx: RouteParams) {
  const { id } = await ctx.params;

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  if (!data)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ item: rowToEvent(data) });
}
