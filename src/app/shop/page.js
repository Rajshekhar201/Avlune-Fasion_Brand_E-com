import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './shop.module.css';
import ShopContent from './ShopContent';

export const metadata = {
  title: 'Shop — Avlunè | Premium Handcrafted Jewelry',
  description: 'Browse our exquisite collection of handcrafted rings, necklaces, earrings, and bracelets.',
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="section-label">Our Collection</span>
            <h1 className={styles.title}>Shop All</h1>
            <div className="divider" />
            <p className="section-subtitle">
              Discover pieces crafted with passion and precision
            </p>
          </div>
        </section>

        <ShopContent />
      </main>
      <Footer />
    </>
  );
}
