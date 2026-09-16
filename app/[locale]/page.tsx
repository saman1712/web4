import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon } from "@/components/Icon";
import { HomeHeader } from "@/components/HomeHeader";
import { PromoCarousel } from "@/components/PromoCarousel";
import { Reveal } from "@/components/Reveal";
import { TrendRow } from "@/components/DishCard";
import { Icon } from "@/components/Icon";
import {
  categories,
  dishImage,
  getDish,
  heroIds,
  localized,
  msg,
  promos,
  trendingIds,
} from "@/lib/catalog";
import { isLocale, type Locale } from "@/lib/locales";

const FLOATS = [
  { size: 132, top: 4, start: 6, end: undefined as number | undefined, anim: "floatY 6s ease-in-out infinite", delay: "0s" },
  { size: 120, top: 120, start: undefined, end: 2, anim: "floatY 7.5s ease-in-out infinite reverse", delay: "0s" },
  { size: 126, top: 230, start: 26, end: undefined, anim: "floatY 6.8s ease-in-out infinite", delay: "-1.5s" },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const hero = heroIds.map((id) => getDish(id)).filter(Boolean);
  const trending = trendingIds.map((id) => getDish(id)).filter(Boolean);
  const slides = promos.map((p) => ({
    id: p.id,
    gradient_class: p.gradient_class,
    kicker: localized(p, "kicker", locale),
    title: localized(p, "title", locale),
    cta: localized(p, "cta", locale),
    href: getDish(p.dish_id) ? `/${locale}/dish/${p.dish_id}` : `/${locale}/menu`,
  }));

  return (
    <div className="screen-enter">
      <HomeHeader locale={locale} />
      <main className="screen-pad">
        <div style={{ padding: "18px 20px 8px" }}>
          <Reveal>
            <div className="eyebrow">
              <span className="rule" />
              {msg(locale, "brand", "tagline")}
            </div>
            <h1 className="hero-title">
              {msg(locale, "home", "ourMenu")} <em>{msg(locale, "home", "ourMenu2")}</em>
            </h1>
            <p style={{ margin: "16px 0 0", maxWidth: "86%", fontSize: 14.5, lineHeight: 1.55, color: "var(--cream-50)" }}>
              {msg(locale, "ui", "heroLiveSub")}
            </p>
          </Reveal>
        </div>

        <div style={{ position: "relative", marginTop: 26, height: 360 }}>
          <svg style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 86, transform: "translateX(-50%)", opacity: 0.92, pointerEvents: "none" }} viewBox="0 0 90 360" fill="none" preserveAspectRatio="none">
            <path d="M45 -10 C 80 55, 12 120, 45 180 C 78 240, 12 305, 45 370" stroke="rgb(229,229,229)" strokeWidth="48" strokeLinecap="round" opacity="0.96" />
          </svg>
          {hero.map((dish, i) => {
            if (!dish) return null;
            const f = FLOATS[i];
            const short = localized(dish, "name", locale).trim().split(/\s+/).slice(0, 2).join(" ");
            return (
              <Link
                key={dish.id}
                href={`/${locale}/dish/${dish.id}`}
                style={{
                  textDecoration: "none",
                  position: "absolute",
                  width: f.size,
                  height: f.size,
                  top: f.top,
                  insetInlineStart: f.start,
                  insetInlineEnd: f.end,
                  borderRadius: "50%",
                  overflow: "visible",
                  animation: f.anim,
                  animationDelay: f.delay,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background:
                      "radial-gradient(circle at 50% 55%, rgba(236,229,209,0.18), rgba(184,217,160,0.06) 60%, rgba(12,28,20,0) 95%), #1d3a2a",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(236,229,209,0.1)",
                  }}
                >
                  <span className="ring" style={{ inset: -11 }} />
                  <span className="ring ring-rev" style={{ inset: -16 }} />
                  {dish.image && (
                    <Image src={dishImage(dish)} alt={localized(dish, "name", locale)} fill sizes={`${f.size}px`} style={{ objectFit: "cover", borderRadius: "50%" }} />
                  )}
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--cream)",
                    color: "#173324",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "4px 11px",
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {short}
                </span>
              </Link>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "26px 20px 0" }}>
          <Link
            href={`/${locale}/menu`}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 14.5,
              border: "none",
              cursor: "pointer",
              borderRadius: 999,
              background: "var(--cream)",
              color: "#173324",
              padding: "15px 26px",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
              textDecoration: "none",
            }}
          >
            <Icon name="fork" size={18} sw={1.8} />
            {msg(locale, "home", "browseMenu")}
          </Link>
        </div>

        <div style={{ marginTop: 8 }}>
          <div className="hscroll hscroll-start">
            <Link href={`/${locale}/menu`} className="catpill">
              <span className="ci">
                <Icon name="grid" size={18} />
              </span>
              {msg(locale, "menu", "allDishes")}
            </Link>
            {categories.map((c) => (
              <Link key={c.id} href={`/${locale}/menu/${c.id}`} className="catpill">
                <span className="ci">
                  <CategoryIcon paths={c.icon_paths} />
                </span>
                {localized(c, "name", locale)}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 38 }}>
          <div style={{ padding: "0 20px 16px" }}>
            <div className="section-title">
              <em>{msg(locale, "home", "trending")}</em>
            </div>
            <div style={{ fontSize: 13, color: "var(--cream-50)", marginTop: 6 }}>{msg(locale, "home", "trendingSub")}</div>
          </div>
          <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            {trending.map((d, i) =>
              d ? (
                <Reveal key={d.id} delay={i * 60}>
                  <TrendRow dish={d} locale={locale} rank={i + 1} />
                </Reveal>
              ) : null,
            )}
          </div>
        </div>

        <PromoCarousel slides={slides} locale={locale} />
        <div style={{ height: 30 }} />
      </main>
    </div>
  );
}
