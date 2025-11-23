/** Build a Google Maps Search URL from coordinates or an address. */
export function gmSearchUrl(input: { address?: string; lat?: number; lng?: number }) {
  if (input.lat != null && input.lng != null)
    return `https://www.google.com/maps/search/?api=1&query=${input.lat},${input.lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(input.address ?? "")}`;
}

/** Build a Google Maps Directions URL from coordinates or an address. */
export function gmDirectionsUrl(dest: { lat?: number; lng?: number; address?: string }) {
  if (dest.lat != null && dest.lng != null)
    return `https://www.google.com/maps/dir/?api=1&destination=${dest.lat},${dest.lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest.address ?? "")}`;
}
