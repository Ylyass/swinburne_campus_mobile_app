import { CampusEvent } from "@/lib/types";

export const EVENTS: CampusEvent[] = [
  // Orientation Week Events
  {
    id: "cs-orientation-aug",
    title: "Orientation: 7 things before starting at Swinburne",
    description: "Essential onboarding session for new students covering campus navigation, academic resources, student services, and building your network. Includes campus tour and Q&A session.",
    date: "2025-02-10T09:00:00+08:00",
    endDate: "2025-02-10T11:30:00+08:00",
    venue: {
      building: "Advanced Technologies Centre",
      level: "Ground Floor",
      room: "ATC101 Lecture Theatre"
    },
    category: "Orientation",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Student Engagement",
    tags: ["new students", "campus tour", "orientation", "welcome week"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "hearing loop available", "auslan interpreter"]
  },
  {
    id: "library-orientation",
    title: "Library & Research Resources Workshop",
    description: "Learn to navigate the library system, access online databases, and master research techniques. Essential for all students starting their academic journey.",
    date: "2025-02-11T10:00:00+08:00",
    endDate: "2025-02-11T12:00:00+08:00",
    venue: {
      building: "George Swinburne Library",
      level: "Level 2",
      room: "Training Room B"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Library Services",
    tags: ["library", "research", "academic skills", "orientation"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/events" },
    accessibility: ["wheelchair accessible", "quiet room available"]
  },
  {
    id: "student-clubs-expo",
    title: "Student Clubs & Societies Expo",
    description: "Discover over 80 student clubs and societies! Meet current members, learn about activities, and sign up for clubs that match your interests.",
    date: "2025-02-12T11:00:00+08:00",
    endDate: "2025-02-12T15:00:00+08:00",
    venue: {
      building: "Student Hub",
      level: "Ground Floor",
      room: "Main Atrium"
    },
    category: "Club",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Student Association",
    tags: ["clubs", "societies", "networking", "student life"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "seated rest areas"]
  },

  // Academic Workshops
  {
    id: "ai-machine-learning-workshop",
    title: "AI & Machine Learning: Getting Started",
    description: "Hands-on workshop covering Python basics, ML algorithms, and practical applications. Bring your laptop and dive into the world of artificial intelligence.",
    date: "2025-02-15T14:00:00+08:00",
    endDate: "2025-02-15T17:00:00+08:00",
    venue: {
      building: "Advanced Manufacturing & Design Centre",
      level: "Level 3",
      room: "AMDC301 Computer Lab"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Faculty of Science, Computing and Engineering",
    tags: ["AI", "machine learning", "python", "coding", "technology"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/workshops", deadline: "2025-02-13T23:59:00+08:00" },
    accessibility: ["wheelchair accessible", "adjustable desks"],
    capacity: 30
  },
  {
    id: "design-thinking-bootcamp",
    title: "Design Thinking Bootcamp",
    description: "Learn the principles of design thinking through interactive exercises. Develop problem-solving skills applicable to any field or industry.",
    date: "2025-02-18T09:00:00+08:00",
    endDate: "2025-02-18T16:00:00+08:00",
    venue: {
      building: "Design Hub",
      level: "Level 1",
      room: "Studio A"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Faculty of Design",
    tags: ["design thinking", "innovation", "problem solving", "creative"],
    pricing: { type: "paid", amount: 25, currency: "MYR" },
    registration: { type: "link", url: "https://swinburne.edu.au/design-workshops" },
    accessibility: ["wheelchair accessible", "flexible seating"],
    capacity: 24
  },
  {
    id: "public-speaking-masterclass",
    title: "Public Speaking & Presentation Masterclass",
    description: "Build confidence in public speaking and presentations. Learn techniques from professional speakers and practice with supportive peers.",
    date: "2025-02-20T13:00:00+08:00",
    endDate: "2025-02-20T15:30:00+08:00",
    venue: {
      building: "Advanced Technologies Centre",
      level: "Level 2",
      room: "ATC205 Seminar Room"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Student Success Centre",
    tags: ["public speaking", "presentations", "communication", "soft skills"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/skills" },
    accessibility: ["wheelchair accessible", "hearing loop available"],
    capacity: 20
  },

  // Career & Industry Events
  {
    id: "tech-career-fair-2025",
    title: "Technology & Engineering Career Fair 2025",
    description: "Meet leading employers from tech, engineering, and IT sectors. Bring your resume, dress professionally, and prepare to network with recruiters.",
    date: "2025-03-05T10:00:00+08:00",
    endDate: "2025-03-05T16:00:00+08:00",
    venue: {
      building: "Student Hub",
      level: "Ground Floor",
      room: "Exhibition Hall"
    },
    category: "Other",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Career Services",
    tags: ["careers", "employment", "networking", "technology", "engineering"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/careers" },
    accessibility: ["wheelchair accessible", "seated interview areas"],
    capacity: 500
  },
  {
    id: "resume-linkedin-workshop",
    title: "Resume Writing & LinkedIn Profile Optimization",
    description: "Learn how to craft a compelling resume and optimize your LinkedIn profile. Get personalized feedback from career advisors.",
    date: "2025-03-08T14:00:00+08:00",
    endDate: "2025-03-08T16:00:00+08:00",
    venue: {
      building: "Student Hub",
      level: "Level 1",
      room: "Career Lab"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Career Services",
    tags: ["resume", "linkedin", "careers", "job search", "professional development"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/career-workshops" },
    accessibility: ["wheelchair accessible", "computer provided"],
    capacity: 25
  },
  {
    id: "industry-networking-night",
    title: "Industry Networking Night: Business & Innovation",
    description: "Connect with alumni, industry professionals, and entrepreneurs. Perfect opportunity to build your professional network in a casual setting.",
    date: "2025-03-12T18:00:00+08:00",
    endDate: "2025-03-12T20:30:00+08:00",
    venue: {
      building: "Innovation Hub",
      level: "Ground Floor",
      room: "Event Space"
    },
    category: "Other",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Alumni Relations & Career Services",
    tags: ["networking", "business", "innovation", "alumni", "careers"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/networking", deadline: "2025-03-10T23:59:00+08:00" },
    accessibility: ["wheelchair accessible", "dietary requirements catered"],
    capacity: 80
  },

  // Student Life & Social Events
  {
    id: "friday-film-night-march",
    title: "Friday Film Night: Student Choice",
    description: "Relax with friends at our weekly movie screening. Popcorn and drinks provided! This week's film chosen by student vote.",
    date: "2025-03-14T19:00:00+08:00",
    endDate: "2025-03-14T22:00:00+08:00",
    venue: {
      building: "Student Hub",
      level: "Level 2",
      room: "Theatre"
    },
    category: "Club",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Film Society",
    tags: ["film", "social", "entertainment", "student life"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "subtitles available", "companion seating"]
  },
  {
    id: "cultural-festival-2025",
    title: "International Cultural Festival",
    description: "Celebrate diversity with performances, food stalls, and cultural displays from around the world. Join us for a day of music, dance, and delicious cuisine.",
    date: "2025-03-18T11:00:00+08:00",
    endDate: "2025-03-18T17:00:00+08:00",
    venue: {
      building: "Campus Green",
      level: "Outdoor",
      room: "Main Lawn"
    },
    category: "Club",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "International Students Association",
    tags: ["cultural", "international", "festival", "food", "entertainment"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "shaded seating", "prayer room nearby"]
  },
  {
    id: "wellness-yoga-session",
    title: "Wellness Week: Sunrise Yoga & Meditation",
    description: "Start your day with mindfulness. Suitable for all levels - bring your mat or use ours. Focus on breathing, stretching, and mental wellbeing.",
    date: "2025-03-21T07:00:00+08:00",
    endDate: "2025-03-21T08:00:00+08:00",
    venue: {
      building: "Sports Complex",
      level: "Ground Floor",
      room: "Multipurpose Hall"
    },
    category: "Sports",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Student Health & Wellbeing",
    tags: ["wellness", "yoga", "meditation", "health", "fitness"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/wellness" },
    accessibility: ["wheelchair accessible", "mats provided", "beginner friendly"],
    capacity: 40
  },

  // Sports & Recreation
  {
    id: "intramural-basketball-march",
    title: "Intramural Basketball Tournament",
    description: "Form teams and compete in our 3-on-3 basketball tournament. Prizes for winners and runners-up. All skill levels welcome!",
    date: "2025-03-25T15:00:00+08:00",
    endDate: "2025-03-25T19:00:00+08:00",
    venue: {
      building: "Sports Complex",
      level: "Ground Floor",
      room: "Basketball Courts"
    },
    category: "Sports",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Sports & Recreation",
    tags: ["basketball", "sports", "competition", "tournament", "team"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/sports", deadline: "2025-03-23T23:59:00+08:00" },
    accessibility: ["wheelchair accessible", "spectator seating", "water stations"],
    capacity: 64
  },
  {
    id: "hiking-club-adventure",
    title: "Hiking Club: Mountain Trail Adventure",
    description: "Join us for a guided hike through scenic mountain trails. Transport provided. Bring water, snacks, and proper footwear.",
    date: "2025-03-29T08:00:00+08:00",
    endDate: "2025-03-29T15:00:00+08:00",
    venue: {
      building: "Meeting Point: Main Entrance",
      level: "Ground Floor",
      room: "Bus Departure Zone"
    },
    category: "Sports",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Outdoor Adventure Club",
    tags: ["hiking", "outdoor", "adventure", "nature", "fitness"],
    pricing: { type: "paid", amount: 15, currency: "MYR" },
    registration: { type: "link", url: "https://swinburne.edu.au/outdoors", deadline: "2025-03-27T23:59:00+08:00" },
    accessibility: ["moderate fitness required", "first aid provided"],
    capacity: 30
  },

  // Guest Lectures & Talks
  {
    id: "tech-innovation-talk",
    title: "Guest Lecture: The Future of Tech Innovation",
    description: "Renowned tech entrepreneur shares insights on emerging technologies, startup culture, and innovation in Southeast Asia.",
    date: "2025-04-02T16:00:00+08:00",
    endDate: "2025-04-02T18:00:00+08:00",
    venue: {
      building: "Advanced Technologies Centre",
      level: "Ground Floor",
      room: "ATC Auditorium"
    },
    category: "Talk",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Faculty of Science, Computing and Engineering",
    tags: ["technology", "innovation", "guest speaker", "entrepreneurship"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/talks" },
    accessibility: ["wheelchair accessible", "hearing loop available", "live streaming"],
    capacity: 200
  },
  {
    id: "sustainability-seminar",
    title: "Sustainability in Design: Creating a Better Future",
    description: "Explore sustainable design principles and their real-world applications. Learn how designers are addressing climate change and environmental challenges.",
    date: "2025-04-08T13:00:00+08:00",
    endDate: "2025-04-08T15:00:00+08:00",
    venue: {
      building: "Design Hub",
      level: "Level 2",
      room: "Lecture Theatre"
    },
    category: "Talk",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Faculty of Design",
    tags: ["sustainability", "design", "environment", "innovation"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "hearing loop available"],
    capacity: 150
  },

  // Creative & Arts Events
  {
    id: "student-art-exhibition",
    title: "Student Art & Design Exhibition 2025",
    description: "Showcase of exceptional work from design and art students. Opening night includes artist talks and networking with the creative community.",
    date: "2025-04-15T18:00:00+08:00",
    endDate: "2025-04-15T21:00:00+08:00",
    venue: {
      building: "Design Hub",
      level: "Ground Floor",
      room: "Gallery Space"
    },
    category: "Other",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Faculty of Design",
    tags: ["art", "exhibition", "design", "creative", "student showcase"],
    pricing: { type: "free" },
    registration: { type: "none" },
    accessibility: ["wheelchair accessible", "seating available", "quiet viewing times"]
  },
  {
    id: "music-open-mic",
    title: "Open Mic Night: Showcase Your Talent",
    description: "Share your musical talents or simply enjoy performances from fellow students. All genres welcome - acoustic, vocal, beatbox, and more!",
    date: "2025-04-19T19:00:00+08:00",
    endDate: "2025-04-19T22:00:00+08:00",
    venue: {
      building: "Student Hub",
      level: "Ground Floor",
      room: "Performance Space"
    },
    category: "Club",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Music Society",
    tags: ["music", "performance", "open mic", "entertainment", "talent"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/music" },
    accessibility: ["wheelchair accessible", "hearing loop available", "seated viewing"],
    capacity: 100
  },

  // Academic Support
  {
    id: "exam-prep-workshop",
    title: "Exam Preparation & Study Strategies Workshop",
    description: "Learn effective study techniques, time management, and stress reduction strategies. Perfect timing before mid-semester exams!",
    date: "2025-04-22T14:00:00+08:00",
    endDate: "2025-04-22T16:00:00+08:00",
    venue: {
      building: "George Swinburne Library",
      level: "Level 3",
      room: "Study Skills Centre"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Student Success Centre",
    tags: ["study skills", "exam prep", "academic support", "time management"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/study-support" },
    accessibility: ["wheelchair accessible", "materials provided"],
    capacity: 30
  },

  // Special Events
  {
    id: "hackathon-2025",
    title: "Swinburne Hackathon 2025: 24-Hour Challenge",
    description: "Build innovative solutions in 24 hours! Teams compete for prizes while tackling real-world problems. Food, drinks, and mentorship provided throughout.",
    date: "2025-04-26T18:00:00+08:00",
    endDate: "2025-04-27T18:00:00+08:00",
    venue: {
      building: "Innovation Hub",
      level: "All Floors",
      room: "Multiple Spaces"
    },
    category: "Workshop",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "Technology Society & Faculty of SCE",
    tags: ["hackathon", "coding", "innovation", "competition", "technology"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/hackathon", deadline: "2025-04-24T23:59:00+08:00" },
    accessibility: ["wheelchair accessible", "rest areas", "dietary requirements catered"],
    capacity: 120
  },
  {
    id: "graduation-ceremony-april",
    title: "Graduation Ceremony - April 2025",
    description: "Celebrate your achievements with family and friends. Professional photography available. Formal attire required.",
    date: "2025-04-30T10:00:00+08:00",
    endDate: "2025-04-30T13:00:00+08:00",
    venue: {
      building: "Main Campus",
      level: "Outdoor",
      room: "Ceremonial Grounds"
    },
    category: "Other",
    images: {
      thumbnail: "/images/campus-map.jpeg",
      hero: "/images/courtyard.jpeg"
    },
    organizer: "University Administration",
    tags: ["graduation", "ceremony", "celebration", "milestone"],
    pricing: { type: "free" },
    registration: { type: "link", url: "https://swinburne.edu.au/graduation", deadline: "2025-04-15T23:59:00+08:00" },
    accessibility: ["wheelchair accessible", "reserved seating", "auslan interpreter", "accessible parking"]
  }
];