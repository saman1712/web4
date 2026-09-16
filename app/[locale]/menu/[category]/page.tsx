import { categories } from "@/lib/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export { default } from "../page";
