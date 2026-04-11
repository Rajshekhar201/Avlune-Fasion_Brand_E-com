'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import Logo from './Logo';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsDrawerOpen } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Left nav links */}
          <nav className={styles.navLeft}>
            {navLinks.slice(0, 3).map((link) => (
              <Link key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <Link href="/" className={`${styles.logoWrap} ${scrolled ? styles.logoVisible : styles.logoHidden}`}>
            <Logo variant={scrolled ? 'dark' : 'light'} size="md" />
          </Link>

          {/* Right nav links + icons */}
          <div className={styles.navRight}>
            <nav className={styles.navRightLinks}>
              {navLinks.slice(3).map((link) => (
                <Link key={link.label} href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className={styles.icons}>
              <button className={styles.iconBtn} aria-label="Search">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
                <Heart size={18} strokeWidth={1.5} />
                {wishlist.length > 0 && <span className={styles.cartBadge}>{wishlist.length}</span>}
              </Link>
              <button 
                className={styles.iconBtn} 
                aria-label="Open cart" 
                onClick={() => setIsDrawerOpen(true)}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <Logo variant="dark" size="lg" showTagline />
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileIcons}>
            <button className={styles.iconBtn} aria-label="Search"><Search size={20} /></button>
            <Link 
              href="/wishlist" 
              className={styles.iconBtn} 
              aria-label="Wishlist"
              onClick={() => setMobileOpen(false)}
            >
              <Heart size={20} />
              {wishlist.length > 0 && <span className={styles.cartBadge}>{wishlist.length}</span>}
            </Link>
            <button 
              className={styles.iconBtn} 
              aria-label="Open cart" 
              onClick={() => {
                setMobileOpen(false);
                setIsDrawerOpen(true);
              }}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
