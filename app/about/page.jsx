export const metadata = {
  title: "About Us",
  description: "Learn about Akun Jewellers — our craftsmanship, certification and commitment to timeless, elegant jewellery for every occasion."
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="section-label text-center">Our Story</p>
      <h1 className="font-serif text-3xl sm:text-4xl text-center mt-2">About Akun Jewellers</h1>
      <div className="divider-diamond"><span className="text-gold">◆</span></div>
      <p className="text-ink/70 leading-relaxed mt-6">
        Akun Jewellers was founded with one simple belief — that every piece of jewellery should
        tell a story of elegance, trust, and craftsmanship. Every design we create is 100%
        certified and hallmarked, crafted with precision to celebrate life's most precious
        moments — weddings, festivals, anniversaries, and everyday beauty.
      </p>
      <p className="text-ink/70 leading-relaxed mt-4">
        From necklaces and earrings to bridal mangalsutra sets, our collection blends timeless
        Indian tradition with contemporary design. We're committed to quality, transparency, and
        making sure every customer feels valued — from browsing to checkout to delivery.
      </p>
    </div>
  );
}
