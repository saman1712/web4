import Link from "next/link";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/Sheets";
import { CategoryIcon, Icon } from "@/components/Icon";
import { MenuGrid } from "@/components/MenuGrid";
import { categories, dishesInCategory, localized, msg } from "@/lib/catalog";
import { digits } from "@/lib/format";
import { isLocale, type Locale } from "@/lib/locales";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string; category?: string }>;
}) {
  const { locale: raw, category } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const active = category ?? "all";
  const list = dishesInCategory(active === "all" ? undefined : active);
  const cat = categories.find((c) => c.id === active);
  const title = cat ? localized(cat, "name", locale) : msg(locale, "menu", "allDishes");

  return (
    <div className="screen-enter">
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          display: "flex",
          gap: 8,
          overflowX: "auto",
          padding: "54px 20px 12px",
          background: "linear-gradient(180deg, #10231a 60%, rgba(16,35,26,0))",
          scrollbarWidth: "none",
        }}
      >
        <BackButton href={`/${locale}`} />
        <Link href={`/${locale}/menu`} className={`catpill ${active === "all" ? "active" : ""}`}>
          <span className="ci">
            <Icon name="grid" size={18} />
          </span>
          {msg(locale, "menu", "allDishes")}
        </Link>
        {categories.map((c) => (
          <Link key={c.id} href={`/${locale}/menu/${c.id}`} className={`catpill ${active === c.id ? "active" : ""}`}>
            <span className="ci">
              <CategoryIcon paths={c.icon_paths} />
            </span>
            {localized(c, "name", locale)}
          </Link>
        ))}
      </div>
      <div style={{ padding: "16px 20px 6px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, lineHeight: 1, color: "var(--cream-bright)", margin: "18px 0 0" }}>
          {title}
        </h1>
        <div style={{ fontSize: 13, color: "var(--cream-50)", marginTop: 10 }}>
          {digits(list.length, locale)} {msg(locale, "menu", "inThisCat")}
        </div>
      </div>
      <main className="screen-pad">
        <MenuGrid dishes={list} locale={locale} />
        <div style={{ height: 30 }} />
      </main>
    </div>
  );
}
