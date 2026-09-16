import { notFound } from "next/navigation";
import { AppOverlays } from "@/components/AppOverlays";
import { BottomNav } from "@/components/BottomNav";
import { LocaleSync } from "@/components/LocaleSync";
import { isLocale, type Locale } from "@/lib/locales";
import { msg } from "@/lib/catalog";

export function generateStaticParams() {
  return [{ locale: "fa" }, { locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="app-shell">
      <LocaleSync locale={locale} />
      <div className="app-bg" style={{ minHeight: "100svh" }}>
        {children}
      </div>
      <BottomNav locale={locale} />
      <AppOverlays locale={locale} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const name = msg(locale, "brand", "name");
  const tag = msg(locale, "brand", "tagline");
  return {
    title: `Vision — ${tag}`,
    description: tag,
    openGraph: { title: `Vision — ${tag}`, description: tag },
  };
}
