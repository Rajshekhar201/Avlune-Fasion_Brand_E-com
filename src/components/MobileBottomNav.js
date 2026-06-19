'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();
  const { wishlist } = useWishlist();

  // Home icon: A custom designed premium letter "A"
  const CustomHomeIcon = () => (
    <div className={styles.homeIconContainer}>
      <svg viewBox="0 0 24 24" className={styles.customHomeSvg}>
        {/* Background diamond */}
        <polygon points="12,2 21,12 12,22 3,12" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* Gothic stylized letter A */}
        <text x="12" y="16" textAnchor="middle" className={styles.gothicLetter}>A</text>
      </svg>
    </div>
  );

  return (
    <nav className={styles.mobileNav} aria-label="Mobile Navigation">
      <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
        <CustomHomeIcon />
        <span className={styles.label}>Home</span>
      </Link>

      <Link href="/shop" className={`${styles.navItem} ${pathname === '/shop' ? styles.active : ''}`}>
        <Grid size={20} strokeWidth={1.5} />
        <span className={styles.label}>Collections</span>
      </Link>

      <Link href="/wishlist" className={`${styles.navItem} ${pathname === '/wishlist' ? styles.active : ''}`}>
        <div className={styles.iconWrapper}>
          <Heart size={20} strokeWidth={1.5} />
          {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
        </div>
        <span className={styles.label}>Wishlist</span>
      </Link>

      <button 
        onClick={() => setIsDrawerOpen(true)} 
        className={styles.navItem}
        aria-label="Open Cart"
      >
        <div className={styles.iconWrapper}>
          <ShoppingBag size={20} strokeWidth={1.5} />
          {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
        </div>
        <span className={styles.label}>My Cart</span>
      </button>

      <Link href="/about" className={`${styles.navItem} ${pathname === '/about' ? styles.active : ''}`}>
        <User size={20} strokeWidth={1.5} />
        <span className={styles.label}>Profile</span>
      </Link>
    </nav>
  );
}
