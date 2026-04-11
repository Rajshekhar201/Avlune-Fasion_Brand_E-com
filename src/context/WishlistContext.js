'use client';

import { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist, isMounted] = useLocalStorage('avlune_wishlist', []);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isWishlisted = prev.some((item) => item.id === product.id);
      if (isWishlisted) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  return (
    <WishlistContext.Provider 
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
