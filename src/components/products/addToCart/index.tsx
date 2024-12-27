import React, { memo, CSSProperties } from 'react';
import styles from './product-card.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import { ButtonComponent } from '@/components/commons';

interface AddToCartComponentProps {
  style?: CSSProperties;
  product: ProductType;
  className?: string;
  handleSelectionOption?: React.MouseEventHandler;
  isCard?: boolean;
}
const cx = bindClassNames(styles);
const AddToCartComponent: React.FC<AddToCartComponentProps> = memo(
  ({ product, className, handleSelectionOption, isCard = false }) => {
    return (
      <div className={cx('add-to-cart-action', 'flex-1')}>
        {product.variants && isCard ? (
          <ButtonComponent onClick={handleSelectionOption} animation={false} className={className && className}>
            Select Options
          </ButtonComponent>
        ) : (
          <ButtonComponent data-btn-addtocart data-variant-id="" className={className && className} animation={false}>
            Add To Cart
          </ButtonComponent>
        )}
      </div>
    );
  }
);

export default AddToCartComponent;
