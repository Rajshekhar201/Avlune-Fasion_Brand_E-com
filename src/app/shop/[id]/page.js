import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetailsClient from './ProductDetailsClient';
import { supabase } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // revalidate at most every hour

async function getProduct(id) {
  let product = null;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (data && !error) {
      product = data;
    }
  } catch (err) {
    console.warn('Failed to fetch product from Supabase, looking in local products:', err);
  }

  // Fallback to local products
  if (!product) {
    const { products: mockProducts } = require('@/data/products');
    product = mockProducts.find(p => p.id === parseInt(id));
  }

  return product;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    return {
      title: 'Product Not Found — Avlunè',
    };
  }

  return {
    title: `${product.name} — Avlunè | Wear Your Faith`,
    description: `Discover ${product.name} from the Avlunè ${product.collection} streetwear collection. Wear your faith, define your style.`,
    openGraph: {
      title: `${product.name} — Avlunè`,
      description: `Premium streetwear from the ${product.collection} collection by Avlunè.`,
      images: [{ url: product.image }],
    }
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }
  
  return (
    <>
      <Navbar />
      <ProductDetailsClient initialProduct={product} />
      <Footer />
    </>
  );
}
