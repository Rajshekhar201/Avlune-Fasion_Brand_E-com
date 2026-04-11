'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import styles from '@/app/shop/shop.module.css';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="section-label">Your Collection</span>
            <h1 className={styles.title}>Wishlist</h1>
            <div className="divider" />
            <p className="section-subtitle">
              {wishlist.length > 0 ? 'Exquisite pieces you love.' : 'Your wishlist is currently empty.'}
            </p>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className="container" style={{ padding: '0 2rem' }}>
            {wishlist.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                <p style={{ marginBottom: '2rem' }}>Browse our collections to find your favorites.</p>
                <Link href="/shop" className="btn btn-primary">Discover Jewelry</Link>
              </div>
            ) : (
              <div className={styles.productGrid} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {wishlist.map((product) => (
                  <div key={product.id} className={styles.productCard}>
                    <div className={styles.imageWrap}>
                      <Link href={`/shop/${product.id}`}>
                        <img src={product.image} alt={product.name} />
                      </Link>
                      <div className={styles.overlay}>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, product.sizes ? product.sizes[0] : null);
                          }}
                        >
                          Quick Add
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product);
                          }}
                          style={{ marginTop: '0.5rem' }}
                        >
                          Remove
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
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
