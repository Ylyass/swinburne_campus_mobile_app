// Deterministic date formatting to avoid SSR/CSR mismatches.
const fmt = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function formatAt(iso: string) {
  try {
    return fmt.format(new Date(iso));
  } catch {
    return iso;
  }
}
