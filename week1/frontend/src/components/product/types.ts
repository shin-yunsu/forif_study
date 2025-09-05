export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number | null;
  discount?: number;
  isNew?: boolean;
  badge?: {
    text: string;
    type: 'discount' | 'new';
  };
}

export interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showMore?: boolean;
  onShowMore?: () => void;
}