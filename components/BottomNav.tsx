"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "./Icon";
import { msg } from "@/lib/catalog";
import type { Locale } from "@/lib/locales";
import { useMenuStore } from "@/store/menu-store";

const TABS = [
  { id: "home", icon: "home", href: "" },
  { id: "menu", icon: "grid", href: "/menu" },
  { id: "offers", icon: "flame", href: "/specials" },
  { id: "branch", icon: "pin", href: "/branches" },
] as const;

export function BottomNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const prefix = `/${locale}`;
  const rest = pathname.replace(prefix, "") || "/";
  if (rest.startsWith("/dish/")) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        insetInline: 0,
        zIndex: 45,
        display: "flex",
        justifyContent: "center",
        padding: "12px 14px 30px",
        background: "linear-gradient(180deg, rgba(12,28,20,0) 0%, rgba(11,24,17,0.92) 38%)",
        pointerEvents: "none",
      }}
    >
      <div className="botbar-glass" style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", maxWidth: 452, padding: "8px 10px", pointerEvents: "auto" }}>
        {TABS.map((tab) => {
          const active =
            tab.id === "home"
              ? rest === "/"
              : rest === tab.href || rest.startsWith(`${tab.href}/`);
          const label =
            tab.id === "home"
              ? msg(locale, "nav", "home")
              : tab.id === "menu"
                ? msg(locale, "nav", "menu")
                : tab.id === "offers"
                  ? msg(locale, "nav", "specials")
                  : msg(locale, "nav", "branch");
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "home") router.push(prefix);
                else router.push(`${prefix}${tab.href}`);
              }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: active ? "var(--sage)" : "var(--cream-30)",
                fontFamily: "var(--font-body)",
                fontSize: 9.5,
                fontWeight: 600,
                padding: "7px 0",
                borderRadius: 999,
                transition: "color 0.25s",
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  display: "grid",
                  placeItems: "center",
                  transition: "transform 0.25s var(--ease-spring)",
                  transform: active ? "translateY(-1px)" : "none",
                }}
              >
                <Icon name={tab.icon} size={22} sw={tab.id === "home" ? 2.1 : 1.8} />
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ToastHost({ locale }: { locale: Locale }) {
  const toast = useMenuStore((s) => s.toast);
  const clearToast = useMenuStore((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 1700);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 104,
        insetInline: 0,
        zIndex: 80,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div className="toast-inner">
        <Icon name="check" size={17} sw={2.4} />
        {toast || msg(locale, "dish", "added")}
      </div>
    </div>
  );
}
