import { query } from "@/lib/db";

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://akunjewellers.vercel.app";
  const staticRoutes = ["", "/shop", "/about", "/contact", "/cart"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7
  }));

  let productRoutes = [];
  try {
    const { rows } = await query("SELECT slug, created_at FROM products");
    productRoutes = rows.map((p) => ({
      url: `${base}/product/${p.slug}`,
      lastModified: p.created_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    }));
  } catch {
    // DB not connected yet at build time — sitemap still works with static routes
  }

  return [...staticRoutes, ...productRoutes];
}
