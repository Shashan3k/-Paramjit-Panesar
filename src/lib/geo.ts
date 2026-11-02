import type { LocationRecord } from '@/types';

/**
 * Distance helpers for "Find nearest clinic".
 *
 * Only clinics with published store-locator coordinates are ranked. A clinic
 * without coordinates is never placed on the map or estimated.
 */

const EARTH_RADIUS_MILES = 3958.8;

export interface UserPosition {
  lat: number;
  lng: number;
}

export interface RankedLocation {
  location: LocationRecord;
  distanceMiles: number;
}

/** Great-circle distance in miles (haversine formula). */
export function haversineMiles(from: UserPosition, to: { lat: number; lng: number }): number {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.min(1, Math.sqrt(a)));
}

/** Splits locations into those with coordinates (ranked by distance) and those without. */
export function rankLocationsByDistance(
  origin: UserPosition,
  locations: readonly LocationRecord[],
): { ranked: RankedLocation[]; unranked: LocationRecord[] } {
  const ranked: RankedLocation[] = [];
  const unranked: LocationRecord[] = [];

  for (const location of locations) {
    if (location.coordinates) {
      ranked.push({ location, distanceMiles: haversineMiles(origin, location.coordinates) });
    } else {
      unranked.push(location);
    }
  }

  ranked.sort((a, b) => a.distanceMiles - b.distanceMiles || a.location.name.localeCompare(b.location.name));
  return { ranked, unranked };
}

/** Formats a distance for display, e.g. "2.4 miles" or "0.3 miles". */
export function formatMiles(miles: number): string {
  return `${miles.toFixed(1)} mi`;
}
