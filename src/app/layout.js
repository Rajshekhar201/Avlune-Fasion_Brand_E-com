import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import CartDrawer from '@/components/CartDrawer';
import CustomCursor from '@/components/CustomCursor';
import VisitTracker from '@/components/VisitTracker';
import MobileBottomNav from '@/components/MobileBottomNav';
import WhatsAppWidget from '@/components/WhatsAppWidget';

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
  title: 'Avlunè — Wear Your Faith, Define Your Style | Inspired Streetwear & Tees',
  description: 'Born from a fusion of sacred traditions and cutting-edge aesthetics. We create wearable shrines across our Sanatan, Genesis, Olympus, and Quantum streetwear collections.',
  keywords: 'Avlunè, streetwear, graphic tees, oversized tees, Sanatan, Genesis, Olympus, Quantum, sacred geometry, coding tees, anime tees',
  openGraph: {
    title: 'Avlunè — Wear Your Faith, Define Your Style',
    description: 'Born from a fusion of sacred traditions and cutting-edge aesthetics.',
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
        <CurrencyProvider>
          <WishlistProvider>
            <CartProvider>
              <VisitTracker />
              <CustomCursor />
              {children}
              <CartDrawer />
              <MobileBottomNav />
              <WhatsAppWidget />
            </CartProvider>
          </WishlistProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
