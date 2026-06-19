'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ChevronRight, Heart, ShoppingBag, Truck, RotateCcw, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import styles from './productDetails.module.css';

export default function ProductDetailsClient({ initialProduct: product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  // Selected size state
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M'
  );

  // Gallery active image state
  const [activeImage, setActiveImage] = useState(product?.image);

  // Accordion state
  const [descOpen, setDescOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  if (!product) {
    return (
      <main className={styles.main}>
        <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}>
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  // Calculate discount percentage
  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const discount = calculateDiscount(product.price, product.originalPrice);

  // All sizes list for button grid
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <main className={styles.main}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <div className="container">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop">Shop</Link>
          <ChevronRight size={14} />
          <span className={styles.breadcrumbActive}>{product.name}</span>
        </div>
      </div>

      <section className={styles.productSection}>
        <div className={`container ${styles.productContainer}`}>
          
          {/* Image Gallery (Kimi & Bonkers inspired) */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImageWrap}>
              {discount && (
                <span className={styles.saveBadge}>SAVE {discount}%</span>
              )}
              
              <Image 
                src={activeImage} 
                alt={product.name} 
                fill 
                style={{ objectFit: 'cover' }} 
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className={styles.mainImage}
              />
              
              <button 
                className={styles.wishlistBtn}
                onClick={() => toggleWishlist(product)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  size={22} 
                  fill={isWishlisted ? "var(--color-accent)" : "none"} 
                  color={isWishlisted ? "var(--color-accent)" : "currentColor"} 
                />
              </button>
            </div>

            {/* Thumbnail list */}
            <div className={styles.thumbnailList}>
              <button 
                className={`${styles.thumbnail} ${activeImage === product.image ? styles.activeThumbnail : ''}`}
                onClick={() => setActiveImage(product.image)}
                aria-label="View main product image"
              >
                <Image src={product.image} alt="Main view" fill style={{ objectFit: 'cover' }} sizes="100px" />
              </button>
              {product.hoverImage && (
                <button 
                  className={`${styles.thumbnail} ${activeImage === product.hoverImage ? styles.activeThumbnail : ''}`}
                  onClick={() => setActiveImage(product.hoverImage)}
                  aria-label="View alternate product image"
                >
                  <Image src={product.hoverImage} alt="Alternate view" fill style={{ objectFit: 'cover' }} sizes="100px" />
                </button>
              )}
            </div>
          </div>

          {/* Product Info Panel */}
          <div className={styles.productDetails}>
            <span className={styles.collectionBadge}>{product.collection} Alignment</span>
            <h1 className={styles.title}>{product.name}</h1>
            
            {/* Price display with discount details */}
            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                  <span className={styles.discountTag}>({discount}% OFF)</span>
                </>
              )}
            </div>
            
            <div className="divider" style={{ margin: '1.5rem 0' }} />

            {/* Sizes Selector Button Grid */}
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeader}>
                <span className={styles.sectionLabel}>Select Size: <strong>{selectedSize}</strong></span>
                <Link href="/size-guide" className={styles.sizeGuideBtn}>
                  Size Chart
                </Link>
              </div>
              <div className={styles.sizeGrid} role="radiogroup" aria-label="Product sizes">
                {allSizes.map((size) => {
                  const isAvailable = product.sizes ? product.sizes.includes(size) : true;
                  return (
                    <button
                      key={size}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ''} ${!isAvailable ? styles.disabledSize : ''}`}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      role="radio"
                      aria-checked={selectedSize === size}
                      disabled={!isAvailable}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions: Add to Cart & Wishlist */}
            <div className={styles.actions}>
              <button 
                className={`btn btn-primary ${styles.addToCartBtn}`}
                onClick={() => addToCart(product, selectedSize)}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button 
                className={`btn ${styles.secondaryWishlistBtn}`}
                onClick={() => toggleWishlist(product)}
                aria-pressed={isWishlisted}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                {isWishlisted ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Guaranteed Safe Checkout UPI Logos */}
            <div className={styles.upiSection}>
              <p className={styles.upiTitle}>Guaranteed Safe Checkout via UPI</p>
              <div className={styles.upiLogos}>
                <div className={styles.upiBadge}>GPay</div>
                <div className={styles.upiBadge}>PhonePe</div>
                <div className={styles.upiBadge}>Paytm</div>
                <div className={styles.upiBadge}>BHIM</div>
              </div>
            </div>

            {/* Collapsible Info Tabs / Accordions */}
            <div className={styles.accordions}>
              {/* Description Accordion */}
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => setDescOpen(!descOpen)}
                  aria-expanded={descOpen}
                >
                  <span>Product Description</span>
                  {descOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {descOpen && (
                  <div className={styles.accordionBody}>
                    <p>{product.description}</p>
                    <ul className={styles.detailsList}>
                      <li><strong>Fit:</strong> Premium Heavyweight Streetwear Fit</li>
                      <li><strong>Fabric:</strong> 100% Long-staple Combed Cotton</li>
                      <li><strong>Weight:</strong> 240 GSM (Heavy knit)</li>
                      <li><strong>Care:</strong> Wash inside out cold, tumble dry low</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Size Guide Accordion */}
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => setSizeOpen(!sizeOpen)}
                  aria-expanded={sizeOpen}
                >
                  <span>Size & Measurements</span>
                  {sizeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {sizeOpen && (
                  <div className={styles.accordionBody}>
                    <table className={styles.sizeTable}>
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Chest (in)</th>
                          <th>Length (in)</th>
                          <th>Shoulder (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>S</td>
                          <td>38 - 40</td>
                          <td>27.5</td>
                          <td>18.5</td>
                        </tr>
                        <tr>
                          <td>M</td>
                          <td>40 - 42</td>
                          <td>28.5</td>
                          <td>19.5</td>
                        </tr>
                        <tr>
                          <td>L</td>
                          <td>42 - 44</td>
                          <td>29.5</td>
                          <td>20.5</td>
                        </tr>
                        <tr>
                          <td>XL</td>
                          <td>44 - 46</td>
                          <td>30.5</td>
                          <td>21.5</td>
                        </tr>
                        <tr>
                          <td>XXL</td>
                          <td>46 - 48</td>
                          <td>31.5</td>
                          <td>22.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Shipping & Returns Accordion */}
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => setShippingOpen(!shippingOpen)}
                  aria-expanded={shippingOpen}
                >
                  <span>Shipping & Returns</span>
                  {shippingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {shippingOpen && (
                  <div className={styles.accordionBody}>
                    <p>We provide swift international shipping with premium couriers:</p>
                    <ul className={styles.shippingRules}>
                      <li><strong>India:</strong> Free delivery on orders above ₹999 (3-5 business days).</li>
                      <li><strong>United Kingdom:</strong> Free delivery on orders above £30 (5-7 business days).</li>
                      <li><strong>Europe:</strong> Free delivery on orders above €40 (5-7 business days).</li>
                      <li><strong>Worldwide:</strong> Free delivery on orders above $50 (7-10 business days).</li>
                      <li><strong>Returns:</strong> 14-day hassle-free reverse pickup & exchanges.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Quick WhatsApp Support Call to Action */}
            <div className={styles.quickSupport}>
              <MessageSquare size={18} className={styles.supportIcon} />
              <span>Have a question about fit or shipping? <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a></span>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
