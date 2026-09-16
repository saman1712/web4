import { notFound } from "next/navigation";
import { DishView } from "@/components/DishView";
import { dishes, getDish, localized, msg } from "@/lib/catalog";
import { isLocale, type Locale } from "@/lib/locales";

export function generateStaticParams() {
  const locales = ["fa", "en", "ar"];
  return locales.flatMap((locale) => dishes.map((d) => ({ locale, id: d.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) return {};
  const dish = getDish(id);
  if (!dish) return {};
  const locale = raw as Locale;
  const name = localized(dish, "name", locale);
  return {
    title: `${name} · Vision`,
    description: localized(dish, "desc", locale) || msg(locale, "brand", "tagline"),
    openGraph: { title: `${name} · Vision` },
  };
}

export default async function DishPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const dish = getDish(id);
  if (!dish) notFound();
  return <DishView dish={dish} locale={raw} />;
}
