"use client";

import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/lib/catalog";
import { dishImage, localized, msg } from "@/lib/catalog";
import { digits, formatPrice } from "@/lib/format";
import type { Locale } from "@/lib/locales";
import { useMenuStore } from "@/store/menu-store";
import { Icon } from "./Icon";

function badgeFor(dish: Dish, locale: Locale) {
  if (dish.tags?.includes("spicy") || dish.hot >= 2) return { cls: "badge-spicy", label: msg(locale, "dish", "spicy") };
  if (dish.tags?.includes("veg")) return { cls: "badge-veg", label: msg(locale, "dish", "veg") };
  if (dish.tags?.includes("new")) return { cls: "badge-new", label: msg(locale, "dish", "new") };
  if (dish.trending || dish.featured) return { cls: "badge-popular", label: msg(locale, "dish", "popular") };
  return null;
}

export function Price({ value, locale, size }: { value: number; locale: Locale; size?: number }) {
  return (
    <span className="price-display" style={size ? { fontSize: size } : undefined}>
      {formatPrice(value, locale)}
      <span className="price-cur">{msg(locale, "dish", "curr")}</span>
    </span>
  );
}

export function DishCard({
  dish,
  locale,
  delay = 0,
}: {
  dish: Dish;
  locale: Locale;
  delay?: number;
}) {
  const add = useMenuStore((s) => s.addToCart);
  const setSheet = useMenuStore((s) => s.setSheet);
  const showToast = useMenuStore((s) => s.showToast);
  const badge = badgeFor(dish, locale);

  return (
    <div className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <Link href={`/${locale}/dish/${dish.id}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            position: "relative",
            borderRadius: 22,
            overflow: "hidden",
            background: "#173324",
            border: "1px solid var(--hairline)",
            cursor: "pointer",
            transition: "transform 0.3s var(--ease-out)",
          }}
        >
          <div
            style={{
              position: "relative",
              height: 150,
              background:
                "radial-gradient(120% 100% at 50% 60%, rgba(236,229,209,0.14), rgba(184,217,160,0.04) 55%, rgba(12,28,20,0) 90%), #1d3a2a",
            }}
          >
            {dish.image ? (
              <Image src={dishImage(dish)} alt={localized(dish, "name", locale)} fill sizes="220px" style={{ objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1f3b2c, #0c1c14)" }} />
            )}
            {badge && (
              <span style={{ position: "absolute", top: 10, insetInlineStart: 10 }}>
                <span className={`badge ${badge.cls}`}>{badge.label}</span>
              </span>
            )}
            <button
              className="add-btn"
              style={{ position: "absolute", bottom: -16, insetInlineEnd: 12, width: 36, height: 36 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (dish.price_variants.length > 1) {
                  setSheet("add", dish.id);
                } else {
                  add(dish.id, dish.price_variants[0]?.id);
                  showToast(msg(locale, "dish", "added"));
                }
              }}
              aria-label={msg(locale, "dish", "addToOrder")}
            >
              <Icon name="plus" size={18} sw={2.2} />
            </button>
          </div>
          <div style={{ padding: "14px 14px 15px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: 1.12,
                color: "var(--cream-bright)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.24em",
              }}
            >
              {localized(dish, "name", locale)}
            </div>
            <div style={{ marginTop: 10 }}>
              <Price value={dish.price} locale={locale} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function TrendRow({
  dish,
  locale,
  rank,
}: {
  dish: Dish;
  locale: Locale;
  rank: number;
}) {
  return (
    <Link href={`/${locale}/dish/${dish.id}`} style={{ textDecoration: "none" }}>
      <div className="trend-row">
        <div
          style={{
            position: "relative",
            flex: "0 0 76px",
            width: 76,
            height: 76,
            borderRadius: "50%",
            overflow: "hidden",
            background:
              "radial-gradient(circle at 50% 55%, rgba(236,229,209,0.18), rgba(184,217,160,0.06) 60%, rgba(12,28,20,0) 95%), #1d3a2a",
            boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
          }}
        >
          {dish.image && (
            <Image src={dishImage(dish)} alt={localized(dish, "name", locale)} fill sizes="76px" style={{ objectFit: "cover", borderRadius: "50%" }} />
          )}
          <span
            style={{
              position: "absolute",
              top: -4,
              insetInlineStart: -4,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "var(--sage)",
              color: "#10231a",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 12,
              display: "grid",
              placeItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            }}
          >
            {digits(rank, locale)}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--cream-bright)", lineHeight: 1.1 }}>
            {localized(dish, "name", locale)}
          </div>
          <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--cream-50)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon name="clock" size={13} className="text-sage" />
              {digits(dish.mins, locale)} {msg(locale, "dish", "mins")}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--cream-30)" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon name="bolt" size={13} />
              {digits(dish.kcal, locale)} {msg(locale, "dish", "kcal")}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "end" }}>
          <Price value={dish.price} locale={locale} />
        </div>
      </div>
    </Link>
  );
}
