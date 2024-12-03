import React, { memo } from 'react';
import styles from './freeShipping.module.scss';
import { TruckIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const FreeShippingComponent: React.FC = memo(({ total }) => {
  return (
    <div className={cx('wrapper')}>
      <div className="haloCalculatorShipping block w-[100%]">
        <div className="progress progress-60 h-[10px] w-[100%] rounded-[20px] bg-grey-bg">
          <div className={cx('progress-meter', 'bg-free-shipping-bg relative h-[100%] w-[52%] rounded-[20px]')}>
            <div className="progress-truck-wrapper absolute right-0 top-[-100%] w-[30px]">
              <TruckIcon />
            </div>
          </div>
        </div>
        <div className="message mt-[10px] font-[400] text-grey-color">
          <span>Only </span>
          <span className="money">$381.00</span>
          <span> away from </span>
          <span className="text">free shipping</span>
        </div>
      </div>
    </div>
  );
});

export default FreeShippingComponent;
