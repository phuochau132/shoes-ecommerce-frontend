import React, { memo, CSSProperties, useCallback } from 'react';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import { calTotalReview } from '@/utils/helpers/review';

interface ProductReviewComponentProps {
  style?: CSSProperties;
  product: ProductType;
}
const ProductReviewComponent: React.FC<ProductReviewComponentProps> = memo(({ product }) => {
  const totalReview = calTotalReview({ product });
  console.log('totalReview', product.reviews);
  const renderStar = useCallback((total: number): JSX.Element => {
    const stars = [];

    if (total === 0) {
      return <span className="no-rating">☆☆☆☆☆</span>;
    }

    for (let i = 1; i <= 5; i++) {
      if (i <= total) {
        stars.push(
          <span key={i} className="star star-on">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star star-off">
            ☆
          </span>
        );
      }
    }

    return <div className="stars">{stars}</div>;
  }, []);
  return <div className="product-review">{renderStar(totalReview)}</div>;
});

export default ProductReviewComponent;
