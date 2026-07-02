-- Run this once against your Neon database (via Neon SQL editor, or `npm run db:init`)

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  compare_price NUMERIC(10,2),
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  images JSONB DEFAULT '[]',
  stock INTEGER DEFAULT 10,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (name, slug, image_url) VALUES
  ('Necklaces', 'necklaces', 'https://res.cloudinary.com/demo/image/upload/necklace_placeholder.jpg'),
  ('Earrings', 'earrings', 'https://res.cloudinary.com/demo/image/upload/earring_placeholder.jpg'),
  ('Rings', 'rings', 'https://res.cloudinary.com/demo/image/upload/ring_placeholder.jpg'),
  ('Bracelets', 'bracelets', 'https://res.cloudinary.com/demo/image/upload/bracelet_placeholder.jpg'),
  ('Mangalsutra', 'mangalsutra', 'https://res.cloudinary.com/demo/image/upload/mangalsutra_placeholder.jpg'),
  ('Gift Sets', 'gift-sets', 'https://res.cloudinary.com/demo/image/upload/giftset_placeholder.jpg')
ON CONFLICT (slug) DO NOTHING;
