'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        {/* Top section */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Logo variant="dark" size="lg" showTagline />
            <p className={styles.brandText}>
              Premium contemporary apparel celebrating elegance,
              individuality, and timeless modern style.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Shop</h4>
            <nav className={styles.links}>
              <Link href="/shop">All Products</Link>
              <Link href="/shop">New Arrivals</Link>
              <Link href="/shop">Best Sellers</Link>
              <Link href="/shop?category=T-shirts%20%26%20Tees">T-shirts & Tees</Link>
            </nav>
          </div>

          {/* Company */}
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Company</h4>
            <nav className={styles.links}>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/shipping-returns">Shipping & Returns</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/size-guide">Size Guide</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Get in Touch</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <MapPin size={14} />
                <span>Mumbai, India</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={14} />
                <span>+91 98765 43210</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={14} />
                <span>hello@avlune.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-wide" style={{ margin: '2rem 0' }} />

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Avlunè. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
