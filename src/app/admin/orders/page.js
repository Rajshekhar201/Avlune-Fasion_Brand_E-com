"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, ChevronDown, Package } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

const STATUSES = ["all", "pending", "confirmed", "shipped", "delivered", "cancelled"];

const mockOrders = [
  { id: 1001, customer_name: "Priya Sharma", total_amount: 35000, status: "delivered", created_at: "2026-04-10T09:00:00Z", items: [{ name: "Lumière Diamond Ring", qty: 1 }] },
  { id: 1002, customer_name: "Ananya Verma", total_amount: 18500, status: "shipped", created_at: "2026-04-10T14:30:00Z", items: [{ name: "Aura Pearl Earrings", qty: 1 }] },
  { id: 1003, customer_name: "Meera Iyer", total_amount: 45000, status: "confirmed", created_at: "2026-04-11T08:15:00Z", items: [{ name: "Eternity Tennis Bracelet", qty: 1 }] },
  { id: 1004, customer_name: "Riya Kapoor", total_amount: 24000, status: "pending", created_at: "2026-04-11T11:42:00Z", items: [{ name: "Celeste Pendant Necklace", qty: 1 }] },
  { id: 1005, customer_name: "Sneha Patel", total_amount: 53500, status: "pending", created_at: "2026-04-11T13:05:00Z", items: [{ name: "Lumière Diamond Ring", qty: 1 }, { name: "Aura Pearl Earrings", qty: 1 }] },
];

