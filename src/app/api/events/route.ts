import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { rowToEvent } from "@/lib/events-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const items = (data ?? []).map(rowToEvent);
  return NextResponse.json({ items });
}
