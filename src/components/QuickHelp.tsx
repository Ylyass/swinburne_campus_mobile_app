"use client";

const DEFAULT_ITEMS: { label: string; cat?: string; q?: string }[] = [
  { label: "Login issue", cat: "IT Support", q: "login canvas portal password" },
  { label: "Wi-Fi not working", cat: "IT Support", q: "wifi network internet" },
  { label: "Classroom equipment", cat: "Facilities", q: "projector ac classroom" },
  { label: "Counselling", cat: "Wellbeing", q: "counselling wellbeing" },
  { label: "Emergency", cat: "Safety", q: "emergency security" },
  { label: "Library help", cat: "Academic", q: "library referencing" },
];

export default function QuickHelp({
  items = DEFAULT_ITEMS,
  onSelect,
  className,
}: {
  items?: { label: string; cat?: string; q?: string }[];
  onSelect: (v: { cat?: string; q?: string }) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="mb-2 text-sm font-semibold">What do you need help with?</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <button key={i.label} onClick={() => onSelect({ cat: i.cat, q: i.q })}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs hover:bg-slate-50">
            {i.label}
          </button>
        ))}
      </div>
    </div>
  );
}
