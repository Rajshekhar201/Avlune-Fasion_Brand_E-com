"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { supabase } from "@/utils/supabase/client";
import { TrendingUp, Users, Eye, Star } from "lucide-react";

const COLORS = ["#C9A96E", "#111", "#6B7280", "#D4B87A", "#E8D5C4"];

const mockVisitsByDay = [
  { day: "Sun", visits: 84 }, { day: "Mon", visits: 120 },
  { day: "Tue", visits: 145 }, { day: "Wed", visits: 200 },
  { day: "Thu", visits: 175 }, { day: "Fri", visits: 220 },
  { day: "Sat", visits: 310 },
];

const mockPageViews = [
  { page: "Homepage", views: 850 }, { page: "Shop", views: 620 },
  { page: "Rings", views: 480 }, { page: "Earrings", views: 390 },
  { page: "Necklaces", views: 290 }, { page: "Bracelets", views: 210 },
  { page: "About", views: 180 }, { page: "Contact", views: 95 },
];

const mockTopProducts = [
  { rank: 1, name: "Lumière Diamond Ring", views: 320, wishlist: 82, category: "Rings" },
  { rank: 2, name: "Eternity Tennis Bracelet", views: 280, wishlist: 61, category: "Bracelets" },
  { rank: 3, name: "Aura Pearl Earrings", views: 215, wishlist: 54, category: "Earrings" },
  { rank: 4, name: "Celeste Pendant Necklace", views: 198, wishlist: 47, category: "Necklaces" },
  { rank: 5, name: "Solstice Statement Ring", views: 150, wishlist: 38, category: "Rings" },
];

const mockDevices = [
  { name: "Mobile", value: 62 }, 
  { name: "Desktop", value: 30 }, 
  { name: "Tablet", value: 8 },
];

export default function VisitorsPage() {
  const [visitsByDay, setVisitsByDay] = useState(mockVisitsByDay);
  const [topProducts, setTopProducts] = useState(mockTopProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("visits").select("*");
      if (!error && data && data.length > 0) {
        // Real data: group by day of week
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const counts = {};
        days.forEach(d => counts[d] = 0);
        data.forEach(v => {
          const d = new Date(v.timestamp);
          counts[days[d.getDay()]]++;
        });
        setVisitsByDay(days.map(d => ({ day: d, visits: counts[d] })));
      }
    } catch {}
    setLoading(false);
  };

  const totalVisits = visitsByDay.reduce((s, d) => s + d.visits, 0);
  const avgPerDay = Math.round(totalVisits / 7);

  return (
    <div className="visitors-page">
      <h1 className="admin-page-title">Visitor Analytics</h1>

      {/* KPI Row */}
      <div className="kpi-row">
        {[
          { label: "Weekly Visitors", value: totalVisits, icon: Users, color: "#C9A96E" },
          { label: "Daily Average", value: avgPerDay, icon: TrendingUp, color: "#111" },
          { label: "Page Views", value: "2,510", icon: Eye, color: "#6B7280" },
          { label: "Top Product Views", value: `${topProducts[0]?.views || 0}`, icon: Star, color: "#D97706" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="kpi-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="kpi-icon" style={{ background: kpi.color + "20", color: kpi.color }}>
              <kpi.icon size={20} />
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Daily Traffic */}
        <motion.div className="chart-card wide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h3>Daily Traffic (This Week)</h3>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitsByDay}>
                <defs>
                  <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A96E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                <Area type="monotone" dataKey="visits" stroke="#C9A96E" strokeWidth={3} fill="url(#visitGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Device Split */}
        <motion.div className="chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3>Device Breakdown</h3>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockDevices} innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} labelLine={false}>
                  {mockDevices.map((_, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: "8px", border: "none" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Page Views Chart */}
      <motion.div className="chart-card" style={{ marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h3>Top Pages by Views</h3>
        <div className="chart-wrap tall">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPageViews} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
              <YAxis dataKey="page" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#374151" }} width={90} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="views" fill="#111" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top Products Rankings */}
      <motion.div className="rankings-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <h3>🏆 Customer Preferences — Product Rankings</h3>
        <p className="rankings-subtext">Based on views and wishlist additions — most loved products by your customers</p>
        <div className="rankings-list">
          {topProducts.map((p) => (
            <div key={p.rank} className="ranking-item">
              <div className={`rank-badge ${p.rank <= 3 ? "top-rank" : ""}`}>#{p.rank}</div>
              <div className="ranking-info">
                <div className="ranking-name">{p.name}</div>
                <div className="ranking-category">{p.category}</div>
              </div>
              <div className="ranking-stats">
                <div className="stat-pill views">
                  <Eye size={12} /> {p.views} views
                </div>
                <div className="stat-pill wishlist">
                  <Star size={12} /> {p.wishlist} wishlists
                </div>
              </div>
              <div className="ranking-bar-wrap">
                <div className="ranking-bar" style={{ width: `${Math.round((p.views / topProducts[0].views) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .visitors-page { padding-bottom: 2rem; }
        .kpi-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
        .kpi-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 0.75rem; }
        .kpi-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .kpi-value { font-size: 1.75rem; font-weight: 700; color: #111; }
        .kpi-label { font-size: 0.75rem; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.08em; }
        .charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .chart-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .chart-card.wide { grid-column: 1; }
        .chart-card h3 { font-size: 1rem; font-weight: 600; color: #111; margin-bottom: 1.25rem; }
        .chart-wrap { height: 250px; }
        .chart-wrap.tall { height: 300px; }
        .rankings-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .rankings-card h3 { font-size: 1.125rem; font-weight: 600; color: #111; margin-bottom: 0.25rem; }
        .rankings-subtext { font-size: 0.8rem; color: #9CA3AF; margin-bottom: 1.5rem; }
        .rankings-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .ranking-item { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .rank-badge { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; background: #F3F4F6; color: #6B7280; flex-shrink: 0; }
        .rank-badge.top-rank { background: #FEF3C7; color: #D97706; }
        .ranking-info { flex: 1; min-width: 140px; }
        .ranking-name { font-size: 0.875rem; font-weight: 600; color: #111; }
        .ranking-category { font-size: 0.75rem; color: #9CA3AF; }
        .ranking-stats { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .stat-pill { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; padding: 0.25rem 0.625rem; border-radius: 999px; font-weight: 500; }
        .stat-pill.views { background: #EFF6FF; color: #3B82F6; }
        .stat-pill.wishlist { background: #FEF3C7; color: #D97706; }
        .ranking-bar-wrap { flex: 1; min-width: 80px; height: 6px; background: #F3F4F6; border-radius: 999px; overflow: hidden; }
        .ranking-bar { height: 100%; background: var(--color-accent); border-radius: 999px; transition: width 1s ease; }
        @media (max-width: 768px) { .charts-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
