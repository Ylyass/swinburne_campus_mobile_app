// Generate and download a single .ics file for an event
export function makeICS({
  title,
  startISO,
  durationMins = 60,
  location = "",
}: {
  title: string;
  startISO: string;
  durationMins?: number;
  location?: string;
}) {
  const toDT = (iso: string) => iso.replace(/[-:]/g, "").split(".")[0] + "Z";
  const start = toDT(startISO);
  const end = toDT(
    new Date(new Date(startISO).getTime() + durationMins * 60000).toISOString()
  );
  const esc = (s: string) => s.replace(/[,;]/g, "\\$&");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Group13//SwinApp//EN",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${esc(title)}`,
    location ? `LOCATION:${esc(location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function downloadICS(filename: string, data: string) {
  const blob = new Blob([data], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
