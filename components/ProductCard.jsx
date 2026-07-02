"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-md overflow-hidden shadow-card tilt-card">
      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image_url || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.is_featured && (
          <span className="absolute top-3 left-3 bg-gold text-white text-[10px] tracking-wide px-2 py-1 rounded-sm">
            FEATURED
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg text-ink hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gold font-semibold">₹{Number(product.price).toLocaleString("en-IN")}</span>
          {product.compare_price && (
            <span className="text-ink/40 text-sm line-through">
              ₹{Number(product.compare_price).toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product, 1)}
          className="mt-3 w-full btn-outline text-sm py-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
