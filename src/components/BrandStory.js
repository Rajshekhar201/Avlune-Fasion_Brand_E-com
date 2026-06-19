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
          <h2 className={styles.title}>Where Ancient Wisdom Meets <em>Modern Consciousness</em></h2>
          <div className="divider" style={{ margin: '1.5rem 0' }} />
          <p className={styles.text}>
            Born from a fusion of sacred traditions and cutting-edge aesthetics. We don't just make clothes — we create wearable shrines.
          </p>
          <p className={styles.text}>
            From the timeless verses of Hinduism in Sanatan, to the timeless symbols of Christianity in Genesis, the eternal myths of Greek Olympus, from Unified Consciousness in Quantum Mindspace to your favorite Comic book Hero — everything carries a deeper meaning.
          </p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Unique Designs</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10000+</span>
              <span className={styles.statLabel}>Seekers Joined</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Quality Crafted</span>
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
