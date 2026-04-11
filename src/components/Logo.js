'use client';

import styles from './Logo.module.css';

export default function Logo({ variant = 'default', size = 'md', showTagline = false }) {
  // When logo image is available, replace the text with:
  // <img src="/images/logo.png" alt="Avlunè" className={styles.logoImage} />
  
  const sizeClass = styles[`size_${size}`] || '';
  const variantClass = styles[`variant_${variant}`] || '';

  return (
    <div className={`${styles.logo} ${sizeClass} ${variantClass}`}>
      {/* LOGO PLACEHOLDER — Replace with <img> when logo is provided */}
      <span className={styles.logoText}>Avlunè</span>
      {showTagline && (
        <span className={styles.tagline}>Grace in every detail</span>
      )}
    </div>
  );
}
