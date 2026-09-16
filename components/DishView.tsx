"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Dish } from "@/lib/catalog";
import { dishImage, localized, msg } from "@/lib/catalog";
import { digits, formatPrice } from "@/lib/format";
import type { Locale } from "@/lib/locales";
import { useMenuStore } from "@/store/menu-store";
import { Icon } from "./Icon";
import { Price } from "./DishCard";

export function DishView({ dish, locale }: { dish: Dish; locale: Locale }) {
  const router = useRouter();
  const add = useMenuStore((s) => s.addToCart);
  const setSheet = useMenuStore((s) => s.setSheet);
  const showToast = useMenuStore((s) => s.showToast);
  const [liked, setLiked] = useState(false);
  const name = localized(dish, "name", locale);
  const desc = localized(dish, "desc", locale);
  const ings = (locale === "fa" ? dish.ing_fa : locale === "ar" ? dish.ing_ar : dish.ing_en).filter(Boolean);
  const spicy = dish.hot >= 2 || dish.tags.includes("spicy");

  return (
    <div className="screen-enter" style={{ paddingBottom: 40 }}>
      <div
        style={{
          position: "relative",
          height: 460,
          background:
            "radial-gradient(120% 100% at 50% 38%, rgba(236,229,209,0.16), rgba(184,217,160,0.05) 55%, rgba(12,28,20,0) 90%), #1d3a2a",
        }}
      >
        {dish.image && (
          <Image src={dishImage(dish)} alt={name} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,22,15,0.45) 0%, rgba(10,22,15,0) 28%, rgba(12,28,20,0) 55%, rgba(11,24,17,0.96) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          insetInline: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "54px 20px 0",
          pointerEvents: "none",
          maxWidth: 480,
          marginInline: "auto",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "var(--surface)",
            border: "1px solid var(--hairline)",
            color: "var(--cream)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            pointerEvents: "auto",
            backdropFilter: "blur(8px)",
          }}
        >
          <Icon name="chevronLeft" size={20} sw={2.2} className="rtl-flip" />
        </button>
        <button
          onClick={() => setLiked((v) => !v)}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "var(--surface)",
            border: "1px solid var(--hairline)",
            color: liked ? "var(--sage)" : "var(--cream)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            pointerEvents: "auto",
            backdropFilter: "blur(8px)",
          }}
          aria-label="favorite"
        >
          <Icon name="heart" size={19} />
        </button>
      </div>
      <div style={{ position: "relative", marginTop: -54, padding: "0 20px", zIndex: 5 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {dish.trending && <span className="badge badge-popular">{msg(locale, "dish", "popular")}</span>}
          {spicy && <span className="badge badge-spicy">{msg(locale, "dish", "spicy")}</span>}
          {dish.tags.includes("veg") && <span className="badge badge-veg">{msg(locale, "dish", "veg")}</span>}
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38, lineHeight: 1.02, color: "var(--cream-bright)", margin: 0 }}>
          {name}
        </h1>
        {desc ? (
          <p style={{ marginTop: 14, fontSize: 14.5, lineHeight: 1.6, color: "var(--cream-70)" }}>{desc}</p>
        ) : (
          <p style={{ marginTop: 14, fontSize: 14.5, lineHeight: 1.6, color: "var(--cream-70)" }} />
        )}
        <div style={{ marginTop: 22 }}>
          <Price value={dish.price} locale={locale} size={26} />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <div style={{ flex: 1, padding: "15px 14px", borderRadius: 18, background: "var(--surface)", border: "1px solid var(--hairline)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--cream-bright)", display: "flex", justifyContent: "center", alignItems: "center", height: 25 }}>
              {digits(dish.kcal || "—", locale)}
            </div>
            <div style={{ fontSize: 11, color: "var(--cream-50)", marginTop: 4 }}>
              {msg(locale, "dish", "energy")} · {msg(locale, "dish", "kcal")}
            </div>
          </div>
          <div style={{ flex: 1, padding: "15px 14px", borderRadius: 18, background: "var(--surface)", border: "1px solid var(--hairline)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--cream-bright)", display: "flex", justifyContent: "center", alignItems: "center", height: 25 }}>
              {dish.mins ? `${digits(dish.mins, locale)}′` : "—"}
            </div>
            <div style={{ fontSize: 11, color: "var(--cream-50)", marginTop: 4 }}>{msg(locale, "dish", "prep")}</div>
          </div>
          <div style={{ flex: 1, padding: "15px 14px", borderRadius: 18, background: "var(--surface)", border: "1px solid var(--hairline)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--cream-bright)", display: "flex", justifyContent: "center", alignItems: "center", height: 25 }}>
              <span style={{ color: spicy ? "#c9603f" : "var(--cream-50)" }}>{spicy ? msg(locale, "dish", "spicy") : msg(locale, "dish", "mild")}</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--cream-50)", marginTop: 4 }}>{msg(locale, "dish", "spiceLvl")}</div>
          </div>
        </div>
        {ings.length > 0 && (
          <div style={{ marginTop: 26 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--cream-bright)", marginBottom: 12 }}>
              {msg(locale, "dish", "ingredients")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ings.map((ing) => (
                <span
                  key={ing}
                  style={{
                    padding: "9px 14px",
                    borderRadius: 999,
                    background: "var(--surface)",
                    border: "1px solid var(--hairline)",
                    fontSize: 13,
                    color: "var(--cream-70)",
                  }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}
        <div style={{ height: 108 }} />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          insetInline: 0,
          zIndex: 40,
          display: "flex",
          justifyContent: "center",
          padding: "12px 20px calc(18px + env(safe-area-inset-bottom))",
          background: "linear-gradient(180deg, rgba(12,28,20,0) 0%, rgba(11,24,17,0.94) 40%)",
        }}
      >
        <button
          onClick={() => {
            if (dish.price_variants.length > 1) setSheet("add", dish.id);
            else {
              add(dish.id, dish.price_variants[0]?.id);
              showToast(msg(locale, "dish", "added"));
            }
          }}
          style={{
            width: "100%",
            maxWidth: 440,
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 15.5,
            border: "none",
            cursor: "pointer",
            borderRadius: 999,
            background: "var(--cream)",
            color: "#173324",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
          }}
        >
          <Icon name="plus" size={18} sw={2.2} />
          {msg(locale, "dish", "addToOrder")}
          <span style={{ opacity: 0.7 }}>·</span>
          {formatPrice(dish.price, locale)} {msg(locale, "dish", "curr")}
        </button>
      </div>
    </div>
  );
}
