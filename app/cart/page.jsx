"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQty, total, buildWhatsAppCheckoutUrl, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  function handleCheckout() {
    const url = buildWhatsAppCheckoutUrl(customer);
    window.open(url, "_blank");
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl mb-3">Your Cart is Empty</h1>
        <p className="text-ink/60 mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="btn-gold">Browse Jewellery</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl sm:text-4xl mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white rounded-md shadow-card p-3">
              <img
                src={item.image_url || "/placeholder.jpg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-gold text-sm">₹{item.price.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex items-center border border-gold/30 rounded-sm">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-1">−</button>
                <span className="px-3">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm ml-2">
                Remove
              </button>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-ink/50 underline">
            Clear cart
          </button>
        </div>

        <div className="bg-white rounded-md shadow-card p-6 h-fit">
          <h2 className="font-serif text-xl mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-gold/20 pt-3 mt-3">
            <span>Total</span>
            <span className="text-gold">₹{total.toLocaleString("en-IN")}</span>
          </div>

          <div className="mt-6 space-y-3">
            <input
              placeholder="Your Name"
              className="w-full border border-gold/30 rounded-sm px-3 py-2 text-sm"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
            <input
              placeholder="Phone Number"
              className="w-full border border-gold/30 rounded-sm px-3 py-2 text-sm"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />
            <textarea
              placeholder="Delivery Address"
              className="w-full border border-gold/30 rounded-sm px-3 py-2 text-sm"
              rows={3}
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
            />
          </div>

          <button onClick={handleCheckout} className="btn-gold w-full mt-5">
            Checkout via WhatsApp
          </button>
          <p className="text-xs text-ink/50 mt-2 text-center">
            You'll be redirected to WhatsApp to confirm your order & payment.
          </p>
        </div>
      </div>
    </div>
  );
}
