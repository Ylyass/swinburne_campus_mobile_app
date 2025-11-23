export function toQS(obj: Record<string, string | number | undefined>) {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== "") p.set(k, String(v));
  });
  return p.toString();
}

export function readQS<T extends string>(keys: T[]): Record<T, string> {
  if (typeof window === "undefined") return {} as any;
  const u = new URL(window.location.href);
  return keys.reduce((acc, k) => ({ ...acc, [k]: u.searchParams.get(k) ?? "" }), {} as any);
}
