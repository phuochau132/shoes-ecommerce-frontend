import React, { memo, CSSProperties, useCallback } from 'react';
import styles from './product-card.module.scss';
import { CloseIcon, QuickViewIcon, WishListIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import ProductVariantComponent from '../productVariant';
import AddToCartComponent from '../addToCart';
import { useDispatch } from 'react-redux';
import { setQuickViewPopup } from '@/redux/app/app.slice';
import ProductReviewComponent from '../productReview';

interface ProductCardComponentProps {
  style?: CSSProperties;
  product: ProductType;
  className?: string;
  removeWishListIcon?: boolean;
}
const cx = bindClassNames(styles);
const ProductCardComponent: React.FC<ProductCardComponentProps> = memo(
  ({ product, className, removeWishListIcon = false }) => {
    const dispatch = useDispatch();
    const handleQuicView = useCallback(() => {
      dispatch(
        setQuickViewPopup({
          product: product,
          isShowed: true
        })
      );
    }, []);
    return (
      <div className={cx('card', className)}>
        <div className={cx('card-product', 'rounded-[10px]')}>
          <div className={cx('card-media')}>
            <img className={cx('first-image')} src={product.images[0]} alt="" />
            <img className={cx('second-image')} src={product.images[1]} alt="" />
            <a href={product.link} className={cx('card-link', 'cursor-pointer')}></a>
          </div>
          <div className={cx('card-action')}>
            <AddToCartComponent handleSelectionOption={handleQuicView} product={product}></AddToCartComponent>
          </div>
          <div className={cx('card-group')}>
            <div className={cx('card__group-wishlist', 'cart__group-action', 'p-[10px]')}>
              {removeWishListIcon ? <CloseIcon className={cx('icon')} /> : <WishListIcon className={cx('icon')} />}
            </div>
            <div
              onClick={handleQuicView}
              className={cx('card__group-quickView', 'cart__group-action', 'mt-[10px] p-[10px]')}
            >
              <QuickViewIcon className={cx('icon')} />
            </div>
          </div>
          <div className={cx('card-badge')}>
            <div className={cx('sale-badge')}>
              <span className={cx('text')}>Sale</span>
            </div>
          </div>
        </div>
        <div className={cx('card-information', 'mt-[10px]')}>
          <div className={cx('card-vendor', 'text-center')}>
            <a href={product.link} title={product.vendor}>
              {product.vendor}
            </a>
          </div>
          <div className={cx('card-title', 'text-center')}>
            <a href={product.link}>{product.title}</a>
          </div>
          <div className={cx('card-review', 'text-center')}>
            <ProductReviewComponent product={product} />
          </div>
          <div className={cx('card-price', 'text-center')}>
            <span data-currency-value={product.price} className="money font-[600]">
              {product.price}
            </span>
          </div>
          {product.variants && (
            <div className={cx('card-variants', 'text-center')}>
              <ProductVariantComponent isCard={true} product={product} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default ProductCardComponent;
