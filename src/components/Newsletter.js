'use client';

import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className={styles.bgPattern} />
      <div className={`container ${styles.container}`}>
        <div className={`${styles.content} reveal`}>
          <span className="section-label" style={{ color: 'var(--color-accent-light)' }}>
            Stay Connected
          </span>
          <h2 className={styles.title}>Join the Avlunè Family</h2>
          <p className={styles.subtitle}>
            Be the first to discover new collections, receive exclusive offers, 
            and experience the world of Avlunè.
          </p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrap}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                id="newsletter-email"
              />
              <button type="submit" className={styles.submitBtn} aria-label="Subscribe">
                <Send size={18} />
              </button>
            </div>
            {submitted && (
              <p className={styles.success}>Welcome to the family! ✨</p>
            )}
          </form>

          <p className={styles.disclaimer}>
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
