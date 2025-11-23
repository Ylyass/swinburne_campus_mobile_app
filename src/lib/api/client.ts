export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

type Opts = RequestInit & { auth?: boolean };

export async function api(path: string, opts: Opts = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...opts.headers,
  };
  if (opts.auth) {
    const token = getToken(); // from lib/auth
    if (token) {
      if (headers instanceof Headers) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
    }
  }
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers, cache: "no-store" });
  if (!res.ok) {
    const body = await safeJson(res);
    throw new Error(body?.message || `${res.status} ${res.statusText}`);
  }
  return safeJson(res);
}
async function safeJson(res: Response) { try { return await res.json(); } catch { return null; } }
import { getToken } from "../auth";
