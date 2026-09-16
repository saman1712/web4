import Link from "next/link";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/Sheets";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { getDish, localized, msg, promos } from "@/lib/catalog";
import { isLocale, type Locale } from "@/lib/locales";

const GRADS: Record<string, string> = {
  p0: "linear-gradient(120deg, #294a38, #1f3b2c 60%, #14291f)",
  p1: "linear-gradient(120deg, #2d4a2c, #1f3b2c 55%, #122318)",
  p2: "linear-gradient(120deg, #3a4d2e, #25402c 60%, #142a1c)",
};

export default async function SpecialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="screen-enter">
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "54px 20px 12px",
          background: "linear-gradient(180deg, #10231a 70%, rgba(16,35,26,0))",
        }}
      >
        <BackButton href={`/${locale}`} />
        <div className="eyebrow">
          <span className="rule" />
          {msg(locale, "home", "featured")}
        </div>
      </div>
      <div style={{ padding: "8px 20px 20px" }}>
        <h1 className="hero-title" style={{ fontSize: 42 }}>
          {msg(locale, "nav", "specials")}
        </h1>
      </div>
      <main className="screen-pad" style={{ paddingInline: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {promos.map((p, i) => {
          const dish = getDish(p.dish_id);
          const href = dish ? `/${locale}/dish/${dish.id}` : `/${locale}/menu`;
          return (
            <Reveal key={p.id} delay={i * 80}>
              <Link href={href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: 26,
                    overflow: "hidden",
                    minHeight: 168,
                    padding: 24,
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: GRADS[p.gradient_class] ?? GRADS.p0, opacity: 0.9 }} />
                  <div style={{ position: "relative", zIndex: 2, maxWidth: "86%" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: "var(--sage)" }}>
                      {localized(p, "kicker", locale)}
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 25, lineHeight: 1.08, color: "var(--cream-bright)", marginTop: 9 }}>
                      {localized(p, "title", locale)}
                    </div>
                    <span
                      style={{
                        marginTop: 15,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#10231a",
                        background: "var(--cream)",
                        padding: "9px 15px",
                        borderRadius: 999,
                      }}
                    >
                      {localized(p, "cta", locale)}
                      <span className="rtl-flip">
                        <Icon name="arrow" size={15} sw={2} />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
        <div style={{ height: 30 }} />
      </main>
    </div>
  );
}
