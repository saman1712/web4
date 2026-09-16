"use client";

import { useEffect, useState } from "react";
import { PromoCta } from "./PromoCta";
import type { Locale } from "@/lib/locales";

const GRADS: Record<string, string> = {
  p0: "linear-gradient(120deg, #294a38, #1f3b2c 60%, #14291f)",
  p1: "linear-gradient(120deg, #2d4a2c, #1f3b2c 55%, #122318)",
  p2: "linear-gradient(120deg, #3a4d2e, #25402c 60%, #142a1c)",
};

export type PromoSlide = {
  id: string;
  gradient_class: string;
  kicker: string;
  title: string;
  cta: string;
  href: string;
};

export function PromoCarousel({ slides, locale }: { slides: PromoSlide[]; locale: Locale }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 4600);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div style={{ marginTop: 36, padding: "0 20px" }}>
      <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", height: 168, boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
        <div
          style={{
            display: "flex",
            height: "100%",
            transition: "transform 0.6s var(--ease-out)",
            transform: `translateX(${locale === "en" ? -i * 100 : i * 100}%)`,
          }}
        >
          {slides.map((s) => (
            <div key={s.id} style={{ flex: "0 0 100%", textDecoration: "none" }}>
              <div style={{ height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: 24, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: GRADS[s.gradient_class] ?? GRADS.p0, opacity: 0.9 }} />
                <div style={{ position: "relative", zIndex: 2, flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "none", color: "var(--sage)" }}>{s.kicker}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 25, lineHeight: 1.08, color: "var(--cream-bright)", marginTop: 9 }}>
                    {s.title}
                  </div>
                </div>
                <PromoCta href={s.href}>{s.cta}</PromoCta>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 7, justifyContent: "center", marginTop: 14 }}>
        {slides.map((s, idx) => (
          <button key={s.id} className={`pd ${idx === i ? "on" : ""}`} onClick={() => setI(idx)} aria-label={s.kicker} />
        ))}
      </div>
    </div>
  );
}
