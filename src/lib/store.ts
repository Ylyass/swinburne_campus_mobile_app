export type SupportRequest = {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  createdAt: string;
  status: "new" | "in_progress" | "closed";
};

// Let TS know about our global cache
declare global {
  // eslint-disable-next-line no-var
  var __APP_STORE__: { requests: SupportRequest[] } | undefined;
}

export const store =
  (globalThis.__APP_STORE__ ??= { requests: [] as SupportRequest[] });
