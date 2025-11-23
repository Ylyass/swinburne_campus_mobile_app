// src/lib/auth-helpers.ts

/* -------------------------------- Types -------------------------------- */
export type Role = "student" | "staff" | "admin";
export type Workspace = Role;

export type Session = {
  signedIn: boolean;
  name: string;
  email: string;
  avatar?: string | null;
  campusId: string;
  roles: Role[];
  workspace: Workspace;
};

/* ---------------------------- Cookie Helpers ---------------------------- */

export function hasAuthCookie(): boolean {
  if (typeof document === "undefined") return false;
  return /(?:^|;\s*)auth=1(?:;|$)/.test(document.cookie);
}

/**
 * Reads mock roles from cookies or environment variables.
 */
export function readRolesFromEnvOrCookie(): Role[] {
  if (typeof document === "undefined") return ["student"];
  const c = document.cookie || "";
  const rolesCookie =
    c.split("; ").find((x) => x.startsWith("roles="))?.split("=")[1] ?? "";
  const roleCookie =
    c.split("; ").find((x) => x.startsWith("role="))?.split("=")[1] ?? "";

  const set = new Set<Role>();
  rolesCookie
    .split(",")
    .map((r) => r.trim().toLowerCase())
    .forEach((r) => {
      if (r === "student" || r === "staff" || r === "admin") set.add(r);
    });
  if (roleCookie === "student" || roleCookie === "staff" || roleCookie === "admin")
    set.add(roleCookie);

  // Note: NEXT_PUBLIC_IS_ADMIN is read from the client's environment (or bundled value)
  if (process.env.NEXT_PUBLIC_IS_ADMIN === "1") set.add("admin");
  if (set.size === 0) set.add("student");
  return Array.from(set);
}

export function cap(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}