'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Loader2 } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './FeaturedCollection.module.css';

export default function FeaturedCollection() {
  const sectionRef = useRef(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')
          .limit(4)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, .stagger-children');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Curated For You</span>
          <h2 className="section-title">Featured Collection</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Each piece tells a story of artistry and grace
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Loader2 className="spinner" size={32} color="var(--color-accent)" />
          </div>
        ) : (
          <div className={`${styles.grid} stagger-children`}>
            {products.map((product) => (
              <article key={product.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Link href={`/shop/${product.id}`}>
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </Link>

                  {product.status !== 'active' && (
                    <span className={styles.badge}>{product.status}</span>
                  )}
                  
                  <button 
                    className={styles.wishlistHoverBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                    aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'white',
                      border: 'none',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      zIndex: 2,
                      color: isInWishlist(product.id) ? 'var(--color-accent)' : 'var(--color-muted)'
                    }}
                  >
                    <Heart size={16} fill={isInWishlist(product.id) ? 'var(--color-accent)' : 'none'} color="currentColor" />
                  </button>

                  <div className={styles.overlay}>
                    <button 
                      className={`btn btn-primary ${styles.quickAdd}`}
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
                <div className={styles.info}>
                  <span className={styles.category}>{product.category}</span>
                  <Link href={`/shop/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className={styles.name}>{product.name}</h3>
                  </Link>
                  <span className={styles.price}>₹{product.price.toLocaleString()}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className={`${styles.viewAll} reveal`}>
          <Link href="/shop" className="btn btn-outline-gold">
            View All Pieces <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

