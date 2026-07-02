import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/auth";
import { query } from "@/lib/db";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

async function getCategories() {
  try {
    const { rows } = await query("SELECT * FROM categories ORDER BY id ASC");
    return rows;
  } catch {
    return [];
  }
}

export default async function AdminDashboardPage() {
  const token = cookies().get("akun_admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    redirect("/admin");
  }

  const categories = await getCategories();

  return <Dashboard categories={categories} />;
}
