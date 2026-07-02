import Hero from "@/components/Hero";
import FeatureBar from "@/components/FeatureBar";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCategories() {
  try {
    const { rows } = await query("SELECT * FROM categories ORDER BY id ASC");
    return rows;
  } catch {
    return [];
  }
}

async function getFeaturedProducts() {
  try {
    const { rows } = await query(
      "SELECT * FROM products WHERE is_featured = true ORDER BY created_at DESC LIMIT 8"
    );
    return rows;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeaturedProducts()]);

  return (
    <>
      <Hero />
      <FeatureBar />
      <CategoryGrid categories={categories} />

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="section-label">Handpicked For You</p>
          <h2 className="font-serif text-3xl sm:text-4xl mt-2">Featured Jewellery</h2>
          <div className="divider-diamond">
            <span className="text-gold">◆</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-left">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-ink text-cream">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl">Order Directly on WhatsApp</h2>
          <p className="text-cream/70 mt-3 max-w-xl mx-auto">
            Add your favourite pieces to cart, checkout in one click, and your order lands
            straight in our WhatsApp inbox — quick, personal, and simple.
          </p>
          <a
            href="https://wa.me/918882767450"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-6"
          >
            Chat With Us
          </a>
        </div>
      </section>
    </>
  );
}
