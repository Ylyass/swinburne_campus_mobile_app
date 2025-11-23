"use client";

import Header from "@/components/Header";
import FeatureBanner from "@/components/FeatureBanner";
import TileCard from "@/components/TileCard";
import {
  PhoneIcon, ShieldIcon, CompassIcon, MapPinIcon,
  ChatIcon, CalendarIcon, BookIcon,
} from "@/components/icons";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <FeatureBanner />

      {/* Emergency & Safety */}
      <section className="maxw container-px mt-8">
        <h3 className="text-lg font-semibold mb-3">🚨 Emergency & Safety</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <TileCard href="/emergency" title="Security Contact" icon={<PhoneIcon />} tone="red" />
          <TileCard href="/safety"    title="Staying Safe"     icon={<ShieldIcon />} tone="red" />
        </div>
      </section>

      {/* Campus Navigation */}
      <section className="maxw container-px mt-8">
        <h3 className="text-lg font-semibold mb-3">🧭 Campus Navigation</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <TileCard href="/navigate" title="Navigate"    icon={<CompassIcon />} tone="black" />
          <TileCard href="/maps"     title="Maps"        icon={<MapPinIcon />}  tone="black" />
        </div>
      </section>

      {/* Support & Events */}
      <section className="maxw container-px mt-8">
        <h3 className="text-lg font-semibold mb-3">💬 Support & 📅 Events</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <TileCard href="/support" title="Live Support" icon={<ChatIcon />}      />
          <TileCard href="/events"  title="Events"       icon={<CalendarIcon />}  />
        </div>
      </section>

      {/* Academics */}
      <section className="maxw container-px mt-8">
        <h3 className="text-lg font-semibold mb-3">🎓 Academics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <TileCard href="/timetable" title="Timetable" icon={<CalendarIcon />} />
          <TileCard href="/library"   title="Library"   icon={<BookIcon />}     />
        </div>
      </section>

      <footer className="maxw container-px my-12 text-xs text-slate-500">
        © Swinburne 2025 · Privacy · We respectfully acknowledge the Wurundjeri People…
      </footer>
    </div>
  );
}


