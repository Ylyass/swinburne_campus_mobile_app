// components/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

/* === tiny inline icons, no deps === */
const C = "currentColor";
const IconHome = (p: any) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21V12h6v9"/></svg>
);
const IconMsg = (p: any) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
);
const IconStar = (p: any) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 17.3-5.5 3 1.1-6.3L3 9.7l6.3-.9L12 3l2.7 5.8 6.3.9-4.6 4.3 1.1 6.3z"/></svg>
);
const IconMenu = (p: any) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
);
const IconApps = (p: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
);
const IconX = (p: any) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>
);
const IconSearch = (p: any) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
);
const IconMic = (p: any) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3"/></svg>
);
const IconScan = (p: any) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
);
const IconPhone = (p: any) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z"/></svg>
);
const IconShare = (p: any) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5"/></svg>
);
const IconExit = (p: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M10 3v18"/>
    <path d="M14 7h5a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-5"/>
    <path d="M13 12H3"/>
    <path d="m10 9-3 3 3 3"/>
  </svg>
);

/* === simple model === */
type Action = { key: string; label: string; icon: (p: any) => JSX.Element; href?: string; run?: () => void | Promise<void> };

const EMERGENCY = "082-260-607"; // update if needed
const EXIT_NAV = "/exit-navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [navDim, setNavDim] = useState(false);

  // lock page scroll & touches when any overlay is open
  useEffect(() => {
    const body = document.body as HTMLElement;
    const html = document.documentElement as HTMLElement;
    const scrollY = window.scrollY;
    if (open || scanOpen) {
      (body as any).dataset.scrollLock = "1";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      html.style.overscrollBehaviorY = "contain";
    }
    return () => {
      if ((body as any).dataset.scrollLock) {
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        html.style.overscrollBehaviorY = "";
        delete (body as any).dataset.scrollLock;
        window.scrollTo(0, scrollY);
      }
    };
  }, [open, scanOpen]);

  // fade bottom nav on scroll down; reveal on scroll up
  useEffect(() => {
    if (open || scanOpen) { setNavDim(false); return; }
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (y < 8) setNavDim(false);
          else if (y > last + 4) setNavDim(true);
          else if (y < last - 4) setNavDim(false);
          last = y;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, scanOpen]);

  const tabs = [
    { label: "Home", href: "/", icon: <IconHome /> },
    { label: "Messages", href: "/messages", icon: <IconMsg /> },
    { label: "Favourites", href: "/favourites", icon: <IconStar /> },
    { label: "Menu", href: "/menu", icon: <IconMenu /> },
  ];
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const actions: Action[] = useMemo(
    () => [
      { key: "navigate", label: "Navigate", icon: IconHome, href: "/navigate" },
      { key: "support", label: "Support", icon: IconMenu, href: "/support" },
      { key: "events", label: "Events", icon: IconStar, href: "/events" },
      { key: "messages", label: "Messages", icon: IconMsg, href: "/messages" },
      { key: "favourites", label: "Favourites", icon: IconStar, href: "/favourites" },
      { key: "settings", label: "Settings", icon: IconMenu, href: "/settings" },
      // essentials
      { key: "exit", label: "Exit Navigation", icon: IconExit, href: EXIT_NAV },
      { key: "call", label: `Call Security (${EMERGENCY})`, icon: IconPhone, run: () => { window.location.href = `tel:${EMERGENCY}`; } },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(a => a.label.toLowerCase().includes(q) || a.key.includes(q));
  }, [actions, query]);

  const run = (a: Action) => {
    setOpen(false);
    if (a.run) return a.run();
    if (a.href) router.push(a.href);
  };

  // mic (Web Speech API)
  const recRef = useRef<any>(null);
  const onMic = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition not supported"); return; }
    if (recRef.current) recRef.current.stop();
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => setQuery(e.results[0][0].transcript || "");
    rec.onerror = () => {};
    recRef.current = rec;
    rec.start();
  };

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50"
        data-dim={navDim}
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
        aria-label="Primary"
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 pb-3">
          <div className="nav-chrome relative rounded-[20px] bg-white/85 backdrop-blur-xl ring-1 ring-slate-200/70 shadow-[0_10px_30px_rgba(0,0,0,.10)]">
            <ul className="relative grid grid-cols-5 items-end">
              {/* left 2 */}
              {tabs.slice(0, 2).map(t => (
                <li key={t.href} className="col-span-1">
                  <NavBtn href={t.href} label={t.label} active={isActive(t.href)}>
                    {t.icon}
                  </NavBtn>
                </li>
              ))}
              {/* center FAB */}
              <li className="col-span-1">
                <div className="relative flex items-center justify-center">
                  <button
                    aria-label="Open quick actions"
                    onClick={() => setOpen(true)}
                    className="fab3d relative -translate-y-6 h-14 w-14 rounded-full hover:scale-[1.04] active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D42A30]/70"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full fab3d-halo" />
                    <span className="absolute inset-0 rounded-full ring-4 ring-white" aria-hidden />
                    <span className="absolute inset-[-4px] rounded-full ring-1 ring-[#cbd5e1]/70" aria-hidden />
                    <span className="relative z-10 grid h-full w-full place-items-center rounded-full bg-gradient-to-b from-[#D42A30] to-[#a11e23] shadow-[0_12px_24px_rgba(212,42,48,.35)]">
                      <IconApps />
                    </span>
                  </button>
                </div>
              </li>
              {/* right 2 */}
              {tabs.slice(2).map(t => (
                <li key={t.href} className="col-span-1">
                  <NavBtn href={t.href} label={t.label} active={isActive(t.href)}>
                    {t.icon}
                  </NavBtn>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Quick Sheet (boomerang animation + contained scroll) */}
      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Quick actions">
          <button
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-backdrop"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[720px] px-4 sm:px-6">
            <div className="boomerang-sheet relative mb-[max(env(safe-area-inset-bottom),8px)] overflow-hidden rounded-t-[28px] bg-white ring-1 ring-slate-200/70 shadow-[0_-16px_60px_rgba(2,6,23,.24)]">
              {/* header grid reserves space; no absolute */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-3 pb-2">
                <span aria-hidden className="block" />
                <span aria-hidden className="justify-self-center h-1 w-14 rounded-full bg-slate-300/80" />
                <button
                  onClick={() => setOpen(false)}
                  className="justify-self-end inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[13px] text-slate-600 hover:bg-slate-100"
                  aria-label="Close quick actions"
                >
                  <IconX />Close
                </button>
              </div>

              {/* scrollable body (only this area scrolls) */}
              <div
                className="sheet-scroll max-h-[72vh] overflow-y-auto overscroll-contain px-4 pb-5 pt-1 sm:px-5 space-y-4 controls-row"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Search row with Mic + Scan (more space + safe-area gutter) */}
                <div className="flex items-center gap-3 sm:gap-4 pr-2 sm:pr-3">
                  <div className="flex-1 min-w-0 flex items-center gap-2 rounded-xl ring-1 ring-slate-200 px-3 py-2 bg-white">
                    <IconSearch />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Type, speak, or scan…"
                      className="w-full bg-transparent outline-none text-[14px] placeholder:text-slate-400"
                    />
                  </div>

                  {/* Separate group with generous spacing & fixed tap targets */}
                  <div className="flex items-center gap-4 ml-1 sm:ml-2 mr-1 sm:mr-2">
                    <button
                      onClick={onMic}
                      aria-label="Voice input"
                      className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-transform shrink-0"
                    >
                      <IconMic />
                    </button>

                    <button
                      onClick={() => setScanOpen(true)}
                      aria-label="Open scanner"
                      className="grid h-11 w-11 place-items-center rounded-xl ring-1 ring-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-transform shrink-0"
                    >
                      <IconScan />
                    </button>
                  </div>
                </div>

                {/* Tiles (boomerang + stagger, pro spacing) */}
                <ul className="grid grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                  {filtered.slice(0, 20).map((a, i) => (
                    <li key={a.key} className="boomerang-tile" style={{ animationDelay: `${i * 55}ms` }}>
                      <button
                        onClick={() => run(a)}
                        className="group w-full rounded-2xl bg-white ring-1 ring-slate-200/70 hover:ring-slate-300 shadow-sm hover:shadow transition"
                        aria-label={a.label}
                      >
                        <div className="flex flex-col items-center gap-2.5 p-3">
                          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff5f5] ring-1 ring-[#fecaca] text-[#D42A30] shadow-[0_1px_0_rgba(0,0,0,.03)]">
                            <a.icon />
                          </span>
                          <span className="tile-label text-[12.5px] leading-tight text-slate-700 group-hover:text-slate-900 text-center">
                            {a.label}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanner (BarcodeDetector with camera; fallback to file) */}
      {scanOpen && <Scanner onClose={() => setScanOpen(false)} onResult={(txt) => {
        setScanOpen(false);
        setOpen(false);
        try {
          const u = new URL(txt);
          window.location.href = u.toString();
        } catch {
          navigator.clipboard?.writeText(txt);
          alert(`Scanned: ${txt}`);
        }
      }} />}

      {/* micro CSS for boomerang animation + FAB depth + safe gutter */}
      <style jsx global>{`
        @keyframes backdropIn { from { opacity: 0 } to { opacity: 1 } }
        .animate-backdrop { animation: backdropIn .18s ease-out both; }

        /* === Boomerang (overshoot → return → settle) === */
        @keyframes boomerangSheetIn {
          0%   { opacity: 0; transform: translateY(28px) scale(.985) rotateZ(.2deg); border-radius: 40px; }
          55%  { opacity: 1; transform: translateY(-6px) scale(1.01) rotateZ(-.15deg); }
          85%  { transform: translateY(2px)  scale(.998) rotateZ(.05deg); }
          100% { transform: translateY(0)    scale(1)    rotateZ(0); border-radius: 28px; }
        }
        .boomerang-sheet {
          animation: boomerangSheetIn .42s cubic-bezier(.18,.88,.22,1.05) both;
          transform-origin: bottom center;
          will-change: transform, opacity;
        }

        /* Tile boomerang + stagger */
        @keyframes boomerangItemIn {
          0%   { opacity: 0; transform: translateY(14px) scale(.97) rotateZ(1.5deg); }
          60%  { opacity: 1; transform: translateY(-3px) scale(1.02) rotateZ(-.6deg); }
          100% { transform: translateY(0)    scale(1)    rotateZ(0); }
        }
        .boomerang-tile {
          animation: boomerangItemIn .34s cubic-bezier(.2,.8,.2,1) both;
          will-change: transform, opacity;
        }

        /* 2-line clamp for labels */
        .tile-label {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* prevent scroll chaining/bounce to the page */
        .overscroll-contain { overscroll-behavior: contain; }
        .sheet-scroll { -webkit-overflow-scrolling: touch; }

        /* Right-side safe gutter for small phones/close btn area */
        .controls-row { padding-right: calc(env(safe-area-inset-right) + 12px); }

        /* FAB depth + halo */
        .fab3d { box-shadow: 0 12px 24px rgba(0,0,0,.18), inset 0 2px 4px rgba(255,255,255,.35); }
        .fab3d-halo { box-shadow: 0 0 0 12px rgba(212,42,48,.08), 0 0 0 22px rgba(212,42,48,.04); }

        /* fade bar when page scrolls down */
        nav[data-dim="true"] .nav-chrome { opacity: .10; filter: saturate(.85) blur(.3px); pointer-events: none; }
        nav .nav-chrome { transition: opacity .22s ease, filter .22s ease; }

        @media (prefers-reduced-motion: reduce) {
          .animate-backdrop, .boomerang-sheet, .boomerang-tile { animation: none !important; }
        }
      `}</style>
    </>
  );
}

