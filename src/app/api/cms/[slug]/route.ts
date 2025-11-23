import { NextResponse } from "next/server";
import { supabaseAnon, supabaseAdmin } from "@/lib/supabase.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { slug: string } };

export async function GET(_: Request, { params }: Params) {
  const sb = supabaseAnon();
  const { data, error } = await sb
    .from("cms_pages")
    .select("slug, content, updated_at")
    .eq("slug", params.slug)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: data });
}

export async function PATCH(req: Request, { params }: Params) {
  // Admin-only: use service role
  const sb = supabaseAdmin();
  const body = await req.json(); // expects { content: {...} }
  if (!body || typeof body.content !== "object") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const { data, error } = await sb
    .from("cms_pages")
    .upsert({ slug: params.slug, content: body.content })
    .select()
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: data });
}
