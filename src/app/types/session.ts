export type Role = "student" | "staff" | "admin";
export type Workspace = Role;
export type Session = {
  signedIn: boolean;
  name: string;
  email: string;
  avatar?: string | null;
  campusId: string;
  roles: Role[];
  workspace: Workspace;
};
