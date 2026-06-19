'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/utils/supabase/client';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Heart, Loader2, ShoppingBag } from 'lucide-react';
import styles from './shop.module.css';

export default function ShopContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCollection, setActiveCollection] = useState('All');
  const [activePrice, setActivePrice] = useState('All');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const collections = [
    'All', 
    'Sanatan', 
    'Genesis', 
    'Olympus', 
    'Quantum', 
    'Cinema/Comic Book', 
    'Tech/Professionals'
  ];

  const priceRanges = [
    { label: 'All', filter: (query) => query },
    { label: 'Under ₹1,000', filter: (query) => query.lt('price', 1000) },
    { label: '₹1,000 - ₹1,500', filter: (query) => query.gte('price', 1000).lte('price', 1500) },
    { label: 'Over ₹1,500', filter: (query) => query.gt('price', 1500) }
  ];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let query = supabase.from('products').select('*');
        
        if (activeCollection !== 'All') {
          query = query.eq('collection', activeCollection);
        }

        const priceRange = priceRanges.find(r => r.label === activePrice);
        if (priceRange) {
          query = priceRange.filter(query);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error || !data || data.length === 0) {
          throw error || new Error('Empty database or offline');
        }
        setProducts(data);
      } catch (error) {
        console.warn('Supabase fetch failed, falling back to local mock data:', error);
        
        // Dynamically load local products and apply filters
        const { products: mockProducts } = require('@/data/products');
        let filtered = [...mockProducts];
        
        if (activeCollection !== 'All') {
          filtered = filtered.filter(p => p.collection === activeCollection);
        }
        
        if (activePrice === 'Under ₹1,000') {
          filtered = filtered.filter(p => p.price < 1000);
        } else if (activePrice === '₹1,000 - ₹1,500') {
          filtered = filtered.filter(p => p.price >= 1000 && p.price <= 1500);
        } else if (activePrice === 'Over ₹1,500') {
          filtered = filtered.filter(p => p.price > 1500);
        }
        
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCollection, activePrice]);

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section className={`section ${styles.content}`}>
      <div className={`container ${styles.shopContainer}`}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Collections</h3>
            <ul className={styles.filterList} role="tablist">
              {collections.map((col) => (
                <li key={col}>
                  <button 
                    className={`${styles.filterBtn} ${activeCollection === col ? styles.active : ''}`}
                    onClick={() => setActiveCollection(col)}
                    aria-pressed={activeCollection === col}
                    role="tab"
                  >
                    {col === 'All' ? 'All Alignments' : col}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Price</h3>
            <ul className={styles.filterList}>
              {priceRanges.map((range) => (
                <li key={range.label}>
                  <button 
                    className={`${styles.filterBtn} ${activePrice === range.label ? styles.active : ''}`}
                    onClick={() => setActivePrice(range.label)}
                    aria-pressed={activePrice === range.label}
                  >
                    {range.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className={styles.productGrid}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Loader2 className={styles.spinner} size={40} />
              <p>Discovering alignments...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => {
              const isWishlisted = isInWishlist(product.id);
              const discount = calculateDiscount(product.price, product.originalPrice);

              return (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.imageWrap}>
                    {discount && (
                      <span className={styles.saveBadge}>SAVE {discount}%</span>
                    )}

                    <Link href={`/shop/${product.id}`}>
                      <div className={styles.imageContainer}>
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={styles.mainImage}
                          loading="lazy"
                        />
                        {product.hoverImage && (
                          <Image 
                            src={product.hoverImage} 
                            alt={`${product.name} alternate view`} 
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={styles.hoverImage}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </Link>

                    <button 
                      className={styles.wishlistBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart 
                        size={20} 
                        fill={isWishlisted ? "var(--color-accent)" : "none"} 
                        color={isWishlisted ? "var(--color-accent)" : "currentColor"} 
                      />
                    </button>

                    {/* Bonkers Corner Inspired ADD TO CART bar */}
                    <button 
                      className={styles.addToCartBar}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, product.sizes ? product.sizes[0] : null);
                      }}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag size={14} />
                      ADD TO CART
                    </button>
                  </div>

                  <div className={styles.productInfo}>
                    <span className={styles.productCol}>{product.collection}</span>
                    <Link href={`/shop/${product.id}`} className={styles.productLink}>
                      <h3 className={styles.productName}>{product.name}</h3>
                    </Link>
                    <div className={styles.priceRow}>
                      <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className={styles.productOriginalPrice}>{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noResults}>
              <p>No products found matching your criteria.</p>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setActiveCollection('All'); setActivePrice('All'); }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .${styles.loadingContainer} {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8rem 0;
          gap: 1.5rem;
          color: var(--color-muted);
        }

        .${styles.spinner} {
          animation: spin 1s linear infinite;
          color: var(--color-accent);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
