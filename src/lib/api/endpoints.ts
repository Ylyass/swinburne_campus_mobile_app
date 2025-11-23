export const EP = {
  auth: { login: () => "/auth/login" }, // POST {email,password} -> {token, user}
  banners: {
    list: (q: string) => `/admin/banners?${q}`,
    create: () => "/admin/banners",
    id: (id: string) => `/admin/banners/${id}`,
  },
  incidents: {
    list: (q: string) => `/admin/incidents?${q}`,
    create: () => "/admin/incidents",
    id: (id: string) => `/admin/incidents/${id}`,
    status: (id: string) => `/admin/incidents/${id}/status`, // PATCH {status}
  },
  services: {
    list: (q: string) => `/admin/services?${q}`,
    create: () => "/admin/services",
    id: (id: string) => `/admin/services/${id}`,
  },
  audit: { list: (q: string) => `/admin/audit-logs?${q}` },
  health: () => "/admin/health",
} as const;
