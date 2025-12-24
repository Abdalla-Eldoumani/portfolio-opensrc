/**
 * Sun Times Calculator
 * Calculates sunrise and sunset times based on location
 * Uses simplified algorithm for portfolio use
 *
 * Fallback: Uses timezone offset to estimate if geolocation unavailable
 */

interface SunTimes {
  sunrise: Date;
  sunset: Date;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calculate sun times for a given date and location
 * Based on simplified sunrise equation
 */
export function calculateSunTimes(date: Date, coords: Coordinates): SunTimes {
  const { latitude, longitude } = coords;

  // Julian day calculation
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  const julianDay =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  const n = julianDay - 2451545.0 + 0.0008;

  // Mean solar noon
  const J_ = n - longitude / 360;

  // Solar mean anomaly
  const M = (357.5291 + 0.98560028 * J_) % 360;

  // Equation of center
  const C =
    1.9148 * Math.sin((M * Math.PI) / 180) +
    0.02 * Math.sin((2 * M * Math.PI) / 180) +
    0.0003 * Math.sin((3 * M * Math.PI) / 180);

  // Ecliptic longitude
  const lambda = (M + C + 180 + 102.9372) % 360;

  // Solar transit
  const Jtransit = 2451545.0 + J_ + 0.0053 * Math.sin((M * Math.PI) / 180) - 0.0069 * Math.sin((2 * lambda * Math.PI) / 180);

  // Declination of sun
  const delta = Math.asin(Math.sin((lambda * Math.PI) / 180) * Math.sin((23.44 * Math.PI) / 180));

  // Hour angle
  const omega = Math.acos(
    (Math.sin((-0.83 * Math.PI) / 180) - Math.sin((latitude * Math.PI) / 180) * Math.sin(delta)) /
      (Math.cos((latitude * Math.PI) / 180) * Math.cos(delta))
  );

  // Sunrise and sunset as Julian days
  const Jrise = Jtransit - omega / (2 * Math.PI);
  const Jset = Jtransit + omega / (2 * Math.PI);

  // Convert to Date objects
  const sunrise = julianToDate(Jrise, date.getTimezoneOffset());
  const sunset = julianToDate(Jset, date.getTimezoneOffset());

  return { sunrise, sunset };
}

/**
 * Convert Julian day to Date object
 */
function julianToDate(julianDay: number, timezoneOffset: number): Date {
  const unixTime = (julianDay - 2440587.5) * 86400000;
  const date = new Date(unixTime);
  // Adjust for local timezone
  date.setMinutes(date.getMinutes() - timezoneOffset);
  return date;
}

/**
 * Get approximate coordinates from timezone offset
 * Rough estimation when geolocation unavailable
 */
function getCoordinatesFromTimezone(): Coordinates {
  const timezoneOffset = new Date().getTimezoneOffset();
  // Approximate longitude from timezone (15 degrees per hour)
  const longitude = -timezoneOffset / 4;
  // Default to mid-latitude (reasonable for most users)
  const latitude = 40;

  return { latitude, longitude };
}

/**
 * Get user coordinates with geolocation API
 * Falls back to timezone-based estimation
 */
export async function getUserCoordinates(): Promise<Coordinates> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(getCoordinatesFromTimezone());
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        // Fallback on error
        resolve(getCoordinatesFromTimezone());
      },
      {
        timeout: 5000,
        maximumAge: 86400000, // Cache for 24 hours
      }
    );
  });
}

/**
 * Check if current time is after sunset
 */
export async function isAfterSunset(): Promise<boolean> {
  try {
    const coords = await getUserCoordinates();
    const now = new Date();
    const { sunset, sunrise } = calculateSunTimes(now, coords);

    // Dark mode if after sunset OR before sunrise
    return now >= sunset || now < sunrise;
  } catch (error) {
    // Fallback: use simple time-based check (6 PM - 6 AM)
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  }
}

/**
 * Get next theme transition time (sunrise or sunset)
 */
export async function getNextTransitionTime(): Promise<Date> {
  try {
    const coords = await getUserCoordinates();
    const now = new Date();
    const { sunset, sunrise } = calculateSunTimes(now, coords);

    // If before sunrise, return sunrise
    if (now < sunrise) {
      return sunrise;
    }

    // If before sunset, return sunset
    if (now < sunset) {
      return sunset;
    }

    // If after sunset, return tomorrow's sunrise
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowSunTimes = calculateSunTimes(tomorrow, coords);
    return tomorrowSunTimes.sunrise;
  } catch (error) {
    // Fallback: next 6 AM or 6 PM
    const now = new Date();
    const hour = now.getHours();
    const nextTransition = new Date(now);

    if (hour < 6) {
      nextTransition.setHours(6, 0, 0, 0);
    } else if (hour < 18) {
      nextTransition.setHours(18, 0, 0, 0);
    } else {
      nextTransition.setDate(nextTransition.getDate() + 1);
      nextTransition.setHours(6, 0, 0, 0);
    }

    return nextTransition;
  }
}
