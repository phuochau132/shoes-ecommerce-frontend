import React, { memo } from 'react';
import styles from '../card/product-card.module.scss';
import { QuickViewIcon, WishListIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';
import LoaderComponent from '@/components/commons/loader';

const cx = bindClassNames(styles);
const ProductCardLoadingComponent: React.FC<{ className?: string }> = memo(({ className }) => {
  return (
    <div className={cx('card', className)}>
      <div className={cx('card-product', 'rounded-[10px]')}>
        <div className={cx('card-media')}>
          <LoaderComponent />
          <a className={cx('card-link', 'cursor-pointer')}></a>
        </div>
        <div className={cx('card-action')}></div>
        <div className={cx('card-group')}>
          <div className={cx('card__group-wishlist', 'cart__group-action', 'relative p-[10px]')}>
            <WishListIcon className={`${cx('icon')} fade-in-up`} />
          </div>
          <div className={cx('card__group-quickView', 'cart__group-action', 'mt-[10px] p-[10px]')}>
            <QuickViewIcon className={`${cx('icon')} fade-in-up`} />
          </div>
        </div>
      </div>
      <div className={cx('card-information', 'mt-[10px]')}>
        <div className={cx('card-vendor', 'text-center')}>
          <a>test</a>
        </div>
        <div className={cx('card-title', 'text-center')}>
          <a>test</a>
        </div>
        <div className={cx('card-review', 'text-center')}></div>
        <div className={cx('card-price', 'text-center')}>
          <span className="money font-[600]">test</span>
        </div>
      </div>
    </div>
  );
});

export default ProductCardLoadingComponent;
