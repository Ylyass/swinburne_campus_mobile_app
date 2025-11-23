"use client";
export default function EmergencyFAB({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      className="fixed bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-rose-700 sm:hidden"
      aria-label="Call Campus Security now"
    >
      🚨 Emergency
    </a>
  );
}
