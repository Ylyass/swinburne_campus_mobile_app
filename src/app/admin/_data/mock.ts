// Demo data for Admin dashboard widgets

export const metrics = {
  activeUsersToday: 312,
  peakHour: "11:00",
  openIncidents7d: [2, 2, 1, 3, 2, 1, 1],
  servicesDown7d: [0, 1, 0, 0, 1, 0, 0],
  mostAccessed: "Wi-Fi / Network",
  sla: { within: 18, total: 20 },
  avgResolutionHrs: 3.2,
};

// Heatmap expects: rows: string[], cols: string[], cells: number[][]
const cols = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}:00`);
const rows = [
  "Admissions",
  "Library",
  "Engineering",
  "Student Centre",
  "IT Helpdesk",
  "Security",
  "Cafeteria",
];

// 2-D grid: rows.length arrays, each with cols.length values (0..4-ish)
const cells: number[][] = rows.map((_, r) =>
  cols.map((_, c) => {
    const middayBoost = c >= 10 && c <= 15 ? 2 : 0; // hotter at midday
    const v = (r + c) % 3;                           // 0..2
    return Math.min(4, v + middayBoost);             // clamp to 0..4
  })
);

export const heatmap = { rows, cols, cells };
