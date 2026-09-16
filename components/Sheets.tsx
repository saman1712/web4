"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { branches, isBranchOpenNow, localized, msg } from "@/lib/catalog";
import type { Locale } from "@/lib/locales";
import { LOCALES } from "@/lib/locales";
import { useMenuStore } from "@/store/menu-store";
import { Icon } from "./Icon";

export function BranchSheet({ locale }: { locale: Locale }) {
  const sheet = useMenuStore((s) => s.sheet);
  const branchId = useMenuStore((s) => s.branchId);
  const setBranch = useMenuStore((s) => s.setBranch);
  const setSheet = useMenuStore((s) => s.setSheet);
  if (sheet !== "branch") return null;

  return (
    <div className="sheet-wrap" onClick={() => setSheet(null)}>
      <div className="sheet-panel" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        <div className="eyebrow">
          <span className="rule" />
          {msg(locale, "branch", "chooseBranch")}
        </div>
        <h2 className="hero-title" style={{ fontSize: 32, marginTop: 10 }}>
          {msg(locale, "branch", "chooseBranchSub")}
        </h2>
        <div style={{ marginTop: 22 }}>
          {branches.map((b) => {
            const open = isBranchOpenNow(b);
            const sel = b.id === branchId;
            return (
              <button
                key={b.id}
                className={`opt-row ${sel ? "sel" : ""}`}
                onClick={() => setBranch(b.id)}
                style={{ width: "100%", textAlign: "start" }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 14, background: "var(--sage-soft)", display: "grid", placeItems: "center", color: "var(--sage)" }}>
                  <Icon name="pin" size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--cream-bright)" }}>
                    {localized(b, "name", locale)}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--cream-50)", marginTop: 3 }}>
                    {localized(b, "city", locale)} · {localized(b, "address", locale)}
                  </div>
                </div>
                <span className="badge" style={{ background: open ? "rgba(184,217,160,0.92)" : "var(--surface)", color: open ? "#10231a" : "var(--cream-50)" }}>
                  {open ? msg(locale, "branch", "open") : msg(locale, "branch", "closed")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const LANGS: { id: Locale; label: string; sub: string }[] = [
  { id: "fa", label: "فارسی", sub: "Persian · RTL" },
  { id: "en", label: "English", sub: "English · LTR" },
  { id: "ar", label: "العربية", sub: "Arabic · RTL" },
];

export function LangSheet({ locale }: { locale: Locale }) {
  const sheet = useMenuStore((s) => s.sheet);
  const setSheet = useMenuStore((s) => s.setSheet);
  const router = useRouter();
  if (sheet !== "lang") return null;

  return (
    <div className="sheet-wrap" onClick={() => setSheet(null)}>
      <div className="sheet-panel" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        <div className="eyebrow">
          <span className="rule" />
          {msg(locale, "lang", "chooseLang")}
        </div>
        <h2 className="hero-title" style={{ fontSize: 32, marginTop: 10 }}>
          {msg(locale, "lang", "chooseLangSub")}
        </h2>
        <div style={{ marginTop: 22 }}>
          {LANGS.filter((l) => LOCALES.includes(l.id)).map((l) => (
            <button
              key={l.id}
              className={`opt-row ${l.id === locale ? "sel" : ""}`}
              style={{ width: "100%", textAlign: "start" }}
              onClick={() => {
                const path = window.location.pathname.replace(/^\/(fa|en|ar)/, `/${l.id}`);
                setSheet(null);
                router.push(path);
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 14, background: "var(--sage-soft)", display: "grid", placeItems: "center", color: "var(--sage)" }}>
                <Icon name="globe" size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--cream-bright)" }}>{l.label}</div>
                <div style={{ fontSize: 13, color: "var(--cream-50)", marginTop: 3 }}>{l.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BackButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: "var(--surface)",
        border: "1px solid var(--hairline)",
        color: "var(--cream)",
        display: "grid",
        placeItems: "center",
        flex: "0 0 42px",
      }}
      aria-label="Back"
    >
      <Icon name="chevronLeft" size={20} sw={2.2} className="rtl-flip" />
    </Link>
  );
}
