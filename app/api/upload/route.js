import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { verifyAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const token = cookies().get("akun_admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "akun-jewellers",
      resource_type: "image"
    });

    return NextResponse.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
