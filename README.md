# Akun Jewellers — E-commerce Website

Next.js website with admin panel, Neon Postgres database, Cloudinary image uploads,
and WhatsApp-based checkout. SEO-ready with metadata, JSON-LD, sitemap & robots.txt.

---

## 🧩 What's inside

- **Home / Shop / Product / Cart / About / Contact** — public storefront (matches your reference design)
- **Admin panel** (`/admin`) — login, then add/edit/delete products at `/admin/dashboard`
- **Cloudinary** — product images upload karne ke liye
- **Neon Postgres** — products & categories store karne ke liye
- **WhatsApp checkout** — cart → checkout button → order details WhatsApp pe (+91 8882767450) chali jaati hain
- **SEO** — page titles/meta, Open Graph tags, JSON-LD (JewelryStore + Product schema), auto sitemap.xml, robots.txt

> ⚠️ Note: WhatsApp checkout ek **real payment gateway nahi hai** — ye sirf order details WhatsApp par bhej deta hai.
> Payment aap manually UPI/cash on delivery se lenge, ya baad me Razorpay/PayU jaisa gateway add kar sakte hain.

---

## 1️⃣ Local setup

```bash
npm install
cp .env.example .env.local
```

`.env.local` file khol ke ye values bharo:

| Variable | Kahan se milega |
|---|---|
| `DATABASE_URL` | [neon.tech](https://neon.tech) pe free account bana ke naya project banao, "Connection string" copy karo |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | [cloudinary.com](https://cloudinary.com) free account → Dashboard pe top par hi milenge |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | apni marzi ka username/password rakh do |
| `JWT_SECRET` | koi bhi random lamba string (e.g. `openssl rand -hex 32`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | already `918882767450` set hai |
| `NEXT_PUBLIC_SITE_URL` | abhi `http://localhost:3000` rakho, Vercel deploy ke baad live URL daal dena |

## 2️⃣ Database banao

```bash
npm run db:init
```

Ye `schema.sql` run karega — `products` aur `categories` table + 6 default categories bana dega.

## 3️⃣ Site chalao

```bash
npm run dev
```

Browser me kholo: `http://localhost:3000`

Admin panel: `http://localhost:3000/admin` (jo username/password `.env.local` me daala tha wahi use karo)

## 4️⃣ Products add karo

`/admin` pe login karo → `/admin/dashboard` → "+ Add Product" → image upload karo (Cloudinary pe save hogi), naam/description/price/category/stock bharo → Create.

## 5️⃣ Vercel pe deploy

1. Is project ko GitHub pe push karo
2. [vercel.com](https://vercel.com) pe GitHub repo import karo
3. Deploy karne se pehle **Environment Variables** section me `.env.local` ki saari values daal do (same names)
4. Deploy ke baad jo URL mile, use wapas Vercel env variable `NEXT_PUBLIC_SITE_URL` me update karo aur redeploy karo (SEO tags/sitemap ke liye zaroori hai)

## 6️⃣ SEO ke liye aage kya karein

- Real product photos use karo (Cloudinary), alt text me product name likha hi jaata hai automatically
- [Google Search Console](https://search.google.com/search-console) me site verify karo aur `sitemap.xml` submit karo — ye already auto-generate hoti hai: `yoursite.com/sitemap.xml`
- Google Business Profile bhi banao "Akun Jewellers" name se — local SEO (GEO) ke liye best hota hai
- Har product ka description unique aur detailed rakho — thin/duplicate content Google me rank kam karta hai

## 🎨 Design notes

- Gold + cream + ink color theme, Playfair Display + Poppins fonts — aapki reference image jaisa hi
- Hover par cards halka sa "3D tilt" karte hain (`.tilt-card` class) — premium feel ke liye
- Poori site mobile + tablet + laptop pe fully responsive hai (Tailwind CSS)

## 📁 Project structure

```
app/            → pages (home, shop, product, cart, admin, about, contact) + API routes
components/     → Header, Footer, Hero, ProductCard, CategoryGrid, FeatureBar
context/        → CartContext (localStorage-based cart + WhatsApp checkout link builder)
lib/            → db.js (Neon), cloudinary.js, auth.js (admin JWT), slugify.js
schema.sql      → database tables
```

Koi bhi dikkat aaye to error message dekh ke bata dena, main fix kar dunga.
