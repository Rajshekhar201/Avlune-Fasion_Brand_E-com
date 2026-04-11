import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import CartDrawer from '@/components/CartDrawer';
import CustomCursor from '@/components/CustomCursor';
import VisitTracker from '@/components/VisitTracker';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const metadata = {
  title: 'Avlunè — Grace in Every Detail | Premium Handcrafted Jewelry',
  description: 'Discover exquisite handcrafted jewelry by Avlunè. Korean-inspired designs celebrating elegance, femininity, and timeless beauty. Rings, necklaces, earrings, and bracelets crafted with grace.',
  keywords: 'Avlunè, jewelry, handcrafted, Korean fashion, rings, necklaces, earrings, bracelets, luxury, premium',
  openGraph: {
    title: 'Avlunè — Grace in Every Detail',
    description: 'Exquisite handcrafted jewelry celebrating elegance and timeless design.',
    siteName: 'Avlunè',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#1A1A1A" />
      </head>
      <body>
        <WishlistProvider>
          <CartProvider>
            <VisitTracker />
            <CustomCursor />
            {children}
            <CartDrawer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}

