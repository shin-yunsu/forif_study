'use client';

import Image from 'next/image';

export function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transform Your Space Today
            </h2>
            <p className="text-xl mb-8 text-amber-100">
              Discover furniture that reflects your style and enhances your lifestyle. 
              From modern minimalist to classic elegance, we have pieces for every taste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-amber-600 px-8 py-3 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Shop Collection
              </button>
              <button className="border-2 border-white text-white px-8 py-3 font-semibold rounded-full hover:bg-white hover:text-amber-600 transition-all duration-300">
                Design Consultation
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Beautiful living room"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}