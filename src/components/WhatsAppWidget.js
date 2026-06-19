'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import styles from './WhatsAppWidget.module.css';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      region: 'India Support',
      number: '+91 98765 43210',
      message: 'Hello Avlunè India! I would like to inquire about my order / collection.',
      link: 'https://wa.me/919876543210'
    },
    {
      region: 'UK & Europe Support',
      number: '+44 20 7946 0958',
      message: 'Hello Avlunè UK/Europe! I would like to inquire about my order / collection.',
      link: 'https://wa.me/442079460958'
    }
  ];

  return (
    <div className={styles.widgetWrapper}>
      {/* Popover */}
      {isOpen && (
        <div className={styles.popover} role="dialog" aria-label="WhatsApp Support">
          <header className={styles.header}>
            <div className={styles.brandInfo}>
              <div className={styles.avatar}>A</div>
              <div>
                <h3>Avlunè Assistant</h3>
                <span>Typically replies instantly</span>
              </div>
            </div>
            <button 
              className={styles.closeBtn} 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </header>
          
          <div className={styles.body}>
            <p className={styles.introText}>
              Connect with us on WhatsApp for <strong>order confirmations</strong>, <strong>shipping updates</strong>, or <strong>submitting feedback</strong>.
            </p>
            
            <div className={styles.contactList}>
              {contacts.map((c) => (
                <a 
                  key={c.region}
                  href={`${c.link}?text=${encodeURIComponent(c.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactCard}
                >
                  <div className={styles.contactDetails}>
                    <span className={styles.region}>{c.region}</span>
                    <span className={styles.number}>{c.number}</span>
                  </div>
                  <div className={styles.sendIcon}>
                    <Send size={14} />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <footer className={styles.footer}>
            <span>Powered by Avlunè Care</span>
          </footer>
        </div>
      )}

      {/* Floating button */}
      <button 
        className={styles.floatBtn} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact support on WhatsApp"
        aria-expanded={isOpen}
      >
        <MessageSquare size={24} fill="currentColor" />
        <span className={styles.tooltip}>Chat with us</span>
      </button>
    </div>
  );
}
