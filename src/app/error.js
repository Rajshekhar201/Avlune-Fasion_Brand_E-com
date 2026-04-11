'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          We're polishing this section.
        </h1>
        <p style={{ maxWidth: '500px', color: 'var(--color-muted)', marginBottom: '2rem' }}>
          An unexpected error occurred while loading this page. Our artisans are working to restore the grace of this experience.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => reset()} className="btn btn-primary" aria-label="Try refreshing the page">
            Refresh Gracefully
          </button>
          <Link href="/" className="btn btn-outline" aria-label="Return to the homepage">
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
