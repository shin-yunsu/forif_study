'use client';

import { ProductCard } from './ProductCard';
import { FeaturedProductsProps } from './types';

export function FeaturedProducts({ 
  title, 
  subtitle, 
  products, 
  showMore = false, 
  onShowMore 
}: FeaturedProductsProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Show More Button */}
      {showMore && onShowMore && (
        <div className="text-center">
          <button
            onClick={onShowMore}
            className="inline-flex items-center px-8 py-3 border border-amber-600 text-amber-600 font-medium rounded-full hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Show More
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}