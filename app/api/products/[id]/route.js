import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";

function isAdmin() {
  const token = cookies().get("akun_admin_token")?.value;
  return token && verifyAdminToken(token);
}

export async function GET(_req, { params }) {
  try {
    const { rows } = await query("SELECT * FROM products WHERE id = $1", [params.id]);
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product: rows[0] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, description, price, compare_price, category_id, image_url, images, stock, is_featured } = body;

    const { rows } = await query(
      `UPDATE products SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        price = COALESCE($3, price),
        compare_price = $4,
        category_id = $5,
        image_url = COALESCE($6, image_url),
        images = COALESCE($7, images),
        stock = COALESCE($8, stock),
        is_featured = COALESCE($9, is_featured)
       WHERE id = $10 RETURNING *`,
      [
        name,
        description,
        price,
        compare_price || null,
        category_id || null,
        image_url,
        images ? JSON.stringify(images) : null,
        stock,
        is_featured,
        params.id
      ]
    );

    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product: rows[0] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await query("DELETE FROM products WHERE id = $1", [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
