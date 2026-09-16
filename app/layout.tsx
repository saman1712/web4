import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Plus_Jakarta_Sans, Vazirmatn } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vision — Fire-grilled, beautifully served",
    template: "%s · Vision",
  },
  description: "Premium charcoal-grilled restaurant. Scan, browse and order from your table.",
  applicationName: "Vision",
  openGraph: {
    title: "Vision — Fire-grilled, beautifully served",
    description: "Premium charcoal-grilled restaurant. Scan, browse and order from your table.",
    siteName: "Vision",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#10231a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className={`${bodoni.variable} ${jakarta.variable} ${vazir.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
