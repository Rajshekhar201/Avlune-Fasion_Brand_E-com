'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';


export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isDrawerOpen, setIsDrawerOpen, clearCart } = useCart();
  const [checkoutStatus, setCheckoutStatus] = useState('idle');

  if (!isDrawerOpen) return null;

  const handleCheckout = async () => {
    setCheckoutStatus('processing');
    
    try {
      // Prepare the order data
      const orderData = {
        customer_name: 'Guest Customer', // Static for now, can be dynamic if auth added
        total_amount: cartTotal,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size
        })),
        status: 'pending'
      };

      // Create order in Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (error) throw error;

      console.log('Order created successfully:', data);
      
      setCheckoutStatus('success');
      clearCart();
      setTimeout(() => {
        setIsDrawerOpen(false);
        setCheckoutStatus('idle');
      }, 3000);
    } catch (err) {
      console.error('Checkout failed:', err);
      setCheckoutStatus('idle');
      alert('Checkout failed. Please try again.');
    }
  };


  return (
    <>
      <div 
        className={styles.overlay} 
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />
      <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Shopping Cart">
        <header className={styles.header}>
          <h2>Your Cart</h2>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </header>

        <div className={styles.content}>
          {checkoutStatus === 'success' ? (
            <div className={styles.emptyState}>
              <div className={styles.successIcon}>✓</div>
              <p>Order Placed Successfully!</p>
              <p className={styles.subtext}>Thank you for choosing Avlunè.</p>
            </div>
          ) : cart.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} className={styles.emptyIcon} />
              <p>Your cart is empty.</p>
              <button 
                className={`btn btn-primary ${styles.shopBtn}`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {cart.map((item) => (
                <li key={`${item.id}-${item.size || 'default'}`} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.itemImg} />
                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id, item.size)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {item.size && <p className={styles.itemSize}>Size: {item.size}</p>}
                    <p className={styles.itemPrice}>₹{item.price.toLocaleString()}</p>
                    
                    <div className={styles.quantityControls}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && checkoutStatus !== 'success' && (
          <footer className={styles.footer}>
            <div className={styles.totalDiv}>
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <p className={styles.taxes}>Taxes and shipping calculated at checkout.</p>
            <button 
              className={`btn btn-primary ${styles.checkoutBtn}`}
              onClick={handleCheckout}
              disabled={checkoutStatus === 'processing'}
              aria-live="polite"
            >
              {checkoutStatus === 'processing' ? 'Processing...' : 'Checkout Seamlessly'}
            </button>
          </footer>
        )}
      </div>
    </>
  );
}
