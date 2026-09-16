import type { Locale } from "./locales";

const FA = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const AR = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function digits(value: string | number, locale: Locale) {
  const raw = String(value);
  if (locale === "fa") return raw.replace(/[0-9]/g, (d) => FA[+d]);
  if (locale === "ar") return raw.replace(/[0-9]/g, (d) => AR[+d]);
  return raw;
}

/** Stored prices are in thousands of tomans. */
export function formatPrice(thousands: number, locale: Locale) {
  return digits((thousands * 1000).toLocaleString("en-US"), locale);
}
