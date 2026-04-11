'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ChevronRight, Heart, ShoppingBag, Truck, RotateCcw } from 'lucide-react';
import styles from './productDetails.module.css';

export default function ProductDetailsClient({ initialProduct: product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );

  if (!product) {
    return (
      <main className={styles.main}>
        <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}>
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  return (
    <main className={styles.main}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <div className="container">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop">Shop</Link>
          <ChevronRight size={14} />
          <Link href={`/shop?category=${product.category}`}>{product.category}</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </div>
      </div>

      <section className={styles.productSection}>
        <div className={`container ${styles.productContainer}`}>
          
          {/* Image Gallery */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImageWrap} style={{ position: 'relative' }}>
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                style={{ objectFit: 'cover' }} 
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <button 
                className={styles.wishlistBtn}
                onClick={() => toggleWishlist(product)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  size={24} 
                  fill={isWishlisted ? "var(--color-accent)" : "none"} 
                  color={isWishlisted ? "var(--color-accent)" : "currentColor"} 
                />
              </button>
            </div>
            <div className={styles.thumbnailList}>
              <button className={`${styles.thumbnail} ${styles.active}`} aria-label={`View ${product.name} detail 1`} style={{ position: 'relative' }}>
                <Image src={product.image} alt="Thumbnail 1" fill style={{ objectFit: 'cover' }} sizes="100px" />
              </button>
              <button className={styles.thumbnail} aria-label={`View ${product.name} detail 2`} style={{ position: 'relative' }}>
                <Image src="/images/hero.png" alt="Thumbnail 2" fill style={{ objectFit: 'cover' }} sizes="100px" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.productDetails}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.price}>₹{product.price.toLocaleString()}</p>
            
            <div className="divider" style={{ margin: '1.5rem 0' }} />
            
            <p className={styles.description}>{product.description}</p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.sizeSection}>
                <div className={styles.sizeHeader}>
                  <span className={styles.sectionLabel}>Select Size</span>
                  <button className={styles.sizeGuideBtn}>Size Guide</button>
                </div>
                <div className={styles.sizeGrid} role="radiogroup" aria-label="Product sizes">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                      onClick={() => setSelectedSize(size)}
                      role="radio"
                      aria-checked={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className={styles.actions}>
              <button 
                className={`btn btn-primary ${styles.addToCartBtn}`}
                onClick={() => addToCart(product, selectedSize)}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button 
                className={`btn ${styles.secondaryWishlistBtn}`}
                onClick={() => toggleWishlist(product)}
                aria-pressed={isWishlisted}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                {isWishlisted ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Features Accordion substitute */}
            <div className={styles.features}>
              <div className={styles.feature}>
                <Truck size={20} />
                <div>
                  <h4>Free Shipping & Returns</h4>
                  <p>On all domestic orders.</p>
                </div>
              </div>
              <div className={styles.feature}>
                <RotateCcw size={20} />
                <div>
                  <h4>14-Day Returns</h4>
                  <p>Shop with confidence.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

