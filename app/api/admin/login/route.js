import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export async function POST(req) {
  const { username, password } = await req.json();

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (username !== validUser || password !== validPass) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = signAdminToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set("akun_admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return res;
}
