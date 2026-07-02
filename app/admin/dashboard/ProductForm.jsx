"use client";

import { useState } from "react";

export default function ProductForm({ categories, product, onClose, onSaved }) {
  const isEdit = Boolean(product?.id);
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    compare_price: product?.compare_price || "",
    category_id: product?.category_id || "",
    stock: product?.stock ?? 10,
    is_featured: product?.is_featured || false,
    image_url: product?.image_url || ""
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((f) => ({ ...f, image_url: data.url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        compare_price: form.compare_price ? Number(form.compare_price) : null,
        category_id: form.category_id ? Number(form.category_id) : null,
        stock: Number(form.stock)
      };
      const url = isEdit ? `/api/products/${product.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-md p-6 w-full max-w-lg my-8 space-y-4">
        <h2 className="font-serif text-2xl">{isEdit ? "Edit Product" : "Add Product"}</h2>

        <input
          placeholder="Product Name"
          className="w-full border border-gold/30 rounded-sm px-3 py-2 text-sm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          rows={3}
          className="w-full border border-gold/30 rounded-sm px-3 py-2 text-sm"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            step="0.01"
            placeholder="Price (₹)"
            className="border border-gold/30 rounded-sm px-3 py-2 text-sm"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Compare Price (optional)"
            className="border border-gold/30 rounded-sm px-3 py-2 text-sm"
            value={form.compare_price}
            onChange={(e) => setForm({ ...form, compare_price: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select
            className="border border-gold/30 rounded-sm px-3 py-2 text-sm"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">No Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Stock"
            className="border border-gold/30 rounded-sm px-3 py-2 text-sm"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
          />
          Show in Featured section on homepage
        </label>

        <div>
          <label className="block text-sm mb-1">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
          {uploading && <p className="text-xs text-gold mt-1">Uploading to Cloudinary...</p>}
          {form.image_url && (
            <img src={form.image_url} alt="Preview" className="w-20 h-20 object-cover rounded mt-2" />
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving || uploading} className="btn-gold flex-1">
            {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
