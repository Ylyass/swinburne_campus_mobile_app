import Link from "next/link";

type Item = { href: string; label: string; external?: boolean; icon: string };

const items: Item[] = [
  { href: "/navigate", label: "Navigate", icon: "🧭" },
  { href: "/maps",     label: "Maps",     icon: "🗺️" },
  { href: "/support",  label: "IT Support", icon: "🛠️" },
  { href: "https://www.swinburne.edu.my/canvas/", label: "Canvas", external: true, icon: "🎓" },
  {
    href: "https://login.microsoftonline.com/3f639a9b-27c8-4403-82b1-ebfb88052d15/wsfed?wa=wsignin1.0&wtrealm=https%3a%2f%2fsisportal-100380.campusnexus.cloud%2fCMCPortal%2f&wctx=rm%3d0%26id%3dpassive%26ru%3dsecure%2fstudent%2fstuportal.aspx&wreply=https%3a%2f%2fsisportal-100380.campusnexus.cloud%2fCMCPortal%2f&AppType=Portal&Role=STUDENT",
    label: "Student Portal",
    external: true,
    icon: "🪪",
  },
];

export default function PinnedShortcuts() {
  return (
    <div className="maxw container-px mt-4">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {items.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            target={it.external ? "_blank" : undefined}
            rel={it.external ? "noopener noreferrer" : undefined}
            className="shrink-0 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-[#D42A30] hover:text-[#D42A30] transition"
          >
            <span aria-hidden>{it.icon}</span>
            {it.label}
            {it.external && <span aria-hidden>↗</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
