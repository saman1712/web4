export function BrandMark({ size = 21 }: { size?: number }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "0.04em",
        color: "var(--cream-bright)",
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        gap: 9,
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "var(--sage-soft)",
          border: "1px solid rgba(184,217,160,0.3)",
          color: "var(--sage)",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c1 3-1 4-1 6 0 1 1 2 1 2s2-1 2-3c2 2 3 4 3 6a5 5 0 0 1-10 0c0-3 2-5 3-7 0-1 1-2 2-4Z" />
        </svg>
      </span>
      ویژن
    </div>
  );
}
