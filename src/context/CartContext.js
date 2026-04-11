'use client';

import { createContext, useContext, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart, isMounted] = useLocalStorage('avlune_cart', []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = (product, size = null) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      
      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }
      
      return [...prev, { ...product, size, quantity: 1 }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (productId, size = null) => {
    setCart((prev) => 
      prev.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) => {
      return prev.map(item => {
        if (item.id === productId && item.size === size) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        cartTotal, 
        itemCount,
        isDrawerOpen,
        setIsDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
