'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Apoorva Reddy',
    location: 'Hyderabad',
    text: "Finally, designs that speak to my soul! The Sanatan collection's Dharma tee feels sacred yet so modern.",
    rating: 5,
  },
  {
    id: 2,
    name: 'James',
    location: 'London',
    text: "Finally a Christian streetwear brand that doesn't look outdated! The Genesis details are outstanding.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Chloe',
    location: 'Athens',
    text: "The Greek mythology designs are subtle yet powerful! Got so many compliments on my Athena tee.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Max',
    location: 'Berlin',
    text: "Sacred geometry tee gets me compliments everywhere! The Quantum collection print quality is top-notch.",
    rating: 5,
  },
  {
    id: 5,
    name: 'Meera Patel',
    location: 'Delhi',
    text: "The quality of the prints is unreal. Wearing the Quantum Mindspace tee is like wearing a conversation starter.",
    rating: 5,
  }
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
