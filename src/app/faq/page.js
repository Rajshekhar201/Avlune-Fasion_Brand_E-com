'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './faq.module.css';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    category: 'Orders & Payments',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Browse our shop, select your size from the available options, and click "Add to Cart". Once you are ready, click on the shopping bag icon, go to the checkout page, and follow the prompts to complete your payment.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards, UPI payments (GPay, PhonePe, Paytm), Net Banking, and cash on delivery (COD) for domestic orders.'
      },
      {
        q: 'Can I cancel or modify my order?',
        a: 'Orders can be modified or cancelled within 4 hours of placement. Please get in touch with our support team immediately at hello@avlune.com or call us.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How much does shipping cost?',
        a: 'We offer free standard shipping on all orders above ₹1,500. For orders under ₹1,500, a flat standard shipping fee of ₹99 is applied at checkout.'
      },
      {
        q: 'How do I track my shipment?',
        a: 'Once your order is shipped, you will receive an email and SMS containing a tracking number and a link to monitor your package in real-time.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within India. We plan to start international shipping soon. Stay tuned!'
      }
    ]
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a hassle-free 7-day return and exchange policy. Items must be in their original condition—unworn, unwashed, and with all tags attached.'
      },
      {
        q: 'How do I request a return or exchange?',
        a: 'You can initiate a return directly through our support or contact channels. We will arrange a reverse pickup from your address within 24-48 hours at no additional charge.'
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 2-3 business days after the returned product reaches our warehouse and passes a quality check. The amount is refunded back to your original payment method or bank account.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="section-label">Support</span>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            <div className="divider" />
            <p className="section-subtitle">
              Quick answers to help you shop with confidence
            </p>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className={`container ${styles.faqContainer}`}>
            {faqData.map((cat, catIdx) => (
              <div key={cat.category} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>{cat.category}</h2>
                <div className={styles.accordion}>
                  {cat.questions.map((faq, qIdx) => {
                    const key = `${catIdx}-${qIdx}`;
                    const isOpen = openIndex === key;
                    return (
                      <div key={faq.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                        <button 
                          className={styles.questionBtn} 
                          onClick={() => toggleFAQ(catIdx, qIdx)}
                          aria-expanded={isOpen}
                        >
                          <span className={styles.questionText}>{faq.q}</span>
                          <span className={styles.icon}>
                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                          </span>
                        </button>
                        <div className={styles.answerWrap} style={{ maxHeight: isOpen ? '200px' : '0px' }}>
                          <p className={styles.answerText}>{faq.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
