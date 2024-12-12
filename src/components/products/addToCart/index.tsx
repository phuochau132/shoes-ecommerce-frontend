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
}
const cx = bindClassNames(styles);
const AddToCartComponent: React.FC<AddToCartComponentProps> = memo(({ product, className, handleSelectionOption }) => {
  return (
    <div className={cx('add-to-cart-action')}>
      {product.variants ? (
        <ButtonComponent
          onClick={handleSelectionOption}
          animation={false}
          style={{ marginTop: '10px', padding: '5px' }}
        >
          Select Options
        </ButtonComponent>
      ) : (
        <ButtonComponent animation={false} style={{ marginTop: '10px', padding: '5px' }}>
          Add To Cart
        </ButtonComponent>
      )}
    </div>
  );
});

export default AddToCartComponent;
