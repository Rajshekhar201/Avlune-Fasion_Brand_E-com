// Supabase Table Setup Script
// Run with: node src/scripts/setupSupabase.mjs

const SUPABASE_URL = 'https://wzwewxxbahntbkxafrzv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6d2V3eHhiYWhudGJreGFmcnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTYzNjMsImV4cCI6MjA5MTQ3MjM2M30.LUjtdxLgdHH-jeNePrS2ESpqOTZlGjwjcqqtpzL8YVU';

const products = [
  {
    name: 'Lumière Diamond Ring',
    price: 35000,
    category: 'Rings',
    description: 'A radiant cut diamond set in 18k white gold, featuring a delicate halo and pave band. Exceptional clarity that sparkles with every movement.',
    image: '/images/rings.png',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    status: 'active'
  },
  {
    name: 'Aura Pearl Earrings',
    price: 18500,
    category: 'Earrings',
    description: 'Freshwater cultured pearls suspended from elegant 14k gold arcs. Perfect for both everyday wear and special occasions.',
    image: '/images/earrings.png',
    sizes: [],
    status: 'active'
  },
  {
    name: 'Celeste Pendant Necklace',
    price: 24000,
    category: 'Necklaces',
    description: 'A minimalist starburst pendant adorned with a central moissanite stone. Includes an adjustable 16-18 inch delicate gold chain.',
    image: '/images/hero.png',
    sizes: [],
    status: 'active'
  },
  {
    name: 'Eternity Tennis Bracelet',
    price: 45000,
    category: 'Bracelets',
    description: 'A classic 14k rose gold tennis bracelet featuring brilliant-cut cubic zirconia for uninterrupted sparkle around your wrist.',
    image: '/images/rings.png',
    sizes: [],
    status: 'active'
  },
  {
    name: 'Solstice Statement Ring',
    price: 28500,
    category: 'Rings',
    description: "A bold, sweeping design inspired by the sun's rays, crafted in solid 18k yellow gold with scattered micro-diamonds.",
    image: '/images/earrings.png',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    status: 'active'
  },
  {
    name: 'Whisper Chain Necklace',
    price: 12000,
    category: 'Necklaces',
    description: 'Our most delicate piece. A barely-there 14k gold chain that catches the light beautifully when worn bare or layered.',
    image: '/images/hero.png',
    sizes: [],
    status: 'active'
  },
  {
    name: 'Luna Drop Earrings',
    price: 21000,
    category: 'Earrings',
    description: 'Crescent moon inspired drops in hammered sterling silver with gold vermeil details. Lightweight and statement-making.',
    image: '/images/earrings.png',
    sizes: [],
    status: 'active'
  },
  {
    name: 'Harmony Cuff Bracelet',
    price: 32000,
    category: 'Bracelets',
    description: 'A sleek, minimalist cuff with an invisible clasp mechanism. Perfect stackable addition to your daily jewelry wardrobe.',
    image: '/images/rings.png',
    sizes: [],
    status: 'active'
  }
];

const sampleOrders = [
  { customer_name: "Priya Sharma", total_amount: 35000, status: "delivered", items: [{ name: "Lumière Diamond Ring", qty: 1, price: 35000 }] },
  { customer_name: "Ananya Verma", total_amount: 18500, status: "shipped", items: [{ name: "Aura Pearl Earrings", qty: 1, price: 18500 }] },
  { customer_name: "Meera Iyer", total_amount: 45000, status: "confirmed", items: [{ name: "Eternity Tennis Bracelet", qty: 1, price: 45000 }] },
  { customer_name: "Riya Kapoor", total_amount: 24000, status: "pending", items: [{ name: "Celeste Pendant Necklace", qty: 1, price: 24000 }] },
  { customer_name: "Sneha Patel", total_amount: 53500, status: "pending", items: [{ name: "Lumière Diamond Ring", qty: 1, price: 35000 }, { name: "Aura Pearl Earrings", qty: 1, price: 18500 }] },
  { customer_name: "Kavya Reddy", total_amount: 60500, status: "delivered", items: [{ name: "Solstice Statement Ring", qty: 1, price: 28500 }, { name: "Harmony Cuff Bracelet", qty: 1, price: 32000 }] },
  { customer_name: "Diya Nair", total_amount: 12000, status: "shipped", items: [{ name: "Whisper Chain Necklace", qty: 1, price: 12000 }] },
];

