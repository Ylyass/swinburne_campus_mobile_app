"use client";

import Link from "next/link";
import Image from "next/image";
import type { ChangeEvent, RefObject } from "react";
import AppearanceClient from "@/components/AppearanceClient";
import {
  Card, Field, Segment, Toggle, RoleBadge, LinkButton,
  GridLinks, Dropdown, type Role, type Workspace
} from "./ProfileUI";

type ThemePref = "system" | "light" | "dark";
type TextSize = "normal" | "large";
type Contrast = "normal" | "high";

export type Session = {
  signedIn: boolean;
  name: string;
  email: string;
  avatar?: string | null;
  campusId: string;
  roles: Role[];
  workspace: Workspace;
};

export default function ProfileSignedIn({
  session, setSession,
  theme, setTheme,
  language, setLanguage,
  notificationsEmail, setNotificationsEmail,
  notificationsPush, setNotificationsPush,
  accessibilityText, setAccessibilityText,
  accessibilityContrast, setAccessibilityContrast,
  twoFA, setTwoFA,
  avatarUrl, onPickAvatar, fileInputRef,
  handleSignOut,
}: {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
  theme: ThemePref; setTheme: (v: ThemePref) => void;
  language: string; setLanguage: (v: string) => void;
  notificationsEmail: boolean; setNotificationsEmail: (v: boolean) => void;
  notificationsPush: boolean; setNotificationsPush: (v: boolean) => void;
  accessibilityText: TextSize; setAccessibilityText: (v: TextSize) => void;
  accessibilityContrast: Contrast; setAccessibilityContrast: (v: Contrast) => void;
  twoFA: boolean; setTwoFA: (v: boolean) => void;
  avatarUrl: string | null;
  onPickAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleSignOut: () => void;
}) {
  const hasMultipleRoles = session.roles.length > 1;

  return (
    <div className="maxw container-px my-6">
      <AppearanceClient themePref={theme} textSize={accessibilityText} contrast={accessibilityContrast} />

      {/* Identity & workspace */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#D42A30]/10 via-white to-slate-50 p-5 sm:p-6">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#D42A30]/10 blur-2xl" />
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-slate-900/5 blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/10">
              {session.avatar ? (
                <Image src={session.avatar} alt="Avatar" fill className="object-cover" />
              ) : (
                <span className="text-2xl">👤</span>
              )}
            </div>
            <div>
              <div className="text-lg font-semibold leading-tight">{session.name}</div>
              <div className="text-sm text-slate-600">{session.email}</div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {session.roles.map((r) => (
                  <RoleBadge key={r} role={r} current={session.workspace === r} />
                ))}
              </div>
            </div>
          </div>

          {/* Small actions / info */}
          <div className="grid w-full grid-cols-1 gap-2 sm:auto-cols-auto sm:w-auto sm:grid-flow-col sm:gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <div className="text-xs text-slate-500">Campus ID</div>
              <div className="font-mono text-sm">{session.campusId}</div>
            </div>

            {hasMultipleRoles && (
              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">
                <div className="text-xs text-slate-500">Workspace</div>
                <Dropdown<Workspace>
                  value={session.workspace}
                  onChange={(v) => setSession((s) => ({ ...s, workspace: v }))}
                  options={session.roles.map((r) => ({
                    value: r,
                    label: r.charAt(0).toUpperCase() + r.slice(1),
                  }))}
                />
              </div>
            )}

            <button
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 sm:w-auto"
              onClick={handleSignOut}
            >
              Sign out (preview guest)
            </button>
          </div>
        </div>

        {/* QR placeholder */}
        <div className="relative mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-center">
          <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/10">
            <div className="h-20 w-20 bg-[repeating-conic-gradient(theme(colors.slate.900)_0_25%,white_0_50%)] [mask-image:radial-gradient(circle,black_60%,transparent_61%)] opacity-70" />
          </div>
          <div className="text-center text-xs text-slate-600 sm:text-left">
            Show this at campus checkpoints. <span className="font-medium">QR is a placeholder</span> — wire to your ID service later.
          </div>
        </div>
      </section>

      {/* Preferences & Linked services */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2 sm:gap-6">
          <Card title="Preferences" subtitle="Language, theme, and accessibility.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Language">
                <select
                  className="input w-full"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Bahasa Melayu</option>
                  <option>中文</option>
                </select>
              </Field>

              <Field label="Theme">
                <Segment
                  ariaLabel="Theme"
                  value={theme}
                  onChange={setTheme}
                  options={[
                    { value: "system", label: "System" },
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                  ]}
                />
              </Field>

              <Field label="Notifications (email)">
                <Toggle checked={notificationsEmail} onChange={setNotificationsEmail} />
              </Field>

              <Field label="Notifications (push)">
                <Toggle checked={notificationsPush} onChange={setNotificationsPush} />
              </Field>

              <Field label="Accessibility (text size)">
                <Segment<"normal" | "large">
                  value={accessibilityText}
                  onChange={setAccessibilityText}
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "large", label: "Large" },
                  ]}
                />
              </Field>

              <Field label="Accessibility (contrast)">
                <Segment<"normal" | "high">
                  value={accessibilityContrast}
                  onChange={setAccessibilityContrast}
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "high", label: "High" },
                  ]}
                />
              </Field>
            </div>
          </Card>

          <Card title="Linked services" subtitle="Open or refresh connections.">
            {/* two-up grid on phones for less scrolling */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
              <LinkButton href="https://www.swinburne.edu.my/canvas/">Canvas</LinkButton>
              <LinkButton href="https://sisportal-100380.campusnexus.cloud/CMCPortal/">Student Portal</LinkButton>
              <LinkButton href="/library">Library</LinkButton>
              <LinkButton href="mailto:">Email</LinkButton>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              These open as web views. For OAuth-based linking, replace with your connection flow.
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <Card title="Security" subtitle="Protect your account.">
            <div className="space-y-4">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-medium">Two-factor authentication</div>
                  <div className="text-xs text-slate-600">
                    {twoFA ? "Enabled • Authenticator app" : "Disabled • Recommended"}
                  </div>
                </div>
                <button
                  onClick={() => setTwoFA(!twoFA)}
                  className={`btn ${twoFA ? "btn-ghost" : "btn-primary"}`}
                >
                  {twoFA ? "Disable" : "Enable"}
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                Manage devices/sessions in <Link href="/admin/signin" className="underline">Admin Console</Link> (admins only).
              </div>
            </div>
          </Card>

          <Card title="About app" subtitle="Version & legal.">
            <div className="grid gap-2 text-sm">
              <div>
                Version: <span className="font-mono">1.0.0</span>
              </div>
              <Link className="underline" href="/privacy">
                Privacy policy
              </Link>
              <Link className="underline" href="/terms">
                Terms of use
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Role blocks */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {session.roles.includes("student") &&
          (session.workspace === "student" || !hasMultipleRoles) && (
            <Card title="For Students" subtitle="Shortcuts for your studies.">
              <GridLinks
                items={[
                  { label: "Timetable", href: "/timetable" },
                  { label: "Results / Grades", href: "/results" },
                  { label: "Fees & payments", href: "/fees" },
                  { label: "Enrollments", href: "/enrollments" },
                  { label: "Attendance", href: "/attendance" },
                  { label: "Advising / appointments", href: "/advising" },
                ]}
              />
            </Card>
          )}

        {session.roles.includes("staff") &&
          (session.workspace === "staff" || !hasMultipleRoles) && (
            <Card title="For Staff" subtitle="Teaching & operations.">
              <GridLinks
                items={[
                  { label: "Class lists / attendance", href: "/staff/classes" },
                  { label: "Room & resource booking", href: "/staff/rooms" },
                  { label: "Approve requests / forms", href: "/staff/approvals" },
                  { label: "Announcements / notices", href: "/staff/announcements" },
                  { label: "Staff directory & extensions", href: "/staff/directory" },
                  { label: "Reports / analytics", href: "/staff/reports" },
                ]}
              />
            </Card>
          )}

        {session.roles.includes("admin") &&
          (session.workspace === "admin" || !hasMultipleRoles) && (
            <Card title="Admin" subtitle="Restricted tools.">
              <GridLinks
                items={[
                  { label: "Open Admin Console", href: "/admin" },
                  { label: "Audit logs", href: "/admin/audit" },
                  { label: "User management", href: "/admin/users" },
                  { label: "Service status", href: "/admin/status" },
                ]}
              />
            </Card>
          )}
      </div>

      {/* avatar input for preview */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onPickAvatar} />
    </div>
  );
}
