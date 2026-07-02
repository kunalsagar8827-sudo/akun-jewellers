import { NextResponse } from "next/server";

// Lightweight check in the Edge middleware (just presence of the cookie).
// Full JWT verification happens again in the dashboard layout (Node runtime),
// so this is a fast first gate, not the only gate.
export function middleware(req) {
  const token = req.cookies.get("akun_admin_token")?.value;
  if (!token) {
    const loginUrl = new URL("/admin", req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"]
};
