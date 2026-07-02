import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://akunjewellers.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Akun Jewellers | Certified Gold & Diamond Jewellery Online India",
    template: "%s | Akun Jewellers"
  },
  description:
    "Akun Jewellers - Shop certified, hallmarked gold, diamond & bridal jewellery online. Necklaces, earrings, rings, bracelets, mangalsutra & gift sets. Free shipping above ₹999. Order easily via WhatsApp.",
  keywords: [
    "Akun Jewellers",
    "buy jewellery online India",
    "gold jewellery online",
    "diamond necklace online",
    "bridal jewellery India",
    "certified hallmark jewellery",
    "earrings online India",
    "rings online India",
    "mangalsutra online",
    "artificial jewellery online"
  ],
  authors: [{ name: "Akun Jewellers" }],
  creator: "Akun Jewellers",
  publisher: "Akun Jewellers",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Akun Jewellers",
    title: "Akun Jewellers | Timeless Elegance, Certified Jewellery",
    description:
      "Shop certified, hallmarked gold & diamond jewellery online. Necklaces, earrings, rings, bracelets, mangalsutra & gift sets — crafted for every occasion.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Akun Jewellers" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Akun Jewellers | Timeless Elegance",
    description: "Certified gold & diamond jewellery online. Shop necklaces, earrings, rings & more.",
    images: ["/og-image.jpg"]
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: "Akun Jewellers",
    description:
      "Certified hallmarked gold and diamond jewellery store offering necklaces, earrings, rings, bracelets, mangalsutra and gift sets.",
    url: SITE_URL,
    telephone: "+91-8882767450",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN"
    },
    sameAs: []
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
