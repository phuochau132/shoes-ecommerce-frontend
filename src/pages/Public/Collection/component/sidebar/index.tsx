import React, { memo, useCallback, useEffect, useState } from 'react';
import styles from './sidebar.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import CollapsibleBlock from '@/components/commons/collapse';
import { CheckedIcon, CloseIcon } from '@/utils/icons';
import { ProductType } from '@/types/product';
import './sidebar.scss';
import { setFilterSidebarState } from '@/redux/slice/app/app.slice';
import { useDispatch } from 'react-redux';

const cx = bindClassNames(styles);

interface SidebarProps {
  products: ProductType[];
}

const PRICE_GAP = 1000;
const MAX_PRICE = 10000;

const SidebarComponent: React.FC<SidebarProps> = memo(({ products }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(MAX_PRICE);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const colorSet = new Set<string>();
    const sizeSet = new Set<string>();

    products.forEach((product) => {
      product.variants?.forEach((variant) => {
        variant.values.forEach((option) => {
          variant.type === 'swatch' ? colorSet.add(option.name) : sizeSet.add(option.name);
        });
      });
    });

    setSizes([...sizeSet]);
    setColors([...colorSet]);
  }, [products]);

  useEffect(() => {
    const progress = document.querySelector<HTMLDivElement>('.progress');
    if (!progress) return;

    progress.style.left = `${(minVal / MAX_PRICE) * 100}%`;
    progress.style.right = `${100 - (maxVal / MAX_PRICE) * 100}%`;
  }, [minVal, maxVal]);

  const handleRangeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (e.target.classList.contains('range-min')) {
        setMinVal(Math.min(value, maxVal - PRICE_GAP));
      } else {
        setMaxVal(Math.max(value, minVal + PRICE_GAP));
      }
    },
    [minVal, maxVal]
  );

  // render option
  const renderColorOptions = () =>
    colors.map((color, index) => (
      <li key={index} className={cx('field')}>
        <input hidden type="checkbox" id={`filter__color-${color}-${index}`} />
        <label
          htmlFor={`filter__color-${color}-${index}`}
          className={cx('inline-block h-[30px] w-[30px] cursor-pointer rounded-full border p-[2px]')}
          title={color}
        >
          <span style={{ background: color }} className="block h-full w-full rounded-full"></span>
        </label>
      </li>
    ));
  const renderSizeOptions = () =>
    sizes.map((size, index) => (
      <li key={index} className={cx('field')}>
        <input hidden type="checkbox" id={`filter__size-${size}-${index}`} />
        <label
          htmlFor={`filter__size-${size}-${index}`}
          className={cx('inline-block h-[30px] w-[30px] cursor-pointer border p-[2px]')}
          title={size}
        >
          <span className="flex h-full w-full items-center justify-center text-[12px]">{size}</span>
        </label>
      </li>
    ));
  return (
    <div className={cx('sidebar-wrapper')}>
      <div className={cx('sidebar-header', 'mb-[20px] hidden items-center justify-between phone:flex')}>
        <h3 className={cx('text-[18px] font-[900]')}>Filter</h3>
        <div
          onClick={() => {
            dispatch(setFilterSidebarState(false));
          }}
          className={cx('sidebar__header-close', 'mr-[-3px] cursor-pointer')}
        >
          <CloseIcon style={{ float: 'right' }} />
        </div>
      </div>
      <div className={cx('sidebar-filter')}>
        <CollapsibleBlock title="Availability">
          <ul className={cx('filter-availability', 'mb-[30px]')}>
            {['In Stock', 'Out Of Stock'].map((label, index) => (
              <li key={index} className={cx('facets__item', index === 0 ? 'mb-[10px]' : '')}>
                <input id={`filter-availability-${index}`} type="radio" name="filter.availability" value={index} />
                <label htmlFor={`filter-availability-${index}`}>
                  <span className={cx('content-center', 'h-[20px] w-[20px] border')}>
                    <CheckedIcon />
                  </span>
                  {label}
                </label>
              </li>
            ))}
          </ul>
        </CollapsibleBlock>
        <CollapsibleBlock title="Price">
          <div className={cx('filter-price', 'mb-[30px] gap-[10px]')}>
            <div className="filter_price-box flex items-center justify-between">
              {['minVal', 'maxVal'].map((type, index) => (
                <>
                  {index == 1 && <span>-</span>}
                  <div key={index} className="field flex w-[45%] gap-[5px] rounded-[5px] border p-[5px]">
                    <span className="opacity-[0.8]">$</span>
                    <input
                      type="number"
                      className="w-[90%] opacity-[0.8]"
                      value={type === 'minVal' ? minVal : maxVal}
                      onChange={(e) =>
                        type === 'minVal'
                          ? setMinVal(Math.min(parseInt(e.target.value, 10), maxVal - PRICE_GAP))
                          : setMaxVal(Math.max(parseInt(e.target.value, 10), minVal + PRICE_GAP))
                      }
                    />
                  </div>
                </>
              ))}
            </div>
            <div className="filter_price-slide group">
              <div className="progress"></div>
              <div className="range-input">
                <input className="range-min" type="range" max={MAX_PRICE} value={minVal} onChange={handleRangeChange} />
                <input className="range-max" type="range" max={MAX_PRICE} value={maxVal} onChange={handleRangeChange} />
              </div>
            </div>
          </div>
        </CollapsibleBlock>
        <CollapsibleBlock title="Color">
          <ul className={cx('filter-color', 'mb-[30px] flex gap-[10px]')}>{renderColorOptions()}</ul>
        </CollapsibleBlock>
        <CollapsibleBlock title="Size">
          <ul className={cx('filter-size', 'mb-[30px] flex gap-[10px]')}>{renderSizeOptions()}</ul>
        </CollapsibleBlock>
      </div>
    </div>
  );
});

export default SidebarComponent;
