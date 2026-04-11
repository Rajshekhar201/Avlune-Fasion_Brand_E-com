'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: 'The Celestine Ring is absolutely breathtaking. The attention to detail is exceptional — it truly feels like wearing a piece of art.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ananya Reddy',
    location: 'Hyderabad',
    text: 'Avlunè captures an elegance I haven\'t found anywhere else. The Lumière Necklace has become my everyday signature piece.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Meera Patel',
    location: 'Delhi',
    text: 'From the packaging to the jewelry itself, everything speaks of premium quality. I\'m a customer for life.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="divider" />
        </div>

        <div className={`${styles.carousel} reveal`}>
          <button className={styles.navBtn} onClick={prev} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>

          <div className={styles.testimonialWrap}>
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`${styles.testimonial} ${i === active ? styles.active : ''}`}
              >
                <div className={styles.stars}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                  ))}
                </div>
                <blockquote className={styles.quote}>&ldquo;{t.text}&rdquo;</blockquote>
                <div className={styles.author}>
                  <div className={styles.avatar}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <span className={styles.name}>{t.name}</span>
                    <span className={styles.location}>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.navBtn} onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
