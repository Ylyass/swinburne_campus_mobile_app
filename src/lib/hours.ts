// Mon–Fri, 9:00–17:00 local time
export function isOfficeOpen(d = new Date()) {
  const day = d.getDay(); // 0 Sun ... 6 Sat
  if (day === 0 || day === 6) return false;
  const h = d.getHours();
  return h >= 9 && h < 17;
}
