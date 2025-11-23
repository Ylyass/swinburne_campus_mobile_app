"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "@/lib/cookies";

type Role = "student" | "staff" | "admin";

export default function DevSwitches() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [roles, setRoles] = useState<Record<Role, boolean>>({
    student: false, staff: false, admin: false,
  });
  const [workspace, setWorkspace] = useState<Role>("student");

  useEffect(() => {
    const auth = getCookie("auth") === "1";
    setSignedIn(auth);

    const rolesCsv = (getCookie("roles") ?? "")
      .split(",").map(s => s.trim().toLowerCase());
    const next: Record<Role, boolean> = { student: false, staff: false, admin: false };
    rolesCsv.forEach((r) => {
      if (r === "student" || r === "staff" || r === "admin") next[r] = true;
    });
    setRoles(next);

    const roleCookie = getCookie("role");
    if (roleCookie === "student" || roleCookie === "staff" || roleCookie === "admin") {
      setWorkspace(roleCookie);
    } else {
      const first = (["student","staff","admin"] as Role[])
        .find(r => next[r]);
      if (first) setWorkspace(first);
    }
  }, []);

  const toggleRole = (r: Role) => setRoles((o) => ({ ...o, [r]: !o[r] }));

  const apply = () => {
    const selected = (Object.keys(roles) as Role[]).filter((r) => roles[r]);
    if (signedIn && selected.length === 0) {
      alert("Pick at least one role when signed in.");
      return;
    }
    if (signedIn) setCookie("auth", "1"); else deleteCookie("auth");
    if (selected.length) setCookie("roles", selected.join(",")); else deleteCookie("roles");
    const ws = selected.includes(workspace) ? workspace : (selected[0] ?? "student");
    if (selected.length) setCookie("role", ws); else deleteCookie("role");
    location.reload();
  };

  const resetGuest = () => {
    deleteCookie("auth"); deleteCookie("roles"); deleteCookie("role");
    location.reload();
  };

  const roleBtn = (r: Role, label: string) => (
    <button
      key={r}
      onClick={() => toggleRole(r)}
      className={`rounded-lg border px-2 py-1 text-xs ${
        roles[r] ? "border-slate-300 bg-slate-900 text-white" : "border-slate-300 bg-white hover:bg-slate-50"
      }`}
      aria-pressed={roles[r]}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-2 w-72 rounded-2xl border border-slate-300 bg-white p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">Dev Switches</div>
            <button className="rounded-md bg-slate-100 px-2 py-1 text-xs" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Signed in</span>
              <Switch checked={signedIn} onChange={setSignedIn} />
            </div>

            <div>
              <div className="mb-1 text-xs text-slate-600">Roles</div>
              <div className="flex flex-wrap gap-2">
                {roleBtn("student", "Student")}
                {roleBtn("staff", "Staff")}
                {roleBtn("admin", "Admin")}
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs text-slate-600">Workspace</div>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-2 py-1 text-sm"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value as Role)}
              >
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button onClick={apply} className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
                Apply & Reload
              </button>
              <button onClick={resetGuest} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
                Guest
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm shadow-lg"
        aria-expanded={open}
      >
        ⚙️ Dev
      </button>
    </div>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`h-6 w-11 rounded-full border transition ${
        checked ? "border-slate-300 bg-slate-900" : "border-slate-300 bg-slate-200"
      }`}
      aria-pressed={checked}
      role="switch"
    >
      <span className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white transition ${checked ? "translate-x-[22px]" : ""}`} />
    </button>
  );
}
