"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { supabase } from "@/utils/supabase/client";

// Mock data while Supabase populates
const salesData = [
  { name: 'Mon', total: 1200 },
  { name: 'Tue', total: 2100 },
  { name: 'Wed', total: 1800 },
  { name: 'Thu', total: 3200 },
  { name: 'Fri', total: 2800 },
  { name: 'Sat', total: 4500 },
  { name: 'Sun', total: 3800 },
];

const visitorData = [
  { name: 'Desktop', visitors: 45 },
  { name: 'Mobile', visitors: 120 },
  { name: 'Tablet', visitors: 15 },
];

const StatCard = ({ title, value, icon: Icon, trend, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="stat-card"
  >
    <div className="stat-header">
      <span className="stat-title">{title}</span>
      <div className="icon-wrapper">
        <Icon size={20} />
      </div>
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-trend">
      <ArrowUpRight size={16} />
      <span>{trend}</span>
      <span className="trend-label">vs last week</span>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: "$0",
    orders: "0",
    visitors: "0",
    conversion: "0%"
  });

  useEffect(() => {
    // In a real app, we'd fetch this from Supabase here.
    // For now, using realistic mock data to show the layout.
    setStats({
      revenue: "$19,400",
      orders: "42",
      visitors: "8,240",
      conversion: "3.2%"
    });
  }, []);

  return (
    <div className="dashboard-container">
      <motion.h1 
        className="admin-page-title"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Dashboard Overview
      </motion.h1>

      <div className="stats-grid">
        <StatCard title="Total Revenue" value={stats.revenue} icon={DollarSign} trend="+12.5%" delay={0.1} />
        <StatCard title="Active Orders" value={stats.orders} icon={ShoppingBag} trend="+8.2%" delay={0.2} />
        <StatCard title="Total Visitors" value={stats.visitors} icon={Users} trend="+24.1%" delay={0.3} />
        <StatCard title="Conversion Rate" value={stats.conversion} icon={TrendingUp} trend="+1.2%" delay={0.4} />
      </div>

      <div className="charts-grid">
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Revenue Analytics (Last 7 Days)</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A96E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="total" stroke="#C9A96E" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Device Visitors</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="visitors" fill="#111" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-title {
          font-size: 0.875rem;
          color: #6B7280;
          font-weight: 500;
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #F8F9FA;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 600;
          color: #111;
          font-family: var(--font-display);
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #10B981;
        }

        .trend-label {
          color: #9CA3AF;
          font-weight: 400;
          margin-left: 0.25rem;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .chart-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .chart-card h3 {
          font-size: 1.125rem;
          color: #111;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .chart-wrapper {
          height: 300px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
