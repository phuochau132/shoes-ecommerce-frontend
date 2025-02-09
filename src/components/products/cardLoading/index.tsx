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
        <div className={cx('card-media', 'skeleton-image')}>
          <a className={cx('card-link', 'cursor-pointer')}></a>
        </div>
        <div className={cx('card-action')}></div>
      </div>
      <div className={cx('card-information', 'mt-[10px]')}>
        <div className={cx('card-vendor', 'mt-[5px] text-center', 'skeleton-text')}></div>
        <div className={cx('card-title', 'mt-[5px] text-center', 'skeleton-text')}></div>
        <div className={cx('card-title', 'mt-[5px] text-center', 'skeleton-text')}></div>
        <div className={cx('card-price', 'mt-[5px] text-center', 'skeleton-text')}>
          <span className="money short font-[600]"></span>
        </div>
      </div>
    </div>
  );
});

export default ProductCardLoadingComponent;
