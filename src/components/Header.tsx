"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfileMenu from "@/components/ProfileMenu";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200/80 dark:border-slate-700/80 shadow-sm">
      <div className="h-[3px] w-full bg-[#D42A30]" aria-hidden />

      <div className="maxw container-px h-16 flex items-center justify-between">
        <Brand />

        <nav aria-label="Quick links" className="hidden md:flex items-center gap-2">
          <QuickPill href="/navigate"  label="Navigate"  active={pathname.startsWith("/navigate")} />
          <QuickPill href="/emergency" label="Emergency" active={pathname.startsWith("/emergency")} />
          <QuickPill href="/support"   label="Support"   active={pathname.startsWith("/support")} />
          <QuickPill href="/events"    label="Events"    active={pathname.startsWith("/events")} />
          <QuickPill href="https://www.swinburne.edu.my/canvas/" label="Canvas" external />
          <QuickPill
            href="https://login.microsoftonline.com/3f639a9b-27c8-4403-82b1-ebfb88052d15/wsfed?wa=wsignin1.0&wtrealm=https%3a%2f%2fsisportal-100380.campusnexus.cloud%2fCMCPortal%2f&wctx=rm%3d0%26id%3dpassive%26ru%3dsecure%2fstudent%2fstuportal.aspx&wreply=https%3a%2f%2fsisportal-100380.campusnexus.cloud%2fCMCPortal%2f&AppType=Portal&Role=STUDENT"
            label="Student Portal"
            external
          />
        </nav>

        <ProfileMenu className="bg-slate-200 hover:bg-slate-300" srLabel="Open account menu">
          <span aria-hidden>👤</span>
        </ProfileMenu>
      </div>

      <div className="md:hidden border-t border-slate-200/70 dark:border-slate-700/70 bg-white/85 dark:bg-slate-900/85">
        <nav aria-label="Quick links (mobile)" className="maxw container-px py-2 overflow-x-auto no-scrollbar">
          <ul className="flex gap-2 w-max">
            <li><QuickPill href="/navigate"  label="Navigate"  compact /></li>
            <li><QuickPill href="/emergency" label="Emergency" compact /></li>
            <li><QuickPill href="/support"   label="Support"   compact /></li>
            <li><QuickPill href="/events"    label="Events"    compact /></li>
            <li><QuickPill href="https://www.swinburne.edu.my/canvas/" label="Canvas" compact external /></li>
            <li>
              <QuickPill
                href="https://login.microsoftonline.com/3f639a9b-27c8-4403-82b1-ebfb88052d15/wsfed?wa=wsignin1.0&wtrealm=https%3a%2f%2fsisportal-100380.campusnexus.cloud%2fCMCPortal%2f&wctx=rm%3d0%26id%3dpassive%26ru%3dsecure%2fstudent%2fstuportal.aspx&wreply=https%3a%2f%2fsisportal-100380.campusnexus.cloud%2fCMCPortal%2f&AppType=Portal&Role=STUDENT"
                label="Student Portal"
                compact
                external
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Brand() {
  return (
    <Link href="/" aria-label="Swinburne home" className="flex items-center gap-3">
      <Image
        src="/images/swinburne-logo.jpg"
        alt="Swinburne University of Technology"
        width={40}
        height={40}
        priority
        className="rounded-md ring-1 ring-black/10 shadow-sm object-cover"
      />
      <div className="leading-tight">
        <span className="font-semibold tracking-tight text-slate-900 dark:text-white">Swinburne</span>
        <span className="ml-1 text-slate-500 dark:text-slate-400 hidden sm:inline">Sarawak</span>
      </div>
    </Link>
  );
}

function QuickPill({
  href, label, external, active = false, compact = false,
}: {
  href: string;
  label: string;
  external?: boolean;
  active?: boolean;
  compact?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full border transition whitespace-nowrap " +
    (compact ? "text-xs px-2.5 py-1" : "text-sm px-3.5 py-1.5");

  const style = active
    ? "border-[#D42A30] text-[#D42A30] bg-[#D42A30]/5"
    : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-[#D42A30] hover:text-[#D42A30]";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={base + " " + style}
    >
      {label}
      {external && <span className="ml-1" aria-hidden>↗</span>}
    </Link>
  );
}
