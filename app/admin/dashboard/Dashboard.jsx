"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "./ProductForm";

export default function Dashboard({ categories }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const router = useRouter();

  async function loadProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h1 className="font-serif text-3xl">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button onClick={() => setEditing({})} className="btn-gold text-sm">
            + Add Product
          </button>
          <button onClick={handleLogout} className="btn-outline text-sm">
            Logout
          </button>
        </div>
      </div>

      {editing !== null && (
        <ProductForm
          categories={categories}
          product={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            loadProducts();
          }}
        />
      )}

      {loading ? (
        <p className="text-ink/60">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-ink/60">No products yet. Click "+ Add Product" to create one.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-md shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-cream text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-gold/10">
                  <td className="p-3">
                    <img src={p.image_url || "/placeholder.jpg"} alt={p.name} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.category_name || "-"}</td>
                  <td className="p-3">₹{Number(p.price).toLocaleString("en-IN")}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 space-x-3">
                    <button onClick={() => setEditing(p)} className="text-gold underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
