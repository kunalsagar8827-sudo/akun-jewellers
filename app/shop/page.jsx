import ProductCard from "@/components/ProductCard";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop All Jewellery",
  description:
    "Browse our full collection of certified gold and diamond jewellery — necklaces, earrings, rings, bracelets, mangalsutra and gift sets. Free shipping above ₹999."
};

async function getCategories() {
  try {
    const { rows } = await query("SELECT * FROM categories ORDER BY id ASC");
    return rows;
  } catch {
    return [];
  }
}

async function getProducts(categorySlug) {
  try {
    if (categorySlug) {
      const { rows } = await query(
        `SELECT p.* FROM products p
         JOIN categories c ON c.id = p.category_id
         WHERE c.slug = $1
         ORDER BY p.created_at DESC`,
        [categorySlug]
      );
      return rows;
    }
    const { rows } = await query("SELECT * FROM products ORDER BY created_at DESC");
    return rows;
  } catch {
    return [];
  }
}

export default async function ShopPage({ searchParams }) {
  const categorySlug = searchParams?.category;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(categorySlug)
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p className="section-label">Our Collections</p>
        <h1 className="font-serif text-3xl sm:text-4xl mt-2">Shop All Jewellery</h1>
        <div className="divider-diamond">
          <span className="text-gold">◆</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <a
          href="/shop"
          className={`px-4 py-2 text-sm rounded-full border transition-colors ${
            !categorySlug ? "bg-gold text-white border-gold" : "border-gold/40 text-ink hover:border-gold"
          }`}
        >
          All
        </a>
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/shop?category=${c.slug}`}
            className={`px-4 py-2 text-sm rounded-full border transition-colors ${
              categorySlug === c.slug
                ? "bg-gold text-white border-gold"
                : "border-gold/40 text-ink hover:border-gold"
            }`}
          >
            {c.name}
          </a>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-center text-ink/60 py-20">
          No products yet — add some from the{" "}
          <a href="/admin" className="text-gold underline">
            admin panel
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
