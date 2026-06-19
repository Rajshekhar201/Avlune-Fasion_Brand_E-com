'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Sparkles, Shield, Compass, BookOpen, Film, Terminal } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { products } from '@/data/products';
import styles from './ShopByCollections.module.css';

const COLLECTIONS = [
  { 
    id: 'Sanatan', 
    name: 'Sanatan', 
    label: 'Hinduism & Spirituality',
    icon: Compass, 
    themeClass: styles.themeSanatan,
    desc: 'Ancient Sanskrit verses, timeless spiritual symbols, and meditative comfort.'
  },
  { 
    id: 'Genesis', 
    name: 'Genesis', 
    label: 'Christianity & Faith',
    icon: Shield, 
    themeClass: styles.themeGenesis,
    desc: 'Renaissance designs, classical geometry, and gothic arches celebrating grace.'
  },
  { 
    id: 'Olympus', 
    name: 'Olympus', 
    label: 'Greek Mythology',
    icon: Sparkles, 
    themeClass: styles.themeOlympus,
    desc: 'Zeus thunderbolts, Poseidon waves, and monochrome statues of antiquity.'
  },
  { 
    id: 'Quantum', 
    name: 'Quantum', 
    label: 'Scientific Mindspace',
    icon: BookOpen, 
    themeClass: styles.themeQuantum,
    desc: 'Sacred geometry, cosmic string theories, and atomic probability patterns.'
  },
  { 
    id: 'Cinema/Comic Book', 
    name: 'Comic & Cinema', 
    label: 'Pop Culture & Storyboards',
    icon: Film, 
    themeClass: styles.themeComic,
    desc: 'Halftone dot patterns, storyboard frames, and retro super hero aesthetics.'
  },
  { 
    id: 'Tech/Professionals', 
    name: 'Tech & Code', 
    label: 'Developer Blueprints',
    icon: Terminal, 
    themeClass: styles.themeTech,
    desc: 'Binary grids, circuit board pathways, and clean source code styling.'
  }
];

export default function ShopByCollections() {
  const [activeTab, setActiveTab] = useState('Sanatan');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const filteredProducts = products.filter(p => p.collection === activeTab);
  const activeColInfo = COLLECTIONS.find(c => c.id === activeTab);
  const CollectionIcon = activeColInfo ? activeColInfo.icon : Compass;

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return null;
    const pct = ((originalPrice - price) / originalPrice) * 100;
    return Math.round(pct);
  };

  return (
    <section className={`${styles.section} ${activeColInfo ? activeColInfo.themeClass : ''}`}>
      {/* Background thematic elements container */}
      <div className={styles.themeBackgroundLayer}>
        <div className={styles.thematicOverlayPattern} />
      </div>

      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Shop By Collections</span>
          <h2 className={styles.title}>Align Your Style</h2>
          <div className="divider" />
          <p className={styles.subtitle}>
            Explore our meticulously designed alignments merging spiritual tradition, scientific metrics, and premium streetwear.
          </p>
        </div>

        {/* Tab Selector */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList} role="tablist">
            {COLLECTIONS.map((col) => {
              const Icon = col.icon;
              return (
                <button
                  key={col.id}
                  className={`${styles.tabBtn} ${activeTab === col.id ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(col.id)}
                  role="tab"
                  aria-selected={activeTab === col.id}
                >
                  <Icon size={16} />
                  <span>{col.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collection Description & Header */}
        <div className={styles.collectionIntro}>
          <div className={styles.introHeader}>
            <CollectionIcon className={styles.introIcon} size={28} />
            <div>
              <h3>{activeColInfo?.label} Collection</h3>
              <p>{activeColInfo?.desc}</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.grid}>
          {filteredProducts.map((product) => {
            const discount = calculateDiscount(product.price, product.originalPrice);
            const isWishlisted = isInWishlist(product.id);

            return (
              <article key={product.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  {/* Save badge */}
                  {discount && (
                    <span className={styles.saveBadge}>SAVE {discount}%</span>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    className={styles.wishlistBtn}
                    onClick={() => toggleWishlist(product)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart 
                      size={18} 
                      fill={isWishlisted ? "var(--color-accent)" : "none"} 
                      color={isWishlisted ? "var(--color-accent)" : "currentColor"} 
                    />
                  </button>

                  {/* Link to details */}
                  <Link href={`/shop/${product.id}`} className={styles.productLink}>
                    <div className={styles.imageContainer}>
                      {/* Main Image */}
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.mainImage}
                      />
                      {/* Hover Image */}
                      {product.hoverImage && (
                        <Image 
                          src={product.hoverImage} 
                          alt={`${product.name} alternate view`} 
                          fill 
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={styles.hoverImage}
                        />
                      )}
                    </div>
                  </Link>

                  {/* Bonkers Corner Inspired "ADD TO CART" bar */}
                  <button 
                    className={styles.addToCartBar}
                    onClick={() => addToCart(product, product.sizes ? product.sizes[0] : null)}
                  >
                    <ShoppingBag size={14} />
                    ADD TO CART
                  </button>
                </div>

                <div className={styles.info}>
                  <span className={styles.colName}>{product.collection}</span>
                  <Link href={`/shop/${product.id}`}>
                    <h4 className={styles.name}>{product.name}</h4>
                  </Link>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
