import { Header, Hero, Footer } from '@/components/layout';
import { FeaturedProducts } from '@/components/product';
import { Features, CallToAction } from '@/components/sections';
import { featuredProducts } from '@/data/products';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedProducts 
        title="Our Products"
        subtitle="Discover our carefully curated collection of premium furniture"
        products={featuredProducts}
        showMore={true}
      />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}