/* --- pieces --- */
function NavBtn({ href, label, active, children }: {
  href: string; label: string; active?: boolean; children: React.ReactNode;
}) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className="group relative flex h-16 flex-col items-center justify-center gap-1">
      <div className={["grid h-9 w-9 place-items-center rounded-xl transition-all",
        active ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10"
          : "bg-white text-slate-700 ring-1 ring-slate-200 group-hover:ring-slate-300"].join(" ")}
      >
        {children}
      </div>
      <span className={["text-[11.5px] transition-colors", active ? "text-slate-900 font-medium" : "text-slate-600 group-hover:text-slate-800"].join(" ")}>{label}</span>
      {active && <span aria-hidden className="absolute top-0 mt-1 h-1.5 w-1.5 rounded-full bg-[#D42A30]" />}
    </Link>
  );
}

/* --- simple scanner overlay --- */
function Scanner({ onClose, onResult }: { onClose: () => void; onResult: (txt: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const raf = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null); // <-- fixed
  const [supported, setSupported] = useState<boolean>(false);

  useEffect(() => {
    const has = typeof window !== "undefined" && (window as any).BarcodeDetector;
    setSupported(!!has);
    let running = true;

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        streamRef.current = stream;
        if (videoRef.current) {
          (videoRef.current as any).srcObject = stream;
          await videoRef.current.play();
        }
        if (!has) return; // fallback to file input
        const det = new (window as any).BarcodeDetector({ formats: ["qr_code", "aztec", "pdf417", "data_matrix", "code_128"] });
        const tick = async () => {
          if (!running || !videoRef.current) return;
          const codes = await det.detect(videoRef.current).catch(() => []);
          if (codes && codes[0]?.rawValue) { running = false; onResult(codes[0].rawValue); return; }
          raf.current = requestAnimationFrame(tick);
        };
        tick();
      } catch { /* camera blocked */ }
    })();

    return () => {
      running = false;
      if (raf.current) cancelAnimationFrame(raf.current);
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, [onResult]);

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      const has = (window as any).BarcodeDetector;
      if (!has) { alert("No scanner available here"); return; }
      const det = new (window as any).BarcodeDetector();
      const bmp = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width; canvas.height = bmp.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bmp, 0, 0);
      const codes = await det.detect(canvas);
      if (codes && codes[0]?.rawValue) onResult(codes[0].rawValue);
      else alert("No code found in image");
    } catch { alert("Could not scan image"); }
  };

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Scanner">
      <button className="absolute inset-0 bg-slate-900/60 animate-backdrop" onClick={onClose} />
      <div className="absolute inset-x-0 top-[10%] mx-auto w-full max-w-[520px] px-4 sm:px-6">
        <div className="boomerang-sheet overflow-hidden rounded-2xl bg-black/90 ring-1 ring-white/10 shadow-xl">
          <div className="flex items-center justify-between px-3 py-2 text-white/90">
            <span className="text-[13px]">Scan a QR / barcode</span>
            <button onClick={onClose} className="rounded-md px-2 py-1 hover:bg-white/10"><IconX /></button>
          </div>
          <div className="relative aspect-[16/10] bg黑">
            <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-6 rounded-2xl ring-2 ring-white/70"></div>
          </div>
          {!supported && (
            <div className="flex items-center justify-between gap-2 px-3 py-3 bg-white">
              <span className="text-[13px] text-slate-700">Camera scanning not supported — pick a photo</span>
              <label className="rounded-md px-2 py-1 text-[13px] ring-1 ring-slate-300 cursor-pointer hover:bg-slate-50">
                Choose image
                <input type="file" accept="image/*" capture="environment" hidden onChange={onPickFile} />
              </label>
            </div>
          )}
          {supported && (
            <div className="px-3 py-2 bg-white text-[12.5px] text-slate-600">
              Tip: center the code in the frame. We’ll auto-open URLs, copy other text.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
