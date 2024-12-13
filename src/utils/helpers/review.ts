import { ProductType } from '@/types/product';

type TotalReviewProps = {
  product: ProductType;
};

export function calTotalReview({ product }: TotalReviewProps): number {
  let totalReview = 0;

  if (product.reviews && product.reviews.length > 0) {
    totalReview = product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length;
  }

  return totalReview;
}
