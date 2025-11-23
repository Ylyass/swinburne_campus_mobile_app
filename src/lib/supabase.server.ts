import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!; // keep on server only

export function supabaseAnon() {
  return createClient(URL, ANON, { auth: { persistSession: false } });
}

export function supabaseAdmin() {
  return createClient(URL, SERVICE, { auth: { persistSession: false } });
}
