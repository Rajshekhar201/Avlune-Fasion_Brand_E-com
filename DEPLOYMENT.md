# Avlunè — Deployment Guide

## Prerequisites
- A **Supabase** project with the database schema set up (see below)
- A **Vercel** or **Netlify** account
- The project pushed to a **GitHub** repository

---

## Step 1: Set Up Supabase Database

Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/wzwewxxbahntbkxafrzv/sql/new) and run:

```sql
-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT,
  description TEXT,
  image TEXT,
  sizes TEXT[],
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_name TEXT,
  total_amount NUMERIC,
  status TEXT DEFAULT 'pending',
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Visits Table
CREATE TABLE IF NOT EXISTS visits (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  page_path TEXT,
  referrer TEXT,
  device_type TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to visits" ON visits FOR ALL USING (true) WITH CHECK (true);
```

Then seed the data:
```bash
node src/scripts/setupSupabase.mjs
```

---

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Avlunè v1.0 — Full e-commerce + admin panel"
git remote add origin https://github.com/YOUR_USERNAME/avlune.git
git branch -M main
git push -u origin main
```

---

## Step 3A: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → "Add New Project"
2. Import the GitHub repository
3. **Framework Preset**: Next.js (auto-detected)
4. **Build Command**: `npm run build`
5. **Output Directory**: `.next` (default)
6. Add **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://wzwewxxbahntbkxafrzv.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
7. Click **Deploy**

## Step 3B: Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from GitHub"
2. Select the repository
3. **Build Command**: `npm run build`
4. **Publish Directory**: `.next`
5. Add **Environment Variables** (same as Vercel above)
6. Install the **Next.js plugin**: `@netlify/plugin-nextjs`
7. Click **Deploy**

---

## Admin Access

After deployment, navigate to `https://yourdomain.com/admin` and use:
- **Password**: `AVLUNE20265`

---

## Post-Deployment Checklist

- [ ] Verify `/admin` login works
- [ ] Verify products load from Supabase
- [ ] Verify visit tracking logs to database
- [ ] Test on mobile devices
- [ ] Configure a custom domain if desired
