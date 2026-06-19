import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './size-guide.module.css';

export const metadata = {
  title: 'Size Guide — Avlunè',
  description: 'Find your perfect fit with Avlunè\'s comprehensive size guide for T-shirts, Tees, and contemporary apparel.',
};

export default function SizeGuidePage() {
  const sizeData = [
    { size: 'S', chest: '36"', length: '27"', shoulder: '17.5"', sleeve: '7.5"' },
    { size: 'M', chest: '39"', length: '28"', shoulder: '18.5"', sleeve: '8.0"' },
    { size: 'L', chest: '42"', length: '29"', shoulder: '19.5"', sleeve: '8.5"' },
    { size: 'XL', chest: '45"', length: '30"', shoulder: '20.5"', sleeve: '9.0"' },
    { size: 'XXL', chest: '48"', length: '31"', shoulder: '21.5"', sleeve: '9.5"' },
  ];

  const sizeDataCm = [
    { size: 'S', chest: '91 cm', length: '68 cm', shoulder: '44 cm', sleeve: '19 cm' },
    { size: 'M', chest: '99 cm', length: '71 cm', shoulder: '47 cm', sleeve: '20 cm' },
    { size: 'L', chest: '107 cm', length: '74 cm', shoulder: '49 cm', sleeve: '21.5 cm' },
    { size: 'XL', chest: '114 cm', length: '76 cm', shoulder: '52 cm', sleeve: '23 cm' },
    { size: 'XXL', chest: '122 cm', length: '79 cm', shoulder: '54.5 cm', sleeve: '24 cm' },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="section-label">Find Your Fit</span>
            <h1 className={styles.title}>Size Guide</h1>
            <div className="divider" />
            <p className="section-subtitle">
              Get the perfect fit for our premium T-shirts & Tees
            </p>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className="container">
            <div className={styles.pageGrid}>
              
              {/* Tables column */}
              <div className={styles.tablesBlock}>
                <h2 className={styles.sectionHeading}>T-Shirts & Tees <em>Measurements</em></h2>
                
                {/* Inches Table */}
                <div className={styles.tableWrapper}>
                  <h3 className={styles.tableTitle}>Measurements in Inches</h3>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Chest (Width)</th>
                        <th>Front Length</th>
                        <th>Shoulder</th>
                        <th>Sleeve Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeData.map((row) => (
                        <tr key={row.size}>
                          <td className={styles.sizeCell}>{row.size}</td>
                          <td>{row.chest}</td>
                          <td>{row.length}</td>
                          <td>{row.shoulder}</td>
                          <td>{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Centimeters Table */}
                <div className={styles.tableWrapper}>
                  <h3 className={styles.tableTitle}>Measurements in Centimeters</h3>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Chest (Width)</th>
                        <th>Front Length</th>
                        <th>Shoulder</th>
                        <th>Sleeve Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeDataCm.map((row) => (
                        <tr key={row.size}>
                          <td className={styles.sizeCell}>{row.size}</td>
                          <td>{row.chest}</td>
                          <td>{row.length}</td>
                          <td>{row.shoulder}</td>
                          <td>{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tips column */}
              <aside className={styles.tipsSection}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>How to Measure Yourself</h3>
                  
                  <div className={styles.tipBlock}>
                    <h4>1. Chest</h4>
                    <p>Measure around the fullest part of your chest, keeping the measuring tape horizontal under your arms.</p>
                  </div>
                  
                  <div className={styles.tipBlock}>
                    <h4>2. Front Length</h4>
                    <p>Measure from the highest point of your shoulder down to the hem of the shirt.</p>
                  </div>

                  <div className={styles.tipBlock}>
                    <h4>3. Shoulder</h4>
                    <p>Measure across your upper back from the tip of one shoulder bone to the tip of the other.</p>
                  </div>

                  <div className={styles.tipBlock}>
                    <h4>4. Sleeve Length</h4>
                    <p>Measure from the shoulder seam down to the edge of the sleeve cuff.</p>
                  </div>
                </div>

                <div className={styles.fitNote}>
                  <h4>Fit Recommendation</h4>
                  <p>Our T-shirts feature a standard relaxed fit. If you prefer an oversized or slouchy streetwear fit, we recommend ordering one size up from your usual size.</p>
                </div>
              </aside>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
