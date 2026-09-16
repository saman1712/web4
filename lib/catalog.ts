import type { Locale } from "./locales";
import catalog from "@/data/catalog.json";

export type PriceVariant = {
  id: string;
  price: number;
  label_en: string;
  label_fa: string;
  label_ar: string;
};

export type Dish = {
  id: string;
  category_id: string;
  price: number;
  featured: boolean;
  trending: boolean;
  home_hero: boolean;
  kcal: number;
  mins: number;
  hot: number;
  available: boolean;
  sort_order: number;
  image_url: string | null;
  image: string | null;
  name_en: string;
  name_fa: string;
  name_ar: string;
  desc_en: string;
  desc_fa: string;
  desc_ar: string;
  ing_en: string[];
  ing_fa: string[];
  ing_ar: string[];
  tags: string[];
  price_variants: PriceVariant[];
};

export type Category = {
  id: string;
  icon_paths: string;
  sort_order: number;
  name_en: string;
  name_fa: string;
  name_ar: string;
};

export type Branch = {
  id: string;
  open: boolean;
  hours: string;
  sort_order: number;
  name_en: string;
  name_fa: string;
  name_ar: string;
  city_en: string;
  city_fa: string;
  city_ar: string;
  dist_en: string;
  dist_fa: string;
  dist_ar: string;
  image_url: string | null;
  phone: string;
  lat: number | null;
  lng: number | null;
  address_en: string;
  address_fa: string;
  address_ar: string;
  maps_url: string;
  opens_at: number;
  closes_at: number;
};

export type Promo = {
  id: string;
  dish_id: string;
  sort_order: number;
  active: boolean;
  gradient_class: string;
  kicker_en: string;
  kicker_fa: string;
  kicker_ar: string;
  title_en: string;
  title_fa: string;
  title_ar: string;
  cta_en: string;
  cta_fa: string;
  cta_ar: string;
};

export const INSTAGRAM_ID = "vision.tehran";
export const INSTAGRAM_URL = "https://www.instagram.com/vision.tehran";

export const categories = catalog.categories as Category[];
export const branches = catalog.branches as Branch[];
export const promos = catalog.promos as Promo[];
export const dishes = catalog.dishes as Dish[];
export const heroIds = catalog.heroIds as string[];
export const trendingIds = catalog.trendingIds as string[];
export const messages = catalog.messages as Record<Locale, Record<string, Record<string, string>>>;

const dishMap = new Map(dishes.map((d) => [d.id, d]));

export function getDish(id: string) {
  return dishMap.get(id);
}

/** Promo source dishes that don't exist on the menu → closest real page. */
const PROMO_FALLBACK: Record<string, string> = {
  "truffle-pizza": "/menu",
  "mixed-grill": "/menu/grill",
  "saffron-lemonade": "/dish/lemonade",
};

export function promoHref(promo: Promo, locale: Locale) {
  const dish = getDish(promo.dish_id);
  if (dish) return `/${locale}/dish/${dish.id}`;
  return `/${locale}${PROMO_FALLBACK[promo.dish_id] ?? "/menu"}`;
}

export function dishesInCategory(categoryId?: string) {
  if (!categoryId || categoryId === "all") return dishes.filter((d) => d.available);
  return dishes.filter((d) => d.available && d.category_id === categoryId);
}

export function localized(
  item: Record<string, unknown>,
  base: string,
  locale: Locale,
): string {
  const key = `${base}_${locale}` as keyof typeof item;
  const val = item[key];
  return typeof val === "string" ? val : String(item[`${base}_en`] ?? "");
}

export function msg(locale: Locale, group: string, key: string) {
  return messages[locale]?.[group]?.[key] ?? messages.en?.[group]?.[key] ?? key;
}

export function dishImage(dish: Dish) {
  return dish.image ? `/dishes/${dish.image}` : "/dishes/placeholder.svg";
}

export function isBranchOpenNow(branch: Branch, now = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tehran",
      hour: "numeric",
      hour12: false,
    }).format(now),
  );
  const start = branch.opens_at;
  const end = branch.closes_at === 24 ? 24 : branch.closes_at;
  if (end > start) return hour >= start && hour < end;
  return hour >= start || hour < end;
}