const statusColors = {
  pending: "status-pending",
  confirmed: "status-confirmed",
  shipped: "status-shipped",
  delivered: "status-delivered",
  cancelled: "status-cancelled",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [useSupabase, setUseSupabase] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data && data.length > 0) {
        setOrders(data);
        setUseSupabase(true);
      } else {
        setOrders(mockOrders);
        setUseSupabase(false);
      }
    } catch {
      setOrders(mockOrders);
      setUseSupabase(false);
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    if (useSupabase) {
      const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", id);
      if (error) return;
    }
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search);
    const matchFilter = filter === "all" || o.status === filter;
    return matchSearch && matchFilter;
  });

  const totalRevenue = orders.filter(o => o.status === "delivered").reduce((s, o) => s + Number(o.total_amount), 0);

  return (
    <div className="orders-page">
      <h1 className="admin-page-title">Orders</h1>

      <div className="summary-row">
        <div className="summary-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>
        <div className="summary-card">
          <span>Pending</span>
          <strong className="text-amber">{orders.filter(o => o.status === "pending").length}</strong>
        </div>
        <div className="summary-card">
          <span>Delivered</span>
          <strong className="text-green">{orders.filter(o => o.status === "delivered").length}</strong>
        </div>
        <div className="summary-card">
          <span>Delivered Revenue</span>
          <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      {!useSupabase && (
        <div className="info-banner">⚡ Showing sample order data. Connect orders table in Supabase to see real orders.</div>
      )}

      <div className="controls-row">
        <div className="search-bar">
          <Search size={16} />
          <input placeholder="Search by customer or order ID…" value={search} onChange={e => setSearch(e.target.value)} />
          {search && <button onClick={() => setSearch("")}><X size={14} /></button>}
        </div>
        <div className="filter-tabs">
          {STATUSES.map(s => (
            <button key={s} className={`filter-tab ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading orders…</div>
      ) : (
        <div className="orders-list">
          {filtered.map((order, i) => (
            <motion.div
              key={order.id}
              className="order-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="order-header" onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}>
                <div className="order-id">
                  <Package size={16} className="pkg-icon" />
                  <span>Order #{order.id}</span>
                </div>
                <div className="order-customer">{order.customer_name}</div>
                <div className="order-amount">₹{Number(order.total_amount).toLocaleString("en-IN")}</div>
                <span className={`status-badge ${statusColors[order.status]}`}>{order.status}</span>
                <div className="order-date">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                <ChevronDown size={16} className={`chevron ${expandedId === order.id ? "open" : ""}`} />
              </div>
              {expandedId === order.id && (
                <motion.div className="order-details" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="order-items">
                    <strong>Items:</strong>
                    <ul>
                      {(order.items || []).map((item, j) => (
                        <li key={j}>{item.name || item} {item.qty ? `× ${item.qty}` : ""}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="status-update">
                    <strong>Update Status:</strong>
                    <div className="status-btns">
                      {["pending", "confirmed", "shipped", "delivered", "cancelled"].map(s => (
                        <button
                          key={s}
                          className={`status-action-btn ${order.status === s ? "selected" : ""}`}
                          onClick={() => updateStatus(order.id, s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
          {filtered.length === 0 && <div className="empty">No orders found.</div>}
        </div>
      )}

      <style jsx>{`
        .orders-page { padding-bottom: 2rem; }
        .summary-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
        .summary-card { background: white; border-radius: 12px; padding: 1.25rem 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 0.375rem; }
        .summary-card span { font-size: 0.75rem; color: #6B7280; text-transform: uppercase; letter-spacing: 0.08em; }
        .summary-card strong { font-size: 1.5rem; font-weight: 700; color: #111; }
        .text-amber { color: #D97706; }
        .text-green { color: #10B981; }
        .info-banner { background: #FEF3C7; border: 1px solid #FCD34D; color: #92400E; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.875rem; margin-bottom: 1.5rem; }
        .controls-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; align-items: center; }
        .search-bar { display: flex; align-items: center; gap: 0.5rem; background: white; border: 1.5px solid #E5E7EB; border-radius: 8px; padding: 0.625rem 1rem; flex: 1; min-width: 200px; }
        .search-bar input { flex: 1; border: none; outline: none; font-size: 0.875rem; }
        .filter-tabs { display: flex; gap: 0.375rem; flex-wrap: wrap; }
        .filter-tab { padding: 0.5rem 0.875rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; background: white; border: 1.5px solid #E5E7EB; cursor: pointer; transition: all 0.2s; text-transform: capitalize; }
        .filter-tab.active { background: #111; color: white; border-color: #111; }
        .orders-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .order-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .order-header { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem; cursor: pointer; flex-wrap: wrap; }
        .order-header:hover { background: #FAFAFA; }
        .order-id { display: flex; align-items: center; gap: 0.375rem; font-weight: 600; color: #111; font-size: 0.875rem; min-width: 100px; }
        .pkg-icon { color: #9CA3AF; }
        .order-customer { flex: 1; font-size: 0.875rem; color: #374151; }
        .order-amount { font-weight: 600; font-size: 0.875rem; color: #111; min-width: 100px; text-align: right; }
        .order-date { font-size: 0.75rem; color: #9CA3AF; }
        .chevron { transition: transform 0.3s; flex-shrink: 0; }
        .chevron.open { transform: rotate(180deg); }
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; text-transform: capitalize; }
        .status-pending { background: #FEF3C7; color: #D97706; }
        .status-confirmed { background: #DBEAFE; color: #1D4ED8; }
        .status-shipped { background: #E0E7FF; color: #4338CA; }
        .status-delivered { background: #D1FAE5; color: #065F46; }
        .status-cancelled { background: #FEE2E2; color: #991B1B; }
        .order-details { padding: 1rem 1.25rem; border-top: 1px solid #F3F4F6; display: flex; flex-direction: column; gap: 1rem; }
        .order-items { font-size: 0.875rem; color: #374151; }
        .order-items ul { margin-top: 0.5rem; margin-left: 1rem; list-style: disc; display: flex; flex-direction: column; gap: 0.25rem; }
        .status-update { font-size: 0.875rem; }
        .status-btns { margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .status-action-btn { padding: 0.375rem 0.875rem; border-radius: 999px; border: 1.5px solid #E5E7EB; font-size: 0.75rem; cursor: pointer; text-transform: capitalize; transition: all 0.2s; background: white; }
        .status-action-btn:hover { border-color: #111; }
        .status-action-btn.selected { background: #111; color: white; border-color: #111; }
        .empty, .loading { text-align: center; color: #9CA3AF; padding: 4rem; background: white; border-radius: 12px; }
      `}</style>
    </div>
  );
}
