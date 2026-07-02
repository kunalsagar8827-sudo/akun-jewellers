import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-serif text-2xl mb-3">
            AKUN<span className="text-gold">.</span> JEWELLERS
          </h3>
          <p className="text-sm text-cream/70 leading-relaxed">
            Timeless elegance in every piece. Certified, hallmarked jewellery crafted for your
            most precious moments.
          </p>
        </div>
        <div>
          <h4 className="text-gold text-sm tracking-widest uppercase mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/shop" className="hover:text-gold">All Products</Link></li>
            <li><Link href="/shop?category=necklaces" className="hover:text-gold">Necklaces</Link></li>
            <li><Link href="/shop?category=earrings" className="hover:text-gold">Earrings</Link></li>
            <li><Link href="/shop?category=rings" className="hover:text-gold">Rings</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold text-sm tracking-widest uppercase mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact Us</Link></li>
            <li><Link href="/admin" className="hover:text-gold">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold text-sm tracking-widest uppercase mb-4">Get in Touch</h4>
          <p className="text-sm text-cream/80">WhatsApp: +91 88827 67450</p>
          <p className="text-sm text-cream/80 mt-2">100% Hallmarked · Secure Payments · 24/7 Support</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Akun Jewellers. All rights reserved.
      </div>
    </footer>
  );
}
