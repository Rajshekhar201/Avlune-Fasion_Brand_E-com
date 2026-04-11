'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/utils/supabase/client';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, Loader2 } from 'lucide-react';
import styles from './shop.module.css';

export default function ShopContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePrice, setActivePrice] = useState('All');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];
  const priceRanges = [
    { label: 'All', filter: (query) => query },
    { label: 'Under ₹20,000', filter: (query) => query.lt('price', 20000) },
    { label: '₹20,000 - ₹30,000', filter: (query) => query.gte('price', 20000).lte('price', 30000) },
    { label: 'Over ₹30,000', filter: (query) => query.gt('price', 30000) }
  ];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let query = supabase.from('products').select('*');
        
        if (activeCategory !== 'All') {
          query = query.eq('category', activeCategory);
        }

        const priceRange = priceRanges.find(r => r.label === activePrice);
        if (priceRange) {
          query = priceRange.filter(query);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory, activePrice]);

  return (
    <section className={`section ${styles.content}`}>
      <div className={`container ${styles.shopContainer}`}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Category</h3>
            <ul className={styles.filterList} role="tablist">
              {categories.map((cat) => (
                <li key={cat}>
                  <button 
                    className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    role="tab"
                  >
                    {cat === 'All' ? 'All Jewelry' : cat}
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
              <p>Discovering treasures...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.imageWrap}>
                  <Link href={`/shop/${product.id}`}>
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </Link>

                  <button 
                    className={styles.wishlistBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                    aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart 
                      size={20} 
                      fill={isInWishlist(product.id) ? "var(--color-accent)" : "none"} 
                      color={isInWishlist(product.id) ? "var(--color-accent)" : "currentColor"} 
                    />
                  </button>
                  <div className={styles.overlay}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, product.sizes ? product.sizes[0] : null);
                      }}
                      aria-label={`Quick add ${product.name} to cart`}
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <Link href={`/shop/${product.id}`} className={styles.productLink}>
                    <h3 className={styles.productName}>{product.name}</h3>
                  </Link>
                  <p className={styles.productPrice}>₹{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No products found matching your criteria.</p>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setActiveCategory('All'); setActivePrice('All'); }}
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

