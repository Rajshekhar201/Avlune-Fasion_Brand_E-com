"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, Save, AlertCircle } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { products as staticProducts } from "@/data/products";

const CATEGORIES = ["Rings", "Earrings", "Necklaces", "Bracelets"];

const emptyForm = {
  name: "",
  price: "",
  category: "Rings",
  description: "",
  image: "",
  sizes: "",
  status: "active",
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [useSupabase, setUseSupabase] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("products").select("*").order("id");
      if (error) throw error;
      if (data && data.length > 0) {
        setProducts(data);
        setUseSupabase(true);
      } else {
        setProducts(staticProducts);
        setUseSupabase(false);
      }
    } catch {
      setProducts(staticProducts);
      setUseSupabase(false);
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "Rings",
      description: product.description || "",
      image: product.image || "",
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : (product.sizes || ""),
      status: product.status || "active",
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!useSupabase) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirm(null);
      showNotif("Product removed locally (Supabase not seeded)");
      return;
    }
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showNotif("Product deleted successfully");
    } else {
      showNotif("Failed to delete product", "error");
    }
    setDeleteConfirm(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      category: form.category,
      description: form.description.trim(),
      image: form.image.trim(),
      sizes: form.sizes ? form.sizes.split(",").map(s => s.trim()).filter(Boolean) : [],
      status: form.status,
    };

    if (useSupabase) {
      if (editingId) {
        const { data, error } = await supabase.from("products").update(payload).eq("id", editingId).select().single();
        if (!error) {
          setProducts(prev => prev.map(p => p.id === editingId ? data : p));
          showNotif("Product updated!");
        } else showNotif("Update failed", "error");
      } else {
        const { data, error } = await supabase.from("products").insert(payload).select().single();
        if (!error) {
          setProducts(prev => [...prev, data]);
          showNotif("Product added!");
        } else showNotif("Add failed", "error");
      }
    } else {
      // Local state fallback
      if (editingId) {
        setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...payload } : p));
        showNotif("Product updated locally");
      } else {
        const newProduct = { ...payload, id: Date.now() };
        setProducts(prev => [...prev, newProduct]);
        showNotif("Product added locally (connect Supabase to persist)");
      }
    }

    setSaving(false);
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AlertCircle size={16} />
            {notification.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="page-header">
        <h1 className="admin-page-title">Products</h1>
        <button className="add-btn" onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      {!useSupabase && (
        <div className="info-banner">
          ⚡ Showing local data — Supabase not seeded yet. Run the seed script to sync.
        </div>
      )}

      {/* Add / Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="form-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="form-header">
              <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => { setShowForm(false); setEditingId(null); }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Lumière Diamond Ring" />
                </div>
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input required type="number" min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="35000" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="form-group full">
                <label>Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Product description..." />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Image Path</label>
                  <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/rings.png" />
                </div>
                <div className="form-group">
                  <label>Sizes (comma-separated)</label>
                  <input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} placeholder="US 5, US 6, US 7" />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? "Saving…" : <><Save size={16} /> Save Product</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input placeholder="Search products or categories…" value={search} onChange={e => setSearch(e.target.value)} />
        {search && <button onClick={() => setSearch("")}><X size={16} /></button>}
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="loading">Loading products…</div>
      ) : (
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td>
                    <div className="product-cell">
                      <div className="product-img">
                        {product.image ? <img src={product.image} alt={product.name} onError={e => e.target.style.display='none'} /> : <span>💍</span>}
                      </div>
                      <div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-desc">{product.description?.slice(0, 60)}…</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge">{product.category}</span></td>
                  <td className="price-cell">₹{Number(product.price).toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`status-badge ${product.status || 'active'}`}>
                      {(product.status || 'active').replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn edit" onClick={() => handleEdit(product)} title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button className="icon-btn delete" onClick={() => setDeleteConfirm(product.id)} title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="empty-state">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              <h3>Are you sure?</h3>
              <p>This action cannot be undone.</p>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="delete-confirm-btn" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .products-page { padding-bottom: 2rem; }
        .notification { display: flex; align-items: center; gap: 0.5rem; position: fixed; top: 1.5rem; right: 1.5rem; z-index: 9999; background: #111; color: white; padding: 0.75rem 1.25rem; border-radius: 8px; font-size: 0.875rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .notification.error { background: #EF4444; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .add-btn { display: flex; align-items: center; gap: 0.5rem; background: #111; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .add-btn:hover { background: var(--color-accent); }
        .info-banner { background: #FEF3C7; border: 1px solid #FCD34D; color: #92400E; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.875rem; margin-bottom: 1.5rem; }
        .form-card { background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
        .form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .form-header h2 { font-size: 1.25rem; color: #111; }
        .product-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.375rem; }
        .form-group.full { grid-column: 1 / -1; }
        .form-group label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6B7280; }
        .form-group input, .form-group select, .form-group textarea { padding: 0.75rem 1rem; border: 1.5px solid #E5E7EB; border-radius: 8px; font-size: 0.875rem; outline: none; transition: border-color 0.2s; font-family: inherit; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--color-accent); }
        .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 0.5rem; }
        .cancel-btn { padding: 0.75rem 1.5rem; border: 1.5px solid #E5E7EB; border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500; background: white; }
        .cancel-btn:hover { background: #F9FAFB; }
        .save-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #111; color: white; border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500; }
        .save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .save-btn:not(:disabled):hover { background: var(--color-accent); }
        .search-bar { display: flex; align-items: center; gap: 0.75rem; background: white; border: 1.5px solid #E5E7EB; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.5rem; }
        .search-bar input { flex: 1; border: none; outline: none; font-size: 0.875rem; background: transparent; }
        .search-icon { color: #9CA3AF; flex-shrink: 0; }
        .table-wrapper { background: white; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow-x: auto; }
        .products-table { width: 100%; border-collapse: collapse; }
        .products-table th { text-align: left; padding: 1rem 1.25rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; border-bottom: 1px solid #F3F4F6; white-space: nowrap; }
        .products-table td { padding: 1rem 1.25rem; border-bottom: 1px solid #F9FAFB; font-size: 0.875rem; color: #374151; }
        .products-table tr:last-child td { border-bottom: none; }
        .products-table tr:hover td { background: #FAFAFA; }
        .product-cell { display: flex; align-items: center; gap: 0.875rem; }
        .product-img { width: 48px; height: 48px; border-radius: 8px; background: #F3F4F6; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.25rem; }
        .product-img img { width: 100%; height: 100%; object-fit: cover; }
        .product-name { font-weight: 600; color: #111; }
        .product-desc { font-size: 0.75rem; color: #9CA3AF; margin-top: 0.125rem; }
        .badge { display: inline-block; padding: 0.25rem 0.75rem; background: #F3F4F6; border-radius: 999px; font-size: 0.75rem; font-weight: 500; }
        .price-cell { font-weight: 600; color: #111; font-family: var(--font-display); }
        .status-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; text-transform: capitalize; }
        .status-badge.active { background: #D1FAE5; color: #065F46; }
        .status-badge.draft { background: #FEF3C7; color: #92400E; }
        .status-badge.out_of_stock { background: #FEE2E2; color: #991B1B; }
        .action-btns { display: flex; gap: 0.5rem; }
        .icon-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; transition: all 0.2s; border: 1.5px solid transparent; }
        .icon-btn.edit { color: #3B82F6; border-color: #DBEAFE; background: #EFF6FF; }
        .icon-btn.edit:hover { background: #DBEAFE; }
        .icon-btn.delete { color: #EF4444; border-color: #FEE2E2; background: #FFF5F5; }
        .icon-btn.delete:hover { background: #FEE2E2; }
        .empty-state { text-align: center; color: #9CA3AF; padding: 3rem !important; }
        .loading { text-align: center; color: #9CA3AF; padding: 3rem; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: white; border-radius: 16px; padding: 2rem; max-width: 380px; width: 90%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .modal h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .modal p { color: #6B7280; font-size: 0.875rem; margin-bottom: 1.5rem; }
        .modal-actions { display: flex; gap: 1rem; justify-content: flex-end; }
        .delete-confirm-btn { background: #EF4444; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500; }
        .delete-confirm-btn:hover { background: #DC2626; }
        @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
