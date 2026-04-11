import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './shop.module.css';

export default function ShopLoading() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>The Collection</h1>
            <div className={`divider ${styles.divider}`} />
            <div className={styles.skeletonFilter} style={{ height: '40px', width: '200px', background: 'var(--color-border)', margin: '0 auto', borderRadius: '4px', animation: 'shimmer 1.5s infinite linear' }} />
          </div>
        </section>

        <section className={`section ${styles.shopSection}`}>
          <div className="container">
            <div className={styles.layout}>
              {/* Skeleton Sidebar */}
              <aside className={styles.sidebar}>
                <div style={{ height: '300px', background: 'var(--color-border)', borderRadius: '4px', opacity: 0.5, animation: 'shimmer 1.5s infinite linear' }} />
              </aside>

              {/* Skeleton Grid */}
              <div className={styles.grid}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={styles.productCard}>
                    <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--color-border)', borderRadius: '4px', opacity: 0.5, animation: 'shimmer 1.5s infinite linear', marginBottom: '1rem' }} />
                    <div style={{ height: '16px', width: '60%', background: 'var(--color-border)', borderRadius: '4px', opacity: 0.5, margin: '0 auto 0.5rem', animation: 'shimmer 1.5s infinite linear' }} />
                    <div style={{ height: '16px', width: '40%', background: 'var(--color-border)', borderRadius: '4px', opacity: 0.5, margin: '0 auto', animation: 'shimmer 1.5s infinite linear' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
