"use client";

import { create } from "zustand";

export type CartLine = {
  dishId: string;
  variantId?: string;
  qty: number;
};

type Sheet = "branch" | "lang" | "add" | "cart" | null;

type MenuState = {
  branchId: string;
  toast: string | null;
  sheet: Sheet;
  addDishId: string | null;
  cart: CartLine[];
  setBranch: (id: string) => void;
  setSheet: (sheet: Sheet, addDishId?: string | null) => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
  addToCart: (dishId: string, variantId?: string, qty?: number) => void;
  setQty: (dishId: string, variantId: string | undefined, qty: number) => void;
  clearCart: () => void;
};

export const useMenuStore = create<MenuState>((set, get) => ({
  branchId: "isfahan-markazi",
  toast: null,
  sheet: null,
  addDishId: null,
  cart: [],
  setBranch: (id) => set({ branchId: id, sheet: null }),
  setSheet: (sheet, addDishId = null) => set({ sheet, addDishId }),
  showToast: (msg) => set({ toast: msg }),
  clearToast: () => set({ toast: null }),
  addToCart: (dishId, variantId, qty = 1) => {
    const cart = [...get().cart];
    const i = cart.findIndex((l) => l.dishId === dishId && l.variantId === variantId);
    if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + qty };
    else cart.push({ dishId, variantId, qty });
    set({ cart, sheet: null, addDishId: null });
  },
  setQty: (dishId, variantId, qty) => {
    const cart = get()
      .cart.map((l) => (l.dishId === dishId && l.variantId === variantId ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
    set({ cart });
  },
  clearCart: () => set({ cart: [] }),
}));
