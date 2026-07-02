"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "akun_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image_url: product.image_url,
          slug: product.slug,
          qty
        }
      ];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  function buildWhatsAppCheckoutUrl(customer) {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918882767450";
    let msg = `Hi Akun Jewellers! I'd like to place an order:\n\n`;
    items.forEach((i, idx) => {
      msg += `${idx + 1}. ${i.name} x${i.qty} - ₹${(i.price * i.qty).toLocaleString("en-IN")}\n`;
    });
    msg += `\nTotal: ₹${total.toLocaleString("en-IN")}\n`;
    if (customer?.name) msg += `\nName: ${customer.name}`;
    if (customer?.phone) msg += `\nPhone: ${customer.phone}`;
    if (customer?.address) msg += `\nAddress: ${customer.address}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count, buildWhatsAppCheckoutUrl }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
