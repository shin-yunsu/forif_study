import { Header, Footer } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { featuredProducts } from '@/data/products';

export default function ShopPage() {
  // In a real app, this would fetch from an API
  const allProducts = [...featuredProducts, ...featuredProducts].map((product, index) => ({
    ...product,
    id: `${product.id}-${index}`,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Banner */}
      <section className="relative h-[316px] bg-gray-100 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="relative text-center">
          <h1 className="text-5xl font-medium text-black mb-2">Shop</h1>
          <div className="flex items-center justify-center gap-2 text-base">
            <span className="font-medium">Home</span>
            <span className="text-black">›</span>
            <span className="font-light">Shop</span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-[#F9F1E7] py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Left side - Filter and Results */}
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-normal text-base">Filter</span>
              </button>
              
              <div className="flex items-center gap-4">
                <button className="p-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="text-black">
                <span className="text-base">Showing 1-16 of 32 results</span>
              </div>
            </div>

            {/* Right side - Show and Sort */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-base">Show</span>
                <input 
                  type="number" 
                  defaultValue="16" 
                  className="w-16 px-3 py-2 bg-white text-center text-[#9F9F9F]"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-base">Short by</span>
                <select className="px-4 py-2 bg-white text-[#9F9F9F] min-w-[180px]">
                  <option>Default</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                  <option>Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allProducts.slice(0, 16).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-4 py-2 bg-[#B88E2F] text-white rounded hover:bg-[#A07B2A] transition-colors">
            1
          </button>
          <button className="px-4 py-2 bg-[#F9F1E7] text-black rounded hover:bg-[#B88E2F] hover:text-white transition-colors">
            2
          </button>
          <button className="px-4 py-2 bg-[#F9F1E7] text-black rounded hover:bg-[#B88E2F] hover:text-white transition-colors">
            3
          </button>
          <button className="px-4 py-2 bg-[#F9F1E7] text-black rounded hover:bg-[#B88E2F] hover:text-white transition-colors">
            Next
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#FAF3EA] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🏆</div>
              <div>
                <h3 className="font-semibold text-[#242424] text-lg mb-1">High Quality</h3>
                <p className="text-[#898989] text-sm">Crafted from top materials</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl">✓</div>
              <div>
                <h3 className="font-semibold text-[#242424] text-lg mb-1">Warranty Protection</h3>
                <p className="text-[#898989] text-sm">Over 2 years</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl">🚚</div>
              <div>
                <h3 className="font-semibold text-[#242424] text-lg mb-1">Free Shipping</h3>
                <p className="text-[#898989] text-sm">Order over 150 $</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎧</div>
              <div>
                <h3 className="font-semibold text-[#242424] text-lg mb-1">24 / 7 Support</h3>
                <p className="text-[#898989] text-sm">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}