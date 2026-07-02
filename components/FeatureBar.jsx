const features = [
  { icon: "💎", title: "Certified Jewellery", sub: "100% Hallmarked Jewellery" },
  { icon: "🚚", title: "Free Shipping", sub: "On orders above ₹999" },
  { icon: "🛡️", title: "Secure Payment", sub: "100% Safe & Secure" },
  { icon: "🎧", title: "24/7 Customer Support", sub: "We're here to help you" }
];

export default function FeatureBar() {
  return (
    <section className="bg-cream border-y border-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="flex items-center gap-3">
            <span className="text-2xl">{f.icon}</span>
            <div>
              <p className="text-sm font-semibold text-ink">{f.title}</p>
              <p className="text-xs text-ink/60">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
