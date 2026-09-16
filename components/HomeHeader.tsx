"use client";

import { branches, localized } from "@/lib/catalog";
import type { Locale } from "@/lib/locales";
import { useMenuStore } from "@/store/menu-store";
import { BrandMark } from "./VisionLogo";
import { Icon } from "./Icon";

export function HomeHeader({ locale }: { locale: Locale }) {
  const branchId = useMenuStore((s) => s.branchId);
  const setSheet = useMenuStore((s) => s.setSheet);
  const branch = branches.find((b) => b.id === branchId) ?? branches[0];

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "54px 20px 14px",
        background: "linear-gradient(180deg, rgba(12,28,20,0.96) 30%, rgba(12,28,20,0) 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      <BrandMark />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="chip" onClick={() => setSheet("branch")}>
          <span className="dot" />
          {localized(branch, "name", locale)}
          <Icon name="chevronDown" size={15} sw={2} style={{ opacity: 0.6 }} />
        </button>
        <button className="chip" style={{ width: 38, padding: 0, justifyContent: "center" }} aria-label="language" onClick={() => setSheet("lang")}>
          <Icon name="globe" size={19} sw={1.7} />
        </button>
      </div>
    </div>
  );
}
