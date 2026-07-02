"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" }
  ];

  return (
    <>
      <div className="bg-gold text-white text-xs sm:text-sm tracking-wide">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-1 text-center">
          <span>✨ FLAT 10% OFF ON PREPAID ORDERS</span>
          <span>🚚 FREE SHIPPING ON ORDERS ABOVE ₹999</span>
          <span className="hidden sm:inline">💎 CERTIFIED JEWELLERY</span>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-3xl sm:text-4xl tracking-wide text-ink">
              AKUN<span className="text-gold">.</span>
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.35em] text-gold font-medium">
              JEWELLERS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-ink">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6L4.5 3H2" />
                <circle cx="9" cy="20" r="1.4" fill="currentColor" />
                <circle cx="18" cy="20" r="1.4" fill="currentColor" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1">
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
