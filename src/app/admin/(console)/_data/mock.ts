// Source of truth for the dashboard widgets (mocked for Sprint 1)
export const metrics = {
  activeUsersToday: 512,
  peakHour: "10:00–11:00",
  mostAccessed: "Canvas",
  openIncidents7d: [6, 5, 5, 4, 3, 3, 2],
  servicesDown7d: [1, 1, 0, 0, 0, 1, 0],
  sla: { within: 37, total: 42 }, // 88.1%
  avgResolutionHrs: 6.4,
};

export const heatmap = {
  cols: ["IT", "Wi-Fi", "Portal", "Facilities", "Safety"],
  rows: ["A-Block", "B-Block", "C-Block", "Library"],
  // 0 ok, 1 warn, 2 down, 3 maint
  cells: [
    [0,1,0,0,0],
    [1,1,0,0,0],
    [0,2,0,1,0],
    [0,1,0,0,0],
  ],
};

export const globalIndex = [
  { type:"incident", id:"INC-2341", title:"Wi-Fi latency B-Block" },
  { type:"banner", id:"BAN-109", title:"Power maintenance tonight" },
  { type:"service", id:"SVC-21", title:"Canvas" },
  { type:"log", id:"LOG-981", title:"admin closed incident INC-2337" },
];
