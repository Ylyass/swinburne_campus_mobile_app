import type { ReactNode } from "react";
import AdminShell from "./_shell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
