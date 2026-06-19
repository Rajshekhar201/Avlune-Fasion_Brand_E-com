// Supabase Apparel Seeding Script
// Run with: node src/scripts/seedApparel.mjs

const SUPABASE_URL = 'https://wzwewxxbahntbkxafrzv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6d2V3eHhiYWhudGJreGFmcnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTYzNjMsImV4cCI6MjA5MTQ3MjM2M30.LUjtdxLgdHH-jeNePrS2ESpqOTZlGjwjcqqtpzL8YVU';

const products = [
  {
    name: 'Classic Crewneck Tee',
    price: 899,
    category: 'T-shirts & Tees',
    description: 'A timeless classic crafted from 100% premium heavyweight cotton. Features a snug crewneck collar and a relaxed, comfortable silhouette perfect for daily wear.',
    image: '/images/minimalist_tee.png',
    sizes: ['S', 'M', 'L', 'XL'],
    status: 'active'
  },
  {
    name: 'Oversized Vintage Tee',
    price: 1299,
    category: 'T-shirts & Tees',
    description: 'Inspired by 90s streetwear, this oversized tee is vintage washed for a soft, worn-in feel. Relaxed shoulders and longer sleeves give it the ultimate retro aesthetic.',
    image: '/images/oversized_tee.png',
    sizes: ['M', 'L', 'XL'],
    status: 'active'
  },
  {
    name: 'Aesthetic Graphic Tee',
    price: 1499,
    category: 'T-shirts & Tees',
    description: 'Featuring custom hand-drawn retro typography and a subtle textured print. Made from organic cotton with reinforced stitching for long-lasting style.',
    image: '/images/graphic_tee.png',
    sizes: ['S', 'M', 'L', 'XL'],
    status: 'active'
  },
  {
    name: 'Minimalist Pocket Tee',
    price: 999,
    category: 'T-shirts & Tees',
    description: 'Elevate your basics. A clean, premium knit tee featuring a functional chest pocket and double-needle hems. Breathable, durable, and versatile.',
    image: '/images/minimalist_tee.png',
    sizes: ['S', 'M', 'L', 'XL'],
    status: 'active'
  }
];

const sampleOrders = [
  { customer_name: "Rahul Verma", total_amount: 1798, status: "delivered", items: [{ name: "Classic Crewneck Tee", qty: 2, price: 899 }] },
  { customer_name: "Sneha Sen", total_amount: 1299, status: "shipped", items: [{ name: "Oversized Vintage Tee", qty: 1, price: 1299 }] },
  { customer_name: "Amit Patel", total_amount: 2498, status: "confirmed", items: [{ name: "Aesthetic Graphic Tee", qty: 1, price: 1499 }, { name: "Minimalist Pocket Tee", qty: 1, price: 999 }] },
  { customer_name: "Neha Gupta", total_amount: 999, status: "pending", items: [{ name: "Minimalist Pocket Tee", qty: 1, price: 999 }] },
  { customer_name: "Vikram Malhotra", total_amount: 2798, status: "pending", items: [{ name: "Oversized Vintage Tee", qty: 1, price: 1299 }, { name: "Aesthetic Graphic Tee", qty: 1, price: 1499 }] },
];

async function supabaseRequest(path, method, body) {
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };
  
  if (method !== 'GET' && method !== 'DELETE') {
    headers['Prefer'] = 'return=representation';
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`  ❌ ${method} ${path} → ${res.status}: ${text}`);
    return null;
  }
  return text ? JSON.parse(text) : [];
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  AVLUNÈ — Apparel Seeder & Migration');
  console.log('═══════════════════════════════════════\n');

  // 1. Clear existing orders
  console.log('🧹 Clearing existing orders...');
  await supabaseRequest('orders?id=gt.0', 'DELETE');
  console.log('   ✅ Orders cleared.');

  // 2. Clear existing products
  console.log('🧹 Clearing existing products...');
  await supabaseRequest('products?id=gt.0', 'DELETE');
  console.log('   ✅ Products cleared.');

  // 3. Seed new products
  console.log('📦 Seeding new T-shirts & Tees products...');
  const seededProducts = await supabaseRequest('products', 'POST', products);
  if (seededProducts) {
    console.log(`   ✅ Seeded ${seededProducts.length} fashion products:`);
    seededProducts.forEach(p => console.log(`      - ${p.name} (₹${p.price})`));
  }

  // 4. Seed new sample orders
  console.log('\n🛒 Seeding new orders...');
  const seededOrders = await supabaseRequest('orders', 'POST', sampleOrders);
  if (seededOrders) {
    console.log(`   ✅ Seeded ${seededOrders.length} sample orders.`);
  }

  console.log('\n═══════════════════════════════════════');
  console.log('  ✨ Seeding complete! Database migrated to apparel.');
  console.log('═══════════════════════════════════════\n');
}

main().catch(console.error);
