'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Heart, Globe } from 'lucide-react';
import Logo from './Logo';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  
  const { itemCount, setIsDrawerOpen } = useCart();
  const { wishlist } = useWishlist();
  const { currency, changeCurrency, symbols } = useCurrency();
  const dropdownRef = useRef(null);

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

  // Close currency dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleCurrencySelect = (code) => {
    changeCurrency(code);
    setCurrencyOpen(false);
  };

  return (
    <>
      <div className={`${styles.navWrapper} ${scrolled ? styles.wrapperScrolled : ''}`}>
        {/* Animated Marquee Announcement Bar */}
        <div className={styles.announcementBar}>
          <div className={styles.marqueeText}>
            <span>⚡ FLAT 60% OFF ON OUR NEW COLLECTION • JOIN THE COTERIE FOR EXTRA DISCOUNTS • FREE SHIPPING ON DOMESTIC ORDERS ⚡</span>
            <span>⚡ FLAT 60% OFF ON OUR NEW COLLECTION • JOIN THE COTERIE FOR EXTRA DISCOUNTS • FREE SHIPPING ON DOMESTIC ORDERS ⚡</span>
            <span>⚡ FLAT 60% OFF ON OUR NEW COLLECTION • JOIN THE COTERIE FOR EXTRA DISCOUNTS • FREE SHIPPING ON DOMESTIC ORDERS ⚡</span>
          </div>
        </div>

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
                {/* Currency Dropdown Selector */}
                <div className={styles.currencyWrapper} ref={dropdownRef}>
                  <button 
                    className={styles.currencyBtn} 
                    onClick={() => setCurrencyOpen(!currencyOpen)}
                    aria-label="Select Currency"
                    aria-expanded={currencyOpen}
                  >
                    <Globe size={16} strokeWidth={1.5} />
                    <span>{currency} ({symbols[currency]})</span>
                  </button>
                  {currencyOpen && (
                    <ul className={styles.currencyDropdown}>
                      {Object.keys(symbols).map((code) => (
                        <li key={code}>
                          <button 
                            onClick={() => handleCurrencySelect(code)}
                            className={currency === code ? styles.activeCurrency : ''}
                          >
                            {code} ({symbols[code]})
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

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
      </div>

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

          {/* Mobile Currency toggle */}
          <div className={styles.mobileCurrencySelector}>
            <span>Currency:</span>
            <div className={styles.mobileCurrencyOptions}>
              {Object.keys(symbols).map((code) => (
                <button 
                  key={code}
                  className={currency === code ? styles.activeMobileCurrency : ''}
                  onClick={() => changeCurrency(code)}
                >
                  {code} ({symbols[code]})
                </button>
              ))}
            </div>
          </div>

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
