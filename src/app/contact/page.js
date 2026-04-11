'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './contact.module.css';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="section-label">Get in Touch</span>
            <h1 className={styles.title}>Contact Us</h1>
            <div className="divider" />
            <p className="section-subtitle">
              We&apos;d love to hear from you
            </p>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className={`container ${styles.contactGrid}`}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Send us a <em>Message</em></h2>
              
              {formStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--surface)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <CheckCircle2 color="var(--primary)" size={48} style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-playfair)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. A member of our team will get back to you shortly.</p>
                  <button onClick={() => setFormStatus('idle')} className="btn btn-outline" style={{ marginTop: '2rem' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <input type="text" id="name" className={styles.input} placeholder="Jane Doe" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input type="email" id="email" className={styles.input} placeholder="jane@example.com" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="message" className={styles.label}>Your Message</label>
                    <textarea id="message" className={styles.textarea} placeholder="How can we help you?" rows={5} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={formStatus === 'submitting'} aria-live="polite">
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <aside className={styles.detailsSection}>
              <div className={styles.detailBlock}>
                <h3 className={styles.detailTitle}>Visit Our Atelier</h3>
                <p className={styles.detailText}>
                  123 Luxury Lane, Colaba<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
              <div className={styles.detailBlock}>
                <h3 className={styles.detailTitle}>Connect</h3>
                <p className={styles.detailText}>
                  General Inquiries: hello@avlune.com<br />
                  Press: press@avlune.com<br />
                  Phone: +91 98765 43210
                </p>
              </div>
              <div className={styles.socialBlock}>
                <h3 className={styles.detailTitle}>Follow the Journey</h3>
                <div className={styles.socialIcons}>
                  <span className={styles.socialIcon}>Instagram</span>
                  <span className={styles.socialIcon}>Facebook</span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
