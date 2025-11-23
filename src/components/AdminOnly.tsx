"use client";

import { getCookie } from "@/lib/cookies";

export default function AdminOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode | null;
}) {
  const rolesCsv = (getCookie("roles") ?? "").toLowerCase();
  const role = (getCookie("role") ?? "").toLowerCase();
  const isAdmin = rolesCsv.split(",").includes("admin") || role === "admin";
  return isAdmin ? <>{children}</> : <>{fallback}</>;
}
