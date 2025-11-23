import { CampusEvent } from "@/lib/types";

export const EVENTS: CampusEvent[] = [
  // Past (Aug–Sep)
  {
    id: "cs-orientation-aug",
    title: "Orientation: 7 things before starting at Swinburne",
    description: "Fast on-boarding for new students with campus tour.",
    date: "2025-08-25T09:00:00+08:00",
    endDate: "2025-08-25T11:00:00+08:00",
    venue: {
      building: "A002 Lecture Hall",
      level: "Ground Floor",
      room: "A002"
    },
    category: "Orientation",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Student Engagement",
    tags: ["new students", "campus tour", "orientation"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "hearing loop available"]
  },
  {
    id: "film-night-sep",
    title: "Friday Film Night",
    description: "Relax with friends — weekly screening by Film Club.",
    date: "2025-09-19T19:30:00+08:00",
    endDate: "2025-09-19T22:00:00+08:00",
    venue: {
      building: "Student Hub",
      level: "Level 1",
      room: "Media Room"
    },
    category: "Club",
    images: {
      thumbnail: "/images/canvas-logo.png",
      hero: "/images/sample.jpg"
    },
    organizer: "Film Club",
    tags: ["film", "social", "weekly"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible"]
  },

  // ✅ TODAY for testing (Oct 6, 2025)
  {
    id: "today-demo",
    title: "Pop-up: Student Services Desk",
    description: "Q&A about enrolment, ID cards, and support.",
    date: "2025-10-06T16:45:00+08:00",
    endDate: "2025-10-06T18:00:00+08:00",
    venue: {
      building: "Main Foyer",
      level: "Ground Floor"
    },
    category: "Other",
    images: {
      thumbnail: "/images/swinburne-logo.jpg",
      hero: "/images/swinburne-logo.jpg"
    },
    organizer: "Student Services",
    tags: ["support", "enrollment", "ID cards"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible"],
    lat: 1.4670,
    lng: 110.4285,
  },

  // This ISO week (Mon 6 → Sun 12 Oct)
  {
    id: "cyber-lab-oct",
    title: "Hands-on Cybersecurity Lab",
    description: "Incident triage using Sysinternals and Wireshark.",
    date: "2025-10-07T14:00:00+08:00",
    endDate: "2025-10-07T17:00:00+08:00",
    venue: {
      building: "CS Block",
      level: "Level 3",
      room: "Lab 3.12"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/swinburne-logo.jpg",
      hero: "/images/campus-map.jpeg"
    },
    organizer: "School of Computing",
    tags: ["cybersecurity", "hands-on", "technical"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://forms.gle/cyber-lab" },
    accessibility: ["wheelchair accessible", "laptop required"]
  },
  {
    id: "ai-talk-oct",
    title: "Guest Talk: Building AI Products that Ship",
    description: "From prototype to production: lessons from industry.",
    date: "2025-10-10T10:00:00+08:00",
    endDate: "2025-10-10T11:30:00+08:00",
    venue: {
      building: "Innovation Hub",
      level: "Level 2",
      room: "Auditorium"
    },
    category: "Talk",
    images: {
      thumbnail: "/images/canvas-logo.png",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Industry Partnerships",
    tags: ["AI", "industry", "guest speaker"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "hearing loop available"],
    lat: 1.4673,
    lng: 110.4289,
  },
  {
    id: "sports-day-oct",
    title: "Campus Sports Day",
    description: "Friendly futsal, badminton, and table tennis matches.",
    date: "2025-10-12T09:00:00+08:00",
    endDate: "2025-10-12T15:00:00+08:00",
    venue: {
      building: "Sports Centre",
      level: "Ground Floor"
    },
    category: "Sports",
    images: {
      thumbnail: "/images/swinburne-student_portal.png",
      hero: "/images/sample.jpg"
    },
    organizer: "Student Council",
    tags: ["sports", "futsal", "badminton", "table tennis"],
    pricing: { type: "free" },
    registration: { type: "form", url: "https://forms.gle/sports-day" },
    accessibility: ["wheelchair accessible"],
    lat: 1.4675,
    lng: 110.4291,
  },

  // November (upcoming)
  {
    id: "hackathon-nov",
    title: "24-Hour Hackathon: Smart Campus",
    description: "Form a team and build a prototype for campus life.",
    date: "2025-11-03T09:00:00+08:00",
    endDate: "2025-11-04T09:00:00+08:00",
    venue: {
      building: "A002 + Lab cluster",
      level: "Ground Floor",
      room: "A002 + Labs 1.01-1.05"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/swinburne-student_portal.png",
      hero: "/images/campus-map.jpeg"
    },
    organizer: "Innovation Hub",
    tags: ["hackathon", "24-hour", "team building", "prototype"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://forms.gle/hackathon", deadline: "2025-10-30T23:59:00+08:00" },
    accessibility: ["wheelchair accessible", "laptop required", "overnight accommodation available"]
  },
  {
    id: "library-howto-nov",
    title: "Library How-To: Research Faster",
    description: "Find credible sources, cite properly, avoid plagiarism.",
    date: "2025-11-07T13:00:00+08:00",
    endDate: "2025-11-07T14:00:00+08:00",
    venue: {
      building: "Library",
      level: "Level 2",
      room: "Lecture Theatre"
    },
    category: "Talk",
    images: {
      thumbnail: "/images/canvas-logo.png",
      hero: "/images/sample.jpg"
    },
    organizer: "Library",
    tags: ["research", "academic", "citation", "plagiarism"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "hearing loop available"]
  },
  {
    id: "clubs-day-nov",
    title: "Clubs & Societies Day",
    description: "Discover and join student clubs, from AI to film.",
    date: "2025-11-12T10:00:00+08:00",
    endDate: "2025-11-12T16:00:00+08:00",
    venue: {
      building: "Student Square",
      level: "Outdoor"
    },
    category: "Club",
    images: {
      thumbnail: "/images/swinburne-logo.jpg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Student Council",
    tags: ["clubs", "societies", "networking", "student life"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible"]
  },
  {
    id: "resume-clinic-nov",
    title: "Resume & LinkedIn Clinic",
    description: "One-to-one review with Career Services.",
    date: "2025-11-18T09:30:00+08:00",
    endDate: "2025-11-18T12:00:00+08:00",
    venue: {
      building: "Career Services",
      level: "Level 1",
      room: "Career Services Office"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/swinburne-student_portal.png",
      hero: "/images/sample.jpg"
    },
    organizer: "Career Services",
    tags: ["career", "resume", "linkedin", "one-to-one"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://forms.gle/resume-clinic" },
    accessibility: ["wheelchair accessible"]
  },

  // December (upcoming)
  {
    id: "open-day-dec",
    title: "Open Day — Swinburne Sarawak",
    description: "Campus tours, labs, and course briefings for visitors.",
    date: "2025-12-02T09:00:00+08:00",
    endDate: "2025-12-02T16:00:00+08:00",
    venue: {
      building: "Main Foyer",
      level: "Ground Floor"
    },
    category: "Orientation",
    images: {
      thumbnail: "/images/swinburne-logo.jpg",
      hero: "/images/campus-map.jpeg"
    },
    organizer: "Marketing & Events",
    tags: ["open day", "campus tour", "prospective students"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://forms.gle/open-day" },
    accessibility: ["wheelchair accessible", "guided tours available"]
  },
  {
    id: "wellness-fair-dec",
    title: "Wellness Fair",
    description: "Free health checks, mindfulness mini-workshops.",
    date: "2025-12-10T10:00:00+08:00",
    endDate: "2025-12-10T14:00:00+08:00",
    venue: {
      building: "Student Hub",
      level: "Level 1"
    },
    category: "Other",
    images: {
      thumbnail: "/images/canvas-logo.png",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Student Services",
    tags: ["wellness", "health", "mindfulness", "free"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible"]
  },
  {
    id: "winter-concert-dec",
    title: "Winter Concert",
    description: "Year-end celebration featuring student bands.",
    date: "2025-12-15T19:00:00+08:00",
    endDate: "2025-12-15T21:00:00+08:00",
    venue: {
      building: "Auditorium",
      level: "Level 2"
    },
    category: "Club",
    images: {
      thumbnail: "/images/swinburne-student_portal.png",
      hero: "/images/sample.jpg"
    },
    organizer: "Music Club",
    tags: ["concert", "music", "year-end", "celebration"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "hearing loop available"]
  },
];

export default EVENTS;
