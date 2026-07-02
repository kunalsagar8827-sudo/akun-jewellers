"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function AddToCartBox({ product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gold/40 rounded-sm">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg">
            −
          </button>
          <span className="px-4">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-lg">
            +
          </button>
        </div>
        <button
          onClick={() => {
            addToCart(product, qty);
            setAdded(true);
          }}
          className="btn-gold flex-1"
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
      {added && (
        <p className="text-sm text-gold mt-3">
          Added to cart! <Link href="/cart" className="underline">View Cart →</Link>
        </p>
      )}
    </div>
  );
}
