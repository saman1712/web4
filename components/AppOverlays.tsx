"use client";

import { AddSheet } from "./AddSheet";
import { BranchSheet, LangSheet } from "./Sheets";
import { ToastHost } from "./BottomNav";
import type { Locale } from "@/lib/locales";

export function AppOverlays({ locale }: { locale: Locale }) {
  return (
    <>
      <BranchSheet locale={locale} />
      <LangSheet locale={locale} />
      <AddSheet locale={locale} />
      <ToastHost locale={locale} />
    </>
  );
}
