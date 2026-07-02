import Link from "next/link";

export default function CategoryGrid({ categories }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <p className="section-label">Our Collections</p>
      <h2 className="font-serif text-3xl sm:text-4xl mt-2">Shop By Category</h2>
      <div className="divider-diamond">
        <span className="text-gold">◆</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-10">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            className="group relative aspect-[3/4] rounded-md overflow-hidden shadow-card tilt-card"
          >
            <img
              src={cat.image_url}
              alt={`${cat.name} jewellery collection`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-left">
              <p className="font-semibold tracking-wide text-sm">{cat.name.toUpperCase()}</p>
              <p className="text-xs text-white/80">Explore Now</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
