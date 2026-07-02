export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://akunjewellers.vercel.app";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }
    ],
    sitemap: `${base}/sitemap.xml`
  };
}
