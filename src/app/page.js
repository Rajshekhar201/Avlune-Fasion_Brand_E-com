import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCollection from '@/components/FeaturedCollection';
import BrandStory from '@/components/BrandStory';
import Categories from '@/components/Categories';
import ShopByCollections from '@/components/ShopByCollections';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollection />
        <BrandStory />
        <Categories />
        <ShopByCollections />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
