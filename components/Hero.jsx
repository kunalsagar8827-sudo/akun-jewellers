import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f3ece0] to-[#e9ddc9]">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="section-label">Timeless Beauty. Precious You.</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-ink mt-3">
            Elegant Jewellery
            <br />
            For Every Occasion
          </h1>
          <div className="divider-diamond justify-start ml-0.5">
            <span className="text-gold">◆</span>
          </div>
          <p className="text-ink/70 mt-4 max-w-md">
            Discover our exclusive collection crafted to celebrate your special moments.
          </p>
          <div className="flex items-center gap-6 mt-8 flex-wrap">
            <Link href="/shop" className="btn-gold">
              Shop Now
            </Link>
            <Link href="/shop" className="inline-flex items-center gap-2 font-medium tracking-wide text-ink hover:text-gold transition-colors">
              Explore Collections
              <span>→</span>
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-lg overflow-hidden shadow-card tilt-card">
          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80"
            alt="Elegant gold jewellery model wearing Akun Jewellers necklace and earrings"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
