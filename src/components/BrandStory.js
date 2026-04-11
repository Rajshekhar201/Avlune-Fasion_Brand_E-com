'use client';

import { useEffect, useRef } from 'react';
import styles from './BrandStory.module.css';

export default function BrandStory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        {/* Image side */}
        <div className={`${styles.imageCol} reveal-left`}>
          <div className={styles.imageStack}>
            <div className={styles.imageLarge}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.placeholderText}>✦</span>
              </div>
            </div>
            <div className={styles.imageSmall}>
              <div className={styles.imagePlaceholder2}>
                <span className={styles.placeholderText}>✦</span>
              </div>
            </div>
            <div className={styles.accentBorder} />
          </div>
        </div>

        {/* Text side */}
        <div className={`${styles.textCol} reveal-right`}>
          <span className="section-label">Our Story</span>
          <h2 className={styles.title}>Where Tradition Meets <em>Modern Elegance</em></h2>
          <div className="divider" style={{ margin: '1.5rem 0' }} />
          <p className={styles.text}>
            Avlunè was born from a love of Korean-inspired aesthetics and timeless craftsmanship. 
            Each piece in our collection is meticulously designed to celebrate the quiet confidence 
            and grace of the modern woman.
          </p>
          <p className={styles.text}>
            From delicate minimalist rings to statement necklaces, every creation carries 
            the essence of artistry, precision, and an unwavering attention to detail.
          </p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Unique Designs</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Handcrafted</span>
            </div>
          </div>

          <a href="/about" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  );
}
