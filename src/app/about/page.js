import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './about.module.css';

export const metadata = {
  title: 'About — Avlunè | Our Story',
  description: 'Learn about Avlunè — our passion for Korean-inspired jewelry design, our craftsmanship philosophy, and the grace behind every detail.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="section-label">About Us</span>
            <h1 className={styles.title}>Our Story</h1>
            <div className="divider" />
            <p className="section-subtitle">
              The passion and artistry behind Avlunè
            </p>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyText}>
                <h2 className={styles.sectionTitle}>Craftsmanship is our <em>Heartbeat</em></h2>
                <p className={styles.description}>
                  Every piece of Avlunè jewelry is more than just an accessory; it is a labor of love. 
                  Our artisans blend traditional Korean techniques with modern minimalist aesthetics to create 
                  timeless pieces that celebrate the subtle strength of the modern woman.
                </p>
                <p className={styles.description}>
                  We believe that luxury should be felt in the weight of the metal and the precision of the setting. 
                  That&apos;s why we source only the finest materials, ensuring that your jewelry remains as radiant 
                  as the day you first wore it.
                </p>
              </div>
              <div className={styles.storyImage}>
                <img src="/images/rings.png" alt="Handcrafted Rings" className={styles.image} />
              </div>
            </div>

            <div className={styles.valuesSection}>
              <div className={styles.valueCard}>
                <span className={styles.valueIcon}>✦</span>
                <h3 className={styles.valueTitle}>Elegance</h3>
                <p className={styles.valueText}>Simplicity is the ultimate sophistication. Our designs focus on the purity of form.</p>
              </div>
              <div className={styles.valueCard}>
                <span className={styles.valueIcon}>✦</span>
                <h3 className={styles.valueTitle}>Integrity</h3>
                <p className={styles.valueText}>Ethically sourced and responsibly crafted. We believe in beauty without compromise.</p>
              </div>
              <div className={styles.valueCard}>
                <span className={styles.valueIcon}>✦</span>
                <h3 className={styles.valueTitle}>Detail</h3>
                <p className={styles.valueText}>From the inner engraving to the outer luster, we oversee every tiny specification.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
