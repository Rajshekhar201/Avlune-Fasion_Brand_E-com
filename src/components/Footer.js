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
              Exquisite handcrafted jewelry celebrating elegance 
              and timeless Korean-inspired design.
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

          {/* Quick Links */}
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Quick Links</h4>
            <nav className={styles.links}>
              <Link href="/shop">Shop All</Link>
              <Link href="/shop">New Arrivals</Link>
              <Link href="/shop">Bestsellers</Link>
              <Link href="/about">Our Story</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          {/* Categories */}
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Categories</h4>
            <nav className={styles.links}>
              <Link href="/shop">Rings</Link>
              <Link href="/shop">Necklaces</Link>
              <Link href="/shop">Earrings</Link>
              <Link href="/shop">Bracelets</Link>
              <Link href="/shop">Gift Sets</Link>
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
