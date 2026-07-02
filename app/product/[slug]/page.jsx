import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import AddToCartBox from "./AddToCartBox";

export const dynamic = "force-dynamic";

async function getProduct(slug) {
  try {
    const { rows } = await query("SELECT * FROM products WHERE slug = $1", [slug]);
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description?.slice(0, 155) || `Buy ${product.name} online at Akun Jewellers.`,
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 155),
      images: product.image_url ? [{ url: product.image_url }] : []
    }
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image_url,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-md overflow-hidden shadow-card">
          <img src={product.image_url || "/placeholder.jpg"} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-gold text-2xl font-semibold">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
            {product.compare_price && (
              <span className="text-ink/40 line-through">
                ₹{Number(product.compare_price).toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <p className="text-ink/70 mt-5 leading-relaxed">{product.description}</p>
          <p className="text-sm mt-3 text-ink/60">
            {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : "❌ Out of Stock"}
          </p>
          <AddToCartBox product={product} />
        </div>
      </div>
    </div>
  );
}
