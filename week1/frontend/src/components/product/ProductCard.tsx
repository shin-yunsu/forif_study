'use client';

import Image from 'next/image';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price).replace('IDR', 'Rp');
  };

  return (
    <div className="group relative bg-[#F4F5F7] overflow-hidden transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x400/f3f4f6/6b7280?text=Product+Image';
          }}
        />
        
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-medium rounded-full text-white ${
            product.badge.type === 'discount' 
              ? 'bg-[#E97171]' 
              : product.badge.type === 'new' 
              ? 'bg-[#2EC1AC]'
              : 'bg-gray-800'
          }`}>
            {product.badge.text}
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
          {/* Add to cart button */}
          <button className="bg-white text-[#B88E2F] px-12 py-3 font-semibold text-base hover:bg-[#B88E2F] hover:text-white transition-all duration-200 mb-6">
            Add to cart
          </button>
          
          {/* Action buttons */}
          <div className="flex items-center gap-5 text-white">
            <button className="flex items-center gap-1 hover:text-[#B88E2F] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-sm font-medium">Share</span>
            </button>
            
            <button className="flex items-center gap-1 hover:text-[#B88E2F] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium">Compare</span>
            </button>
            
            <button className="flex items-center gap-1 hover:text-[#B88E2F] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium">Like</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 bg-[#F4F5F7]">
        <h3 className="text-2xl font-semibold text-[#3A3A3A] mb-2">
          {product.name}
        </h3>
        <p className="text-[#898989] text-base mb-2">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold text-[#3A3A3A]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-base text-[#B0B0B0] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}