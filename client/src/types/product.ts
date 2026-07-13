export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  brand: string;
  gender: string;
  category: string;
  discount?: number
  rating?: number
  reviewsCount?: number
  discountPercentage: number
}