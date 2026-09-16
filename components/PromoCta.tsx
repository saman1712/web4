import Link from "next/link";
import { Icon } from "./Icon";

export function PromoCta({ href, children }: { href: string; children: React.ReactNode }) {
  const label = typeof children === "string" ? children : undefined;
  return (
    <Link
      href={href}
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 13,
        fontWeight: 600,
        color: "#10231a",
        background: "var(--cream)",
        padding: "9px 15px",
        borderRadius: 999,
        textDecoration: "none",
        flexShrink: 0,
        position: "relative",
        zIndex: 2,
        boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
      }}
    >
      {children}
      <span className="rtl-flip">
        <Icon name="arrow" size={15} sw={2} />
      </span>
    </Link>
  );
}
