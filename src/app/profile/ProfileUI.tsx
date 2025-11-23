"use client";

import Link from "next/link";

/* types */
export type Role = "student" | "staff" | "admin";
export type Workspace = Role;
export type Option<T extends string> = { value: T; label: string };

/* helpers */
export function cap(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

/* atoms */
export function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
      <header className="mb-3 sm:mb-4">
        <h2 className="text-base font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

/* Segmented control: wraps and grows on mobile */
export function Segment<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
  ariaLabel?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-1 rounded-xl border border-slate-200 p-1"
    >
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`flex-1 min-w-[46%] sm:min-w-0 rounded-lg px-3 py-1.5 text-sm transition ${
              selected ? "bg-slate-900 text-white" : "hover:bg-slate-50"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* Bigger tap target on phones */
export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`h-7 w-12 sm:h-6 sm:w-11 rounded-full border transition ${
        checked ? "border-slate-300 bg-slate-900" : "border-slate-300 bg-slate-200"
      }`}
    >
      <span
        className={`block h-6 w-6 sm:h-5 sm:w-5 translate-x-0.5 rounded-full bg-white transition ${
          checked ? "translate-x-[26px] sm:translate-x-[22px]" : ""
        }`}
      />
    </button>
  );
}

export function RoleBadge({ role, current }: { role: Role; current?: boolean }) {
  const tone =
    role === "admin"
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : role === "staff"
      ? "bg-amber-50 text-amber-700 ring-amber-200"
      : "bg-emerald-50 text-emerald-700 ring-emerald-200";
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs ring-1 ${tone}`}>
      {cap(role)}
      {current ? " • current" : ""}
    </span>
  );
}

/* Full-width, comfy buttons on mobile */
export function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex w-full min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
    >
      {children}
      {external && (
        <span className="ml-1" aria-hidden>
          ↗
        </span>
      )}
    </Link>
  );
}

export function GridLinks({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="inline-flex w-full min-h-11 items-center justify-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
        >
          {it.label}
        </Link>
      ))}
    </div>
  );
}

export function LinkHref({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm underline underline-offset-2 hover:text-slate-900"
    >
      {label} <span aria-hidden>↗</span>
    </Link>
  );
}

export function Dropdown<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
}) {
  return (
    <select
      className="input w-full"
      value={value}
      onChange={(e) => {
        const m = options.find((o) => o.value === e.target.value);
        if (m) onChange(m.value);
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function ServiceLinks() {
  return (
    <div className="grid gap-2">
      <LinkHref href="https://www.swinburne.edu.my/canvas/" label="Canvas" />
      <LinkHref href="https://sisportal-100380.campusnexus.cloud/CMCPortal/" label="Student Portal" />
      <LinkHref href="/library" label="Library" />
    </div>
  );
}
