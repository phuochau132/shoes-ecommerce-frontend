import React, { memo, useEffect, useState } from 'react';
import styles from './freeShipping.module.scss';
import { TruckIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';
import { useSelector } from 'react-redux';
import { cartState } from '@/types/cart';

const cx = bindClassNames(styles);

const FreeShippingComponent: React.FC<{ freeShippingRange?: number }> = memo(({ freeShippingRange = 800 }) => {
  const { cart } = useSelector((state: cartState) => state.cart);
  const [freeShippingProgress, setFreeShippingProgress] = useState(0);

  useEffect(() => {
    if (cart) {
      setFreeShippingProgress(
        (cart.total_price / freeShippingRange) * 100 < 100 ? (cart.total_price / freeShippingRange) * 100 : 100
      );
    }
  }, [cart, freeShippingRange]);

  const getProgressClass = () => {
    if (freeShippingProgress <= 30) return 'progress-low';
    if (freeShippingProgress > 30 && freeShippingProgress < 80) return 'progress-medium';
    if (freeShippingProgress >= 80) return 'progress-high';
    return '';
  };
  const getProgressText = () => {
    if (freeShippingProgress < 100) {
      return (
        <>
          <span>Only </span>
          <span className="money">
            <span data-currency-value={freeShippingRange - cart.total_price} className={cx('money')}>
              {freeShippingRange - cart.total_price}
            </span>
          </span>
          <span> away from </span>
          <span className="text">free shipping</span>
        </>
      );
    }
    return <span>You qualify for free shipping!</span>;
  };

  return (
    <div className={cx('wrapper')}>
      {cart && (
        <div className="haloCalculatorShipping block w-[100%]">
          <div className="progress h-[10px] w-[100%] rounded-[20px] bg-grey-bg">
            <div
              className={cx('progress-meter', getProgressClass(), 'relative h-[100%] rounded-[20px]')}
              style={{ width: `${Math.min(freeShippingProgress, 100)}%` }}
            >
              <div className="progress-truck-wrapper absolute right-0 top-[-100%] w-[30px]">
                <TruckIcon />
              </div>
            </div>
          </div>
          <div className="message mt-[10px] font-normal text-grey-color">{getProgressText()}</div>
        </div>
      )}
    </div>
  );
});

export default FreeShippingComponent;
