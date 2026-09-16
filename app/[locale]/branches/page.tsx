import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/Sheets";
import { Icon } from "@/components/Icon";
import {
  INSTAGRAM_ID,
  INSTAGRAM_URL,
  branches,
  isBranchOpenNow,
  localized,
  msg,
} from "@/lib/catalog";
import { isLocale, type Locale } from "@/lib/locales";

export default async function BranchesPage({ params }: { params: Promise<{ locale: string }> }) {
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
          {msg(locale, "ui", "findNearest")}
        </div>
      </div>
      <div style={{ padding: "8px 20px 20px" }}>
        <h1 className="hero-title" style={{ fontSize: 42 }}>
          {msg(locale, "ui", "contactInfo")}
        </h1>
      </div>
      <main className="screen-pad" style={{ paddingInline: 20, display: "flex", flexDirection: "column", gap: 20 }}>
        {branches.map((b) => {
          const open = isBranchOpenNow(b);
          return (
            <article
              key={b.id}
              style={{
                position: "relative",
                borderRadius: 26,
                overflow: "hidden",
                background: "#14291f",
                border: "1px solid var(--hairline)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.32)",
              }}
            >
              <a
                href={b.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  position: "relative",
                  height: 200,
                  textDecoration: "none",
                  cursor: "pointer",
                  background:
                    "radial-gradient(120% 100% at 50% 50%, rgba(236,229,209,0.16), rgba(184,217,160,0.05) 55%, rgba(12,28,20,0) 90%), #1d3a2a",
                }}
              >
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--sage)" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <Icon name="pin" size={42} sw={1.5} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--cream-50)", letterSpacing: "0.04em" }}>
                      {msg(locale, "ui", "directions")}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(12,28,20,0.05) 0%, rgba(12,28,20,0) 35%, rgba(11,24,17,0.86) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <span
                  className="badge"
                  style={{
                    position: "absolute",
                    top: 14,
                    insetInlineStart: 14,
                    background: open ? "rgba(184,217,160,0.92)" : "var(--surface)",
                    color: open ? "#10231a" : "var(--cream-50)",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: open ? "#10231a" : "var(--cream-50)" }} />
                  {open ? msg(locale, "branch", "open") : msg(locale, "branch", "closed")}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: 14,
                    insetInlineEnd: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: "rgba(20,41,31,0.86)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid var(--hairline)",
                    color: "var(--cream-bright)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  <Icon name="pin" size={14} sw={2} />
                  {msg(locale, "ui", "directions")}
                </span>
              </a>
              <div style={{ padding: "18px 20px 22px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, lineHeight: 1.05, color: "var(--cream-bright)" }}>
                  {localized(b, "name", locale)}
                </div>
                <div style={{ fontSize: 13, color: "var(--cream-50)", marginTop: 4 }}>{localized(b, "city", locale)}</div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <InfoRow icon="clock" label={msg(locale, "ui", "hours")} value={b.hours} />
                  <InfoRow icon="pin" label={msg(locale, "ui", "address")} value={localized(b, "address", locale)} />
                </div>
                <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a
                    href={b.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={pillSolid}
                  >
                    <Icon name="pin" size={16} sw={2} />
                    {msg(locale, "ui", "directions")}
                  </a>
                  <a href={`tel:${b.phone}`} style={pillSage}>
                    <Icon name="phone" size={16} sw={2} />
                    {msg(locale, "ui", "call")} · {b.phone}
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={pillSage}
                    aria-label={`${msg(locale, "ui", "instagram")} ${INSTAGRAM_ID}`}
                  >
                    <Icon name="instagram" size={16} sw={2} />
                    {msg(locale, "ui", "instagram")} · {INSTAGRAM_ID}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
        <div style={{ height: 30 }} />
      </main>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--sage-soft)", display: "grid", placeItems: "center", color: "var(--sage)", flexShrink: 0 }}>
        <Icon name={icon} size={16} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--cream-50)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 14, color: "var(--cream)", marginTop: 2, lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  );
}

const pillSolid: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "10px 18px",
  borderRadius: 999,
  background: "var(--cream)",
  color: "#10231a",
  fontFamily: "var(--font-body)",
  fontWeight: 700,
  fontSize: 13,
  textDecoration: "none",
  cursor: "pointer",
  border: "none",
};

const pillSage: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "10px 18px",
  borderRadius: 999,
  background: "var(--sage-soft)",
  color: "var(--sage)",
  fontFamily: "var(--font-body)",
  fontWeight: 700,
  fontSize: 13,
  textDecoration: "none",
  cursor: "pointer",
  border: "1px solid rgba(184,217,160,0.4)",
};
