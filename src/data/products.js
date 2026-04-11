export const products = [
  {
    id: 1,
    name: 'Lumière Diamond Ring',
    price: 35000,
    category: 'Rings',
    description: 'A radiant cut diamond set in 18k white gold, featuring a delicate halo and pave band. Exceptional clarity that sparkles with every movement.',
    image: '/images/rings.png',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9']
  },
  {
    id: 2,
    name: 'Aura Pearl Earrings',
    price: 18500,
    category: 'Earrings',
    description: 'Freshwater cultured pearls suspended from elegant 14k gold arcs. Perfect for both everyday wear and special occasions.',
    image: '/images/earrings.png'
  },
  {
    id: 3,
    name: 'Celeste Pendant Necklace',
    price: 24000,
    category: 'Necklaces',
    description: 'A minimalist starburst pendant adorned with a central moissanite stone. Includes an adjustable 16-18 inch delicate gold chain.',
    image: '/images/hero.png'
  },
  {
    id: 4,
    name: 'Eternity Tennis Bracelet',
    price: 45000,
    category: 'Bracelets',
    description: 'A classic 14k rose gold tennis bracelet featuring brilliant-cut cubic zirconia for uninterrupted sparkle around your wrist.',
    image: '/images/rings.png' 
    // Reusing images since we only have three primary assets available right now
  },
  {
    id: 5,
    name: 'Solstice Statement Ring',
    price: 28500,
    category: 'Rings',
    description: 'A bold, sweeping design inspired by the sun\'s rays, crafted in solid 18k yellow gold with scattered micro-diamonds.',
    image: '/images/earrings.png',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8']
  },
  {
    id: 6,
    name: 'Whisper Chain Necklace',
    price: 12000,
    category: 'Necklaces',
    description: 'Our most delicate piece. A barely-there 14k gold chain that catches the light beautifully when worn bare or layered.',
    image: '/images/hero.png'
  },
  {
    id: 7,
    name: 'Luna Drop Earrings',
    price: 21000,
    category: 'Earrings',
    description: 'Crescent moon inspired drops in hammered sterling silver with gold vermeil details. Lightweight and statement-making.',
    image: '/images/earrings.png'
  },
  {
    id: 8,
    name: 'Harmony Cuff Bracelet',
    price: 32000,
    category: 'Bracelets',
    description: 'A sleek, minimalist cuff with an invisible clasp mechanism. Perfect stackable addition to your daily jewelry wardrobe.',
    image: '/images/rings.png'
  }
];

// Helper functions for data fetching
export const getProducts = () => products;
export const getProductById = (id) => products.find(p => p.id === parseInt(id));
export const getProductsByCategory = (category) => {
  if (category === 'All Jewelry') return products;
  return products.filter(p => p.category === category);
};
