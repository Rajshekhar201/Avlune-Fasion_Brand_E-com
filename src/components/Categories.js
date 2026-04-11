'use client';

import { useEffect, useRef } from 'react';
import styles from './Categories.module.css';

const categories = [
  { name: 'Rings', count: '120+ Pieces', color: '#E8D5C4', icon: '💍' },
  { name: 'Necklaces', count: '85+ Pieces', color: '#D4C5B0', icon: '📿' },
  { name: 'Earrings', count: '95+ Pieces', color: '#C9B896', icon: '✨' },
  { name: 'Bracelets', count: '60+ Pieces', color: '#E0D0BC', icon: '⭐' },
];

export default function Categories() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, .stagger-children');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Browse By</span>
          <h2 className="section-title">Shop by Category</h2>
          <div className="divider" />
        </div>

        <div className={`${styles.grid} stagger-children`}>
          {categories.map((cat) => (
            <a key={cat.name} href="/shop" className={styles.card}>
              <div
                className={styles.cardBg}
                style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` }}
              />
              <div className={styles.cardContent}>
                <span className={styles.icon}>{cat.icon}</span>
                <h3 className={styles.catName}>{cat.name}</h3>
                <span className={styles.count}>{cat.count}</span>
                <span className={styles.explore}>Explore →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
