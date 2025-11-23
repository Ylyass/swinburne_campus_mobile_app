type User = { id: string; name: string; email: string; roles: string[] };
let _user: User | null = null;

export function getToken() { return localStorage.getItem("jwt") || ""; }
export function setToken(token: string) { localStorage.setItem("jwt", token); }
export function clearToken() { localStorage.removeItem("jwt"); }

export function setUser(u: User | null) { _user = u; }
export function getUser() { return _user; }
export function hasRole(role: string) { return _user?.roles?.includes(role) ?? false; }
