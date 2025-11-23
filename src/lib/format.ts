import type { TimeFormat, DateFormat } from "@/lib/settings";

export function formatTime(
  date: Date, 
  timeFormat: TimeFormat = '12h'
): string {
  if (timeFormat === '24h') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDate(
  date: Date, 
  dateFormat: DateFormat = 'short'
): string {
  if (dateFormat === 'long') {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }
  
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric'
  });
}

export function formatDateTime(
  date: Date,
  timeFormat: TimeFormat = '12h',
  dateFormat: DateFormat = 'short'
): string {
  return `${formatDate(date, dateFormat)} • ${formatTime(date, timeFormat)}`;
}

export function formatTemperature(
  celsius: number,
  unit: 'celsius' | 'fahrenheit' = 'celsius'
): string {
  if (unit === 'fahrenheit') {
    const fahrenheit = (celsius * 9/5) + 32;
    return `${Math.round(fahrenheit)}°F`;
  }
  
  return `${Math.round(celsius)}°C`;
}

