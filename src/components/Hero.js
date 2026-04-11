'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Logo from './Logo';
import styles from './Hero.module.css';


export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !contentRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      if (scrollY < heroHeight) {
        const parallax = scrollY * 0.4;
        const opacity = 1 - (scrollY / heroHeight) * 1.2;
        contentRef.current.style.transform = `translateY(${parallax}px)`;
        contentRef.current.style.opacity = Math.max(opacity, 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Background Hero Image */}
      <div className={styles.heroImageWrapper}>
        <Image 
          src="/images/hero.png" 
          alt="Luxury Jewelry" 
          fill 
          className={styles.heroImage} 
          priority 
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      
      {/* Background layers */}
      <div className={styles.bgOverlay} />
      
      {/* Floating decorative elements */}
      <div className={styles.floatingGem} style={{ top: '15%', left: '10%', animationDelay: '0s' }} />
      <div className={styles.floatingGem} style={{ top: '60%', right: '8%', animationDelay: '2s' }} />
      <div className={styles.floatingGem} style={{ bottom: '20%', left: '20%', animationDelay: '4s' }} />

      {/* Content */}
      <div className={styles.content} ref={contentRef}>
        <div className={styles.logoArea}>
          <Logo variant="light" size="xl" />
        </div>
        
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond}>◇</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.tagline}>Grace in every detail</p>
        
        <p className={styles.description}>
          Discover exquisite handcrafted jewelry that celebrates elegance, 
          femininity, and timeless Korean-inspired design.
        </p>

        <div className={styles.actions}>
          <a href="/shop" className={`btn btn-primary ${styles.ctaBtn}`} aria-label="Explore our full collection">
            Explore Collection
          </a>
          <a href="/about" className={`btn btn-outline ${styles.ctaBtn} ${styles.ctaOutline}`} aria-label="Read our brand story">
            Our Story
          </a>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll to discover</span>
          <div className={styles.scrollLine}>
            <div className={styles.scrollDot} />
          </div>
        </div>
      </div>
    </section>
  );
}
