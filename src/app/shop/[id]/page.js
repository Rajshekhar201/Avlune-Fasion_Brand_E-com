import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetailsClient from './ProductDetailsClient';
import { supabase } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // revalidate at most every hour

export async function generateMetadata({ params }) {

  const { id } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (!product) {
    return {
      title: 'Product Not Found — Avlunè',
    };
  }

  return {
    title: `${product.name} — Avlunè | Crafted Grace`,
    description: `Discover the elegant ${product.name}. A stunning piece from the Avlunè luxury ${product.category?.toLowerCase()} collection.`,
    openGraph: {
      title: `${product.name} — Avlunè`,
      description: `Premium handcrafted ${product.category?.toLowerCase()} by Avlunè.`,
      images: [{ url: product.image }],
    }
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

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

