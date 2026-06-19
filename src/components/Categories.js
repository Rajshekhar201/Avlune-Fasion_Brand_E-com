'use client';

import { useEffect, useRef } from 'react';
import styles from './Categories.module.css';

const collectionsSpotlight = [
  { name: 'Sanatan', label: 'Hinduism & Dharma', count: 'Spiritual Verses', color: '#1A1512', bgGradient: 'linear-gradient(135deg, #1A1512, #2E221A)', icon: '🕉️' },
  { name: 'Genesis', label: 'Christianity & Faith', count: 'Gothic Grace', color: '#12151A', bgGradient: 'linear-gradient(135deg, #12151A, #1C222E)', icon: '✝️' },
  { name: 'Olympus', label: 'Greek Mythology', count: 'Monochrome Statues', color: '#1F1F1F', bgGradient: 'linear-gradient(135deg, #1F1F1F, #333333)', icon: '⚡' },
  { name: 'Quantum', label: 'Sacred Geometry', count: 'Cosmic Strings', color: '#14121A', bgGradient: 'linear-gradient(135deg, #14121A, #201A2E)', icon: '🌀' },
  { name: 'Cinema/Comic Book', label: 'Comic & Cinema', count: 'Halftone Frames', color: '#241414', bgGradient: 'linear-gradient(135deg, #241414, #3B1C1C)', icon: '🎬' },
  { name: 'Tech/Professionals', label: 'Tech & Logic', count: 'Binary Blueprints', color: '#141E19', bgGradient: 'linear-gradient(135deg, #141E19, #1C2D24)', icon: '💻' },
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
          <span className="section-label">Curated Themes</span>
          <h2 className="section-title">Collections Spotlight</h2>
          <div className="divider" />
        </div>

        <div className={`${styles.grid} stagger-children`}>
          {collectionsSpotlight.map((col) => (
            <a key={col.name} href="/shop" className={styles.card}>
              <div
                className={styles.cardBg}
                style={{ background: col.bgGradient }}
              />
              <div className={styles.cardContent}>
                <span className={styles.icon}>{col.icon}</span>
                <h3 className={styles.catName} style={{ color: 'var(--color-accent)' }}>{col.name}</h3>
                <span className={styles.labelSub}>{col.label}</span>
                <span className={styles.count}>{col.count}</span>
                <span className={styles.explore}>Explore Collection →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
