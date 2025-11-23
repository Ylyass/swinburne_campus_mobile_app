export function formatTimeForDisplay(date: string | number | Date): string {
  const value =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date;

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(value)
    .replace(" am", " AM")
    .replace(" pm", " PM");
}

