import Link from "next/link";

export default function FeatureBanner() {
  return (
    <section className="maxw container-px mt-6">
      <div
        className="rounded-2xl p-6 text-white shadow-[0_20px_60px_rgba(212,42,48,.25)] relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#D42A30 0%,#8E0F1B 65%)" }}
        aria-label="Orientation"
      >
        {/* dotted texture */}
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#d)" />
          </svg>
        </div>

        <h2 className="relative text-2xl font-semibold">Orientation</h2>
        <p className="relative text-white/90 text-sm mt-1">
          7 things you should do before starting at Swinburne.
        </p>
        <Link
          href="/orientation"
          className="relative inline-flex mt-4 items-center gap-2 bg-white text-[#D42A30] font-medium px-4 py-2 rounded-xl hover:opacity-90"
        >
          Learn more →
        </Link>
      </div>
    </section>
  );
}
