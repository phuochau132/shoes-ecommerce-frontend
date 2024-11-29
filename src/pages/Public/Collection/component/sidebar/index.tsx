import React, { memo, useEffect, useState } from 'react';
import styles from './sidebar.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import CollapsibleBlock from '@/components/commons/collapse';
import { CheckedIcon } from '@/utils/icons';
import { Product } from '@/types/product';
import './sidebar.scss';

const cx = bindClassNames(styles);

interface SidebarProps {
  products: Product[];
}
const SidebarComponent: React.FC<SidebarProps> = memo(({ products }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(10000);
  const priceGap = 1000;
  const colors = new Set<string>();
  const sizes = new Set<string>();

  products.forEach((product) => {
    product.variants?.forEach((variant) => {
      variant.values.forEach((option) => {
        if (variant.type === 'swatch') {
          colors.add(option.name);
        } else {
          sizes.add(option.name);
        }
      });
    });
  });

  // Convert sets to arrays if needed
  const colorArray = Array.from(colors);
  const sizeArray = Array.from(sizes);
  console.log('colors:', colorArray);
  console.log('sizes:', sizeArray);

  useEffect(() => {
    const progress = document.querySelector<HTMLDivElement>('.progress');

    if (!progress) {
      console.error('Progress bar element is missing in the DOM.');
      return;
    }

    const updateProgress = () => {
      const positionMin = (minVal / 10000) * 100;
      const positionMax = 100 - (maxVal / 10000) * 100;

      progress.style.left = `${positionMin}%`;
      progress.style.right = `${positionMax}%`;
    };

    updateProgress();
  }, [minVal, maxVal]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (e.target.classList.contains('range-min')) {
      if (value >= maxVal - priceGap) {
        setMinVal(maxVal - priceGap);
      } else {
        setMinVal(value);
      }
    } else {
      if (value <= minVal + priceGap) {
        setMaxVal(minVal + priceGap);
      } else {
        setMaxVal(value);
      }
    }
  };

  return (
    <div className={cx('sidebar-wrapper')}>
      <CollapsibleBlock title="Availability">
        <ul className={cx('filter-availability', 'mb-[30px]')}>
          <li className={cx('facets__item', 'mb-[10px]')}>
            <input id="filter-availability-1" type="radio" name="filter.availability" value="1" />
            <label htmlFor="filter-availability-1">
              <span className={cx('content-center', 'h-[20px] w-[20px] border')}>
                <CheckedIcon />
              </span>
              In Stock
            </label>
          </li>
          <li className={cx('facets__item')}>
            <input id="filter-availability-0" type="radio" name="filter.availability" value="0" />
            <label htmlFor="filter-availability-0">
              <span className={cx('content-center', 'h-[20px] w-[20px] border')}>
                <CheckedIcon />
              </span>
              Out Of Stock
            </label>
          </li>
        </ul>
      </CollapsibleBlock>
      <CollapsibleBlock title="Price">
        <div className={cx('filter-price', 'mb-[30px] gap-[10px]')}>
          <div className="filter_price-box flex items-center justify-between">
            <div className="field flex w-[45%] gap-[5px] rounded-[5px] border p-[5px]">
              <span className="opacity-[0.8]">$</span>
              <input
                type="number"
                className="w-[90%] opacity-[0.8]"
                value={minVal}
                onChange={(e) => setMinVal(Math.min(parseInt(e.target.value, 10), maxVal - priceGap))}
              />
            </div>
            <span className="text-[20px]">-</span>
            <div className="field flex w-[45%] gap-[5px] rounded-[5px] border p-[5px]">
              <span className="opacity-[0.8]">$</span>
              <input
                type="number"
                className="w-[90%] opacity-[0.8]"
                value={maxVal}
                onChange={(e) => setMaxVal(Math.max(parseInt(e.target.value, 10), minVal + priceGap))}
              />
            </div>
          </div>
          <div className="filter_price-slide group">
            <div className="progress"></div>
            <div className="range-input">
              <input className="range-min" max="10000" type="range" value={minVal} onChange={handleRangeChange} />
              <input className="range-max" max="10000" type="range" value={maxVal} onChange={handleRangeChange} />
            </div>
          </div>
        </div>
      </CollapsibleBlock>
      <CollapsibleBlock title="Color">
        <div className={cx('filter-color', 'mb-[30px] gap-[10px]')}></div>
      </CollapsibleBlock>
    </div>
  );
});

export default SidebarComponent;
