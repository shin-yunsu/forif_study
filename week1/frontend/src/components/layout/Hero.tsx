'use client';

import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FCF8F3]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-80px)]">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-4 lg:px-12 py-8 lg:py-0">
            <div className="bg-[#FFF3E3] inline-block px-4 py-2 mb-4 max-w-fit">
              <span className="text-[#333333] font-semibold text-sm tracking-wider">
                New Arrival
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-[52px] font-bold text-[#B88E2F] mb-4 leading-tight">
              Discover Our<br />
              New Collection
            </h1>
            
            <p className="text-[#666666] text-lg mb-8 max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            
            <div>
              <button className="bg-[#B88E2F] text-white px-12 py-4 text-base font-bold uppercase tracking-wide hover:bg-[#A07B2A] transition-all duration-300 transform hover:scale-105">
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] lg:h-[calc(100vh-160px)] w-full">
            <div className="absolute inset-0 bg-[#FCF8F3]">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Living room with modern furniture"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}