import React, { memo, CSSProperties } from 'react';
import styles from './product-card.module.scss';
import { ButtonComponent } from '@/components/commons';
import { CloseIcon, WishListIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';

export type Product = {
  title: string;
  price: number;
  images: string[];
  description: string;
  link: string;
  vendor: string;
};
interface ProductCardComponentProps {
  style?: CSSProperties;
  product: Product;
  className?: string;
  removeWishListIcon?: boolean;
}
const cx = bindClassNames(styles);
const ProductCardComponent: React.FC<ProductCardComponentProps> = memo(
  ({ product, className, removeWishListIcon = false }) => {
    return (
      <div className={cx('card', className)}>
        <div className={cx('card-product', 'rounded-[10px]')}>
          <div className={cx('card-media')}>
            <img className={cx('first-image')} src={product.images[0]} alt="" />
            <img className={cx('second-image')} src={product.images[1]} alt="" />
            <div className={cx('card-link', 'cursor-pointer')}></div>
          </div>
          <div className={cx('card-action')}>
            <ButtonComponent animation={false} style={{ marginTop: '10px', padding: '5px' }}>
              Quick Add
            </ButtonComponent>
          </div>
          <div className={cx('card-group')}>
            <div className={cx('card__group-wishlist', 'p-[10px]')}>
              {removeWishListIcon ? <CloseIcon className={cx('icon')} /> : <WishListIcon className={cx('icon')} />}
            </div>
          </div>
          <div className={cx('card-badge')}>
            <div className={cx('sale-badge')}>
              <span className={cx('text')}>Sale</span>
            </div>
          </div>
        </div>
        <div className={cx('card-information', 'mt-[10px] italic')}>
          <div className={cx('card-vendor', 'text-center')}>
            <a href={product.link} title={product.vendor}>
              {product.vendor}
            </a>
          </div>
          <div className={cx('card-title', 'text-center italic')}>
            <a href={product.link}>{product.title}</a>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCardComponent;
