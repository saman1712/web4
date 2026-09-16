"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/locales";
import { dirOf } from "@/lib/locales";

export function LocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dirOf(locale);
  }, [locale]);
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(dirOf(locale))};`,
      }}
    />
  );
}