const sampleVisits = [];
const pages = ['/', '/shop', '/shop/1', '/shop/2', '/shop/3', '/about', '/contact', '/wishlist'];
const devices = ['mobile', 'desktop', 'tablet'];
const referrers = ['direct', 'google', 'instagram', 'facebook', 'pinterest'];

// Generate 200 sample visits over the last 7 days
for (let i = 0; i < 200; i++) {
  const daysAgo = Math.floor(Math.random() * 7);
  const hoursAgo = Math.floor(Math.random() * 24);
  const dt = new Date();
  dt.setDate(dt.getDate() - daysAgo);
  dt.setHours(dt.getHours() - hoursAgo);
  sampleVisits.push({
    page_path: pages[Math.floor(Math.random() * pages.length)],
    referrer: referrers[Math.floor(Math.random() * referrers.length)],
    device_type: Math.random() < 0.6 ? 'mobile' : Math.random() < 0.8 ? 'desktop' : 'tablet',
    timestamp: dt.toISOString(),
  });
}

async function supabaseRequest(path, method, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`  ❌ ${method} ${path} → ${res.status}: ${text}`);
    return null;
  }
  return text ? JSON.parse(text) : null;
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  AVLUNÈ — Supabase Data Seeder');
  console.log('═══════════════════════════════════════\n');

  // 1. Check if products table exists and has data
  console.log('📦 Checking products table...');
  const existingProducts = await supabaseRequest('products?select=id&limit=1', 'GET');
  
  if (existingProducts === null) {
    console.log('\n⚠️  The "products" table does not exist yet.');
    console.log('   Please run the following SQL in your Supabase SQL Editor:\n');
    console.log(`
-- ==========================================
-- AVLUNÈ Database Schema
-- Run this in Supabase SQL Editor
-- ==========================================

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

-- Visits Table (Analytics)
CREATE TABLE IF NOT EXISTS visits (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  page_path TEXT,
  referrer TEXT,
  device_type TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (allow all for anon key)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to visits" ON visits FOR ALL USING (true) WITH CHECK (true);
    `);
    console.log('\n   After running the SQL, execute this script again to seed data.\n');
    return;
  }

  // 2. Seed products
  if (existingProducts.length === 0) {
    console.log('   No products found. Seeding...');
    const result = await supabaseRequest('products', 'POST', products);
    if (result) console.log(`   ✅ Seeded ${result.length} products`);
  } else {
    console.log('   ✅ Products already exist, skipping seed.');
  }

  // 3. Seed orders
  console.log('\n🛒 Checking orders table...');
  const existingOrders = await supabaseRequest('orders?select=id&limit=1', 'GET');
  if (existingOrders !== null && existingOrders.length === 0) {
    console.log('   No orders found. Seeding...');
    const result = await supabaseRequest('orders', 'POST', sampleOrders);
    if (result) console.log(`   ✅ Seeded ${result.length} orders`);
  } else if (existingOrders) {
    console.log('   ✅ Orders already exist, skipping seed.');
  }

  // 4. Seed visits
  console.log('\n📊 Checking visits table...');
  const existingVisits = await supabaseRequest('visits?select=id&limit=1', 'GET');
  if (existingVisits !== null && existingVisits.length === 0) {
    console.log('   No visits found. Seeding 200 sample visits...');
    // Insert in batches of 50
    for (let i = 0; i < sampleVisits.length; i += 50) {
      const batch = sampleVisits.slice(i, i + 50);
      await supabaseRequest('visits', 'POST', batch);
      console.log(`   ... batch ${Math.floor(i/50)+1} done`);
    }
    console.log('   ✅ Seeded 200 visits');
  } else if (existingVisits) {
    console.log('   ✅ Visits already exist, skipping seed.');
  }

  console.log('\n═══════════════════════════════════════');
  console.log('  ✨ Setup complete!');
  console.log('  Run `npm run dev` and visit /admin');
  console.log('═══════════════════════════════════════\n');
}

main().catch(console.error);
