"use client";

import { useEffect, useState } from "react";
import { getDish, localized, msg } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/lib/locales";
import { useMenuStore } from "@/store/menu-store";
import { Icon } from "./Icon";

export function AddSheet({ locale }: { locale: Locale }) {
  const sheet = useMenuStore((s) => s.sheet);
  const addDishId = useMenuStore((s) => s.addDishId);
  const setSheet = useMenuStore((s) => s.setSheet);
  const addToCart = useMenuStore((s) => s.addToCart);
  const showToast = useMenuStore((s) => s.showToast);
  const dish = addDishId ? getDish(addDishId) : undefined;
  const [variantId, setVariantId] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setVariantId(dish?.price_variants[0]?.id);
    setQty(1);
  }, [dish?.id]);

  if (sheet !== "add" || !dish) return null;
  const variants = dish.price_variants.length ? dish.price_variants : [{ id: "default", price: dish.price, label_en: "", label_fa: "", label_ar: "" }];
  const selected = variants.find((v) => v.id === (variantId ?? variants[0].id)) ?? variants[0];

  return (
    <div className="sheet-wrap" onClick={() => setSheet(null)}>
      <div className="sheet-panel" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--cream-bright)", margin: 0 }}>
          {localized(dish, "name", locale)}
        </h2>
        <div style={{ marginTop: 16 }}>
          {variants.map((v) => (
            <button
              key={v.id}
              className={`opt-row ${selected.id === v.id ? "sel" : ""}`}
              style={{ width: "100%", textAlign: "start" }}
              onClick={() => setVariantId(v.id)}
            >
              <div style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--cream-bright)" }}>
                {localized(v, "label", locale) || msg(locale, "dish", "addToOrder")}
              </div>
              <span className="price-display">
                {formatPrice(v.price, locale)}
                <span className="price-cur">{msg(locale, "dish", "curr")}</span>
              </span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, gap: 12 }}>
          <div className="qty-stepper">
            <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="decrease">
              <Icon name="minus" size={16} />
            </button>
            <span style={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>{qty}</span>
            <button className="qty-btn" onClick={() => setQty((q) => q + 1)} aria-label="increase">
              <Icon name="plus" size={16} />
            </button>
          </div>
          <button
            onClick={() => {
              addToCart(dish.id, selected.id === "default" ? undefined : selected.id, qty);
              showToast(msg(locale, "dish", "added"));
              setQty(1);
            }}
            style={{
              flex: 1,
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 15,
              border: "none",
              cursor: "pointer",
              borderRadius: 999,
              background: "var(--cream)",
              color: "#173324",
              padding: "14px 20px",
            }}
          >
            {msg(locale, "dish", "addToOrder")}
          </button>
        </div>
      </div>
    </div>
  );
}
