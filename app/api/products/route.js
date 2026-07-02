import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { verifyAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";

function isAdmin() {
  const token = cookies().get("akun_admin_token")?.value;
  return token && verifyAdminToken(token);
}

export async function GET() {
  try {
    const { rows } = await query(
      `SELECT p.*, c.name as category_name FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       ORDER BY p.created_at DESC`
    );
    return NextResponse.json({ products: rows });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, description, price, compare_price, category_id, image_url, images, stock, is_featured } = body;

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    let slug = slugify(name);
    const existing = await query("SELECT id FROM products WHERE slug = $1", [slug]);
    if (existing.rows.length > 0) slug = `${slug}-${Date.now()}`;

    const { rows } = await query(
      `INSERT INTO products (name, slug, description, price, compare_price, category_id, image_url, images, stock, is_featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        name,
        slug,
        description || "",
        price,
        compare_price || null,
        category_id || null,
        image_url || null,
        JSON.stringify(images || []),
        stock ?? 10,
        is_featured || false
      ]
    );

    return NextResponse.json({ product: rows[0] }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
