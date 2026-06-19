'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

const EXCHANGE_RATES = {
  INR: 1.0,
  USD: 0.012,
  GBP: 0.0095,
  EUR: 0.011,
};

const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  EUR: '€',
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('INR');

  useEffect(() => {
    // Try to get from localStorage first
    const saved = localStorage.getItem('avlune_currency');
    if (saved && EXCHANGE_RATES[saved]) {
      setCurrency(saved);
      return;
    }

    // Auto-detect based on timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Asia/Kolkata')) {
          setCurrency('INR');
        } else if (tz.includes('London') || tz.includes('Europe/London') || tz.includes('GB')) {
          setCurrency('GBP');
        } else if (tz.includes('Europe')) {
          setCurrency('EUR');
        } else {
          setCurrency('USD');
        }
      }
    } catch (e) {
      console.warn('Could not auto-detect timezone/currency:', e);
    }
  }, []);

  const changeCurrency = (newCurrency) => {
    if (EXCHANGE_RATES[newCurrency]) {
      setCurrency(newCurrency);
      localStorage.setItem('avlune_currency', newCurrency);
    }
  };

  const convertPrice = (priceInINR) => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    return priceInINR * rate;
  };

  const formatPrice = (priceInINR) => {
    const converted = convertPrice(priceInINR);
    const symbol = CURRENCY_SYMBOLS[currency] || '₹';
    
    // Format options based on currency
    if (currency === 'INR') {
      return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    } else {
      return `${symbol}${converted.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, convertPrice, formatPrice, symbols: CURRENCY_SYMBOLS }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
