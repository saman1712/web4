import type { CSSProperties } from "react";

type IconProps = {
  name: string;
  size?: number;
  sw?: number;
  className?: string;
  style?: CSSProperties;
};

const PATHS: Record<string, string> = {
  home: `<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>`,
  grid: `<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`,
  flame: `<path d="M12 3c1 3-1 4-1 6 0 1 1 2 1 2s2-1 2-3c2 2 3 4 3 6a5 5 0 0 1-10 0c0-3 2-5 3-7 0-1 1-2 2-4Z"/>`,
  pin: `<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>`,
  chevronLeft: `<polyline points="15 18 9 12 15 6"/>`,
  chevronDown: `<polyline points="6 9 12 15 18 9"/>`,
  globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>`,
  plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
  minus: `<line x1="5" y1="12" x2="19" y2="12"/>`,
  check: `<polyline points="20 6 9 17 4 12"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/>`,
  bolt: `<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z"/>`,
  heart: `<path d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3 1.2 3.8 2.3C10.6 5.7 11.6 4.5 13.6 4.5 17.1 4.5 18.6 8 18 11c-1.5 4-6 9-6 9Z"/>`,
  arrow: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>`,
  fork: `<path d="M5 3v5a2 2 0 0 0 4 0V3"/><path d="M7 3v18"/><path d="M16 3c-2 0-3 3-3 6s1 4 3 4v8"/>`,
  phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92Z"/>`,
  instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>`,
};

export function Icon({ name, size = 20, sw = 1.8, className, style }: IconProps) {
  const inner = PATHS[name] ?? PATHS.grid;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ direction: "ltr", flexShrink: 0, overflow: "visible", ...style }}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

export function CategoryIcon({ paths, size = 19 }: { paths: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
