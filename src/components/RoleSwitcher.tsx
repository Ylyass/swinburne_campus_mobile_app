"use client";
import { useEffect, useState } from "react";

type Role = "Student" | "Staff" | "Visitor";
const ROLES: Role[] = ["Student", "Staff", "Visitor"];

export default function RoleSwitcher({ onChange }: { onChange: (r: Role)=>void }) {
  // Initialize with default to prevent hydration mismatch
  const [role, setRole] = useState<Role>("Student");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage after mount
    const stored = localStorage.getItem("role") as Role;
    if (stored) {
      setRole(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("role", role);
    onChange(role);
  }, [role, onChange, mounted]);

  return (
    <div className="mb-4 flex gap-2">
      {ROLES.map(r => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`rounded-full border px-3 py-1.5 text-sm ${
            role === r ? "border-[#D42A30] text-[#D42A30]" : "border-slate-300 text-slate-600"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
