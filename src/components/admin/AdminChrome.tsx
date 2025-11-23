"use client";

import MobileHeader from "@/components/admin/MobileHeader";
import BottomNav from "@/components/admin/AdminBottomNav";

export default function AdminChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileHeader />
      {/* Give every page enough bottom padding to clear the fixed nav */}
      <div className="min-h-[100dvh] pb-[calc(64px+env(safe-area-inset-bottom))] sm:pb-8">
        {children}
      </div>
      <BottomNav />
    </>
  );
}
