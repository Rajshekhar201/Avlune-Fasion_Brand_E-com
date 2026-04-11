'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#FDFBF9', color: '#1A1A1A' }}>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Critical System Error</h1>
          <p style={{ maxWidth: '500px', marginBottom: '2rem', color: '#8A8A8A' }}>
            A deep-level critical structural failure occurred.
          </p>
          <button onClick={() => reset()} style={{ padding: '0.75rem 2rem', background: '#C9A96E', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Attempt Recovery
          </button>
        </main>
      </body>
    </html>
  );
}
