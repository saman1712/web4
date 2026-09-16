"use client";

import { useEffect } from "react";
import { DishCard } from "@/components/DishCard";
import type { Dish } from "@/lib/catalog";
import type { Locale } from "@/lib/locales";

export function MenuGrid({ dishes, locale }: { dishes: Dish[]; locale: Locale }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [dishes]);

  return (
    <div style={{ padding: "8px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {dishes.map((d, i) => (
        <DishCard key={d.id} dish={d} locale={locale} delay={(i % 2) * 70} />
      ))}
    </div>
  );
}
