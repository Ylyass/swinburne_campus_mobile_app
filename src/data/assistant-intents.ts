/**
 * Department and service contact information
 */
export const DEPARTMENTS = {
  finance: {
    name: 'Finance Service Desk',
    email: 'fin-servicedesk@swinburne.edu.my',
    hours: 'Mon–Fri 8:00–17:00',
    description: 'Fees, refunds, receipts, payment issues',
  },
  it: {
    name: 'IT Helpdesk',
    email: 'it-helpdesk@swinburne.edu.my',
    hours: 'Mon–Fri 9:00–17:00',
    description: 'Wi-Fi, Canvas, password resets, device help',
  },
  library: {
    name: 'Library',
    email: 'library@swinburne.edu.my',
    hours: 'Mon–Sat 9:00–21:00',
    description: 'Study spaces, borrowing, research help',
  },
  admissions: {
    name: 'Student Information Centre (SIC)',
    email: 'sic@swinburne.edu.my',
    hours: 'Mon–Fri 8:00–17:00',
    description: 'Enrolment, student cards, general admin',
  },
  international: {
    name: 'International Student Services',
    email: 'iss@swinburne.edu.my',
    hours: 'Mon–Fri 8:00–17:00',
    description: 'Visas, passes, international support',
  },
  security: {
    name: 'Campus Security',
    phone: '+60 82 xxxx xxx',
    description: 'Non-emergency security matters',
  },
} as const;

/**
 * Quick action categories for "More" drawer
 */
export const QUICK_CATEGORIES = {
  accounts: {
    label: 'Accounts',
    icon: '👤',
    items: [
      { label: 'Canvas login', query: 'canvas login', icon: '🎓' },
      { label: 'Reset password', query: 'forgot password', icon: '🔑' },
      { label: 'Student Portal', query: 'student portal', icon: '🌐' },
    ],
  },
  learning: {
    label: 'Learning',
    icon: '📚',
    items: [
      { label: 'Library hours', query: 'library hours', icon: '📚' },
      { label: 'Find my timetable', query: 'where\'s my timetable', icon: '📅' },
      { label: 'Wi-Fi help', query: 'wifi not working', icon: '📶' },
    ],
  },
  facilities: {
    label: 'Facilities',
    icon: '🏢',
    items: [
      { label: 'Report facilities issue', query: 'facilities request', icon: '🛠️' },
      { label: 'Parking info', query: 'parking', icon: '🅿️' },
    ],
  },
  events: {
    label: 'Events',
    icon: '📆',
    items: [
      { label: 'Events today', query: 'events today', icon: '📆' },
      { label: 'Events this week', query: 'events this week', icon: '🗓️' },
    ],
  },
  admin: {
    label: 'Admin',
    icon: '📋',
    items: [
      { label: 'Finance desk email', query: 'finance email', icon: '💰' },
      { label: 'Admissions email', query: 'admissions email', icon: '📝' },
      { label: 'Security contact', query: 'security contact', icon: '🚨' },
    ],
  },
} as const;

/**
 * Intent matcher for free-text queries
 */
export interface Intent {
  type: 'department' | 'events' | 'help' | 'clarify';
  department?: keyof typeof DEPARTMENTS;
  topic?: string;
  confidence: 'high' | 'low';
  suggestions?: Array<{ label: string; query: string }>;
}

export function matchIntent(query: string): Intent {
  const q = query.toLowerCase().trim();
  
  // High-confidence department matches
  if (q.includes('finance') || q.includes('fees') || q.includes('payment') || q.includes('refund')) {
    return { type: 'department', department: 'finance', confidence: 'high' };
  }
  
  if (q.includes('it') || q.includes('wifi') || q.includes('wi-fi') || q.includes('canvas') || q.includes('password')) {
    return { type: 'department', department: 'it', confidence: 'high' };
  }
  
  if (q.includes('library') || q.includes('study') || q.includes('book')) {
    return { type: 'department', department: 'library', confidence: 'high' };
  }
  
  if (q.includes('admissions') || q.includes('enrol') || q.includes('student card') || q.includes('sic')) {
    return { type: 'department', department: 'admissions', confidence: 'high' };
  }
  
  if (q.includes('international') || q.includes('visa') || q.includes('pass') || q.includes('iss')) {
    return { type: 'department', department: 'international', confidence: 'high' };
  }
  
  if (q.includes('security') && !q.includes('emergency')) {
    return { type: 'department', department: 'security', confidence: 'high' };
  }
  
  // Events
  if (q.includes('event') || q.includes('today') || q.includes('this week') || q.includes('happening')) {
    return { type: 'events', topic: q.includes('today') ? 'today' : 'week', confidence: 'high' };
  }
  
  // Ambiguous - needs clarification
  if (q.includes('email') && !q.match(/finance|it|library|admission|international/i)) {
    return {
      type: 'clarify',
      confidence: 'low',
      suggestions: [
        { label: 'Finance', query: 'finance email' },
        { label: 'IT Helpdesk', query: 'it helpdesk email' },
        { label: 'Admissions', query: 'admissions email' },
      ],
    };
  }
  
  if (q.includes('contact') || q.includes('help') || q.includes('support')) {
    return {
      type: 'clarify',
      confidence: 'low',
      suggestions: [
        { label: 'IT Helpdesk', query: 'it helpdesk' },
        { label: 'Finance', query: 'finance' },
        { label: 'Admissions', query: 'admissions' },
      ],
    };
  }
  
  // Low confidence - generic help
  return {
    type: 'help',
    confidence: 'low',
  };
}

/**
 * Get next-step actions based on intent
 */
export function getNextSteps(intent: Intent, department?: keyof typeof DEPARTMENTS): Array<{ label: string; action: string; type: 'copy' | 'mailto' | 'page' | 'query' }> {
  if (intent.type === 'department' && department) {
    const dept = DEPARTMENTS[department];
    const steps: Array<{ label: string; action: string; type: 'copy' | 'mailto' | 'page' | 'query' }> = [];
    
    if (dept.email) {
      steps.push({ label: 'Copy email', action: dept.email, type: 'copy' });
      steps.push({ label: 'Email ' + dept.name.split(' ')[0], action: `mailto:${dept.email}`, type: 'mailto' });
    }
    
    if (department === 'it') {
      steps.push({ label: 'Reset password', action: 'forgot password', type: 'query' });
      steps.push({ label: 'Canvas status', action: 'canvas login', type: 'query' });
    }
    
    if (department === 'library') {
      steps.push({ label: 'Find study spaces', action: '/support', type: 'page' });
    }
    
    return steps;
  }
  
  if (intent.type === 'events') {
    return [
      { label: 'Open Events', action: '/events', type: 'page' },
      { label: 'Events today', action: 'events today', type: 'query' },
      { label: 'Events this week', action: 'events this week', type: 'query' },
    ];
  }
  
  return [];
}


