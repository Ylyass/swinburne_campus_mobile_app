"use client";
import Link from "next/link";

export default function SideTile({
  tile,
}: { tile: { title: string; href: string; external?: boolean } }) {
  const body = (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 h-[92px]
                    shadow-[0_6px_16px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-out
                    hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)]">
      <div className="text-sm font-semibold">{tile.title}</div>
      <div className="mt-1 text-xs text-gray-500">Open</div>
    </div>
  );
  return tile.external ? (
    <a href={tile.href} target="_blank" rel="noreferrer">{body}</a>
  ) : (
    <Link href={tile.href}>{body}</Link>
  );
}
