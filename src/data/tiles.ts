export type Tile = {
  title: string;
  subtitle?: string;
  href: string;
  external?: boolean;
};

export const coreTiles: Tile[] = [
  { title: "Canvas", subtitle: "Other app", href: "https://canvas.swin.edu.au", external: true },
  { title: "Student Timetable", href: "/timetable" },
  { title: "My Swinburne", href: "https://sso.swin.edu.au", external: true },
  { title: "Study Spaces", href: "/spaces" },
  { title: "Academic Calendar", href: "/calendar" },
  { title: "Library", href: "https://www.swinburne.edu.au/library/", external: true },
  { title: "SwinRadio", href: "/radio" },
  { title: "Events", href: "/events" },
  { title: "Staying Safe", href: "/emergency" },
  { title: "sHQ Queue", href: "/shq" },
  { title: "Staff Directory", href: "/directory" },
  { title: "Contact Us", href: "/support" },
];

export const sideTiles: Tile[] = [
  { title: "Vygo app", href: "https://vygoapp.io", external: true },
  { title: "Maps", href: "/maps" },
];
