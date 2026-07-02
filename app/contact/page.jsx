export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Akun Jewellers on WhatsApp for orders, queries, or custom jewellery requests."
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <p className="section-label">Get In Touch</p>
      <h1 className="font-serif text-3xl sm:text-4xl mt-2">Contact Us</h1>
      <div className="divider-diamond"><span className="text-gold">◆</span></div>
      <p className="text-ink/70 mt-6">
        Have a question about a product, an order, or want something custom made? Message us
        directly on WhatsApp and our team will respond quickly.
      </p>
      <a
        href="https://wa.me/918882767450"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold mt-8"
      >
        Chat on WhatsApp
      </a>
      <p className="text-ink/50 text-sm mt-4">+91 88827 67450</p>
    </div>
  );
}
