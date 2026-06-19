import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './shipping-returns.module.css';

export const metadata = {
  title: 'Shipping & Returns — Avlunè',
  description: 'Understand Avlunè\'s shipping details, delivery schedules, and return policy for an effortless online shopping experience.',
};

export default function ShippingReturnsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="section-label">Customer Care</span>
            <h1 className={styles.title}>Shipping & Returns</h1>
            <div className="divider" />
            <p className="section-subtitle">
              Everything you need to know about delivery and easy returns
            </p>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className="container">
            <div className={styles.pageGrid}>
              {/* Shipping Section */}
              <div className={styles.sectionBlock}>
                <h2 className={styles.sectionHeading}>Shipping Policy & <em>Guidelines</em></h2>
                <div className={styles.card}>
                  <h3>Delivery Timeline</h3>
                  <p>All orders are processed and dispatched within 24 to 48 hours of order confirmation.</p>
                  <ul>
                    <li><strong>Standard Shipping:</strong> 3-5 business days across major cities in India.</li>
                    <li><strong>Express Shipping:</strong> 1-2 business days (available at checkout for select pin codes).</li>
                  </ul>
                </div>
                
                <div className={styles.card}>
                  <h3>Shipping Charges</h3>
                  <p>We believe in keeping things simple and transparent:</p>
                  <ul>
                    <li><strong>Free Shipping:</strong> On all orders above ₹1,500.</li>
                    <li><strong>Standard Delivery:</strong> A flat fee of ₹99 is applicable for orders under ₹1,500.</li>
                  </ul>
                </div>

                <div className={styles.card}>
                  <h3>Order Tracking</h3>
                  <p>Once your order is shipped, you will receive a tracking link via SMS and email. You can monitor your shipment directly via our shipping partner's portal.</p>
                </div>
              </div>

              {/* Returns Section */}
              <div className={styles.sectionBlock}>
                <h2 className={styles.sectionHeading}>Easy Returns & <em>Exchanges</em></h2>
                <div className={styles.card}>
                  <h3>Our 7-Day Window</h3>
                  <p>If you are not completely satisfied with your purchase, you can request a return or exchange within 7 days of delivery.</p>
                  <p>Please note that products must be unworn, unwashed, and in their original packaging with all tags intact to be eligible for a refund.</p>
                </div>

                <div className={styles.card}>
                  <h3>How to Return</h3>
                  <ol>
                    <li>Go to your profile or click our return request portal.</li>
                    <li>Enter your Order ID and mobile number.</li>
                    <li>Select the item(s) you wish to return and state the reason.</li>
                    <li>We will arrange a reverse pickup from your address within 24-48 hours.</li>
                  </ol>
                </div>

                <div className={styles.card}>
                  <h3>Refund Processing</h3>
                  <p>Once we receive and inspect the returned item(s) at our warehouse, your refund will be initiated:</p>
                  <ul>
                    <li><strong>UPI/Bank Transfer:</strong> Processed within 2-3 business days.</li>
                    <li><strong>Store Credit:</strong> Issued instantly as an e-gift card.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
