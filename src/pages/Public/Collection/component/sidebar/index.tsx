import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './sidebar.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import CollapsibleBlock from '@/components/commons/collapse';
import { CheckedIcon, CloseIcon } from '@/utils/icons';
import { FormatVariantsType, ProductType } from '@/types/product';
import './sidebar.scss';
import { setFilterSidebarState } from '@/redux/slice/app/app.slice';
import { useDispatch } from 'react-redux';
import { groupedOptionsFc } from '@/utils/helpers/groupOptions';
import { ProductVariantEnum } from '@/types/enum/products';

const cx = bindClassNames(styles);

interface SidebarProps {
  products: ProductType[];
  callback: () => Promise<void>;
}
const PRICE_GAP = 5;
const MAX_PRICE = 10000;

const SidebarComponent: React.FC<SidebarProps> = memo(({ products, callback }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(MAX_PRICE);
  const [maxPrice, setMaxPrice] = useState(0);
  const [variants, setVariants] = useState<FormatVariantsType>();
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timeout ID

  const getMinMaxPrice = useCallback((products: ProductType[]) => {
    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxPrice = 0;
    products.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant) => {
          if (parseFloat(variant.price) > maxPrice) {
            maxPrice = parseFloat(variant.price);
          }
          if (parseFloat(variant.price) < minPrice) {
            minPrice = parseFloat(variant.price);
          }
        });
      } else {
        if (parseFloat(product.price) > maxPrice) {
          maxPrice = parseFloat(product.price);
        }
        if (parseFloat(product.price) < minPrice) {
          minPrice = parseFloat(product.price);
        }
      }
    });
    return {
      minPrice,
      maxPrice
    };
  }, []);

  useEffect(() => {
    if (products) {
      const groupedOptions = groupedOptionsFc(products);
      setVariants(groupedOptions);
      const { minPrice, maxPrice } = getMinMaxPrice(products);
      setMaxPrice(maxPrice);
      setMinVal(minPrice);
      setMaxVal(maxPrice);
    }
  }, []);

  useEffect(() => {
    const progress = document.querySelector<HTMLDivElement>('.progress');
    if (!progress) return;

    const normalizedMin = minVal - 20;
    const normalizedMax = maxVal - 20;
    const normalizedMaxPrice = maxPrice - 20;

    const left = (normalizedMin / normalizedMaxPrice) * 100;
    const right = 100 - (normalizedMax / normalizedMaxPrice) * 100;

    progress.style.left = `${left}%`;
    progress.style.right = `${right}%`;
  }, [minVal, maxVal, maxPrice]);

  const handleRangeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (e.target.classList.contains('range-min')) {
        setMinVal(Math.min(value, maxVal - PRICE_GAP));
      } else {
        setMaxVal(Math.max(value, minVal + PRICE_GAP));
      }
    },
    [minVal, maxVal, maxPrice]
  );

  const handleFilter = useCallback(async () => {
    await callback();
  }, [callback]);

  const debouncedHandleFilter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleFilter();
    }, 500);
  }, [handleFilter]);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      if (e.target.type === 'range') {
        debouncedHandleFilter();
        return;
      }
      callback();
    },
    [debouncedHandleFilter]
  );

  // render option
  const renderVariantFilter = () => {
    if (variants) {
      return (
        <>
          {Object.values(variants).map((variant) => (
            <CollapsibleBlock key={variant.name} title={variant.name}>
              <ul className={cx(`filter-${variant.name}`, 'mb-[30px] flex gap-[10px]')}>
                {variant.values.map((value, indexValue) => {
                  if (variant.type == ProductVariantEnum.swatch) {
                    return (
                      <li key={indexValue} className={cx('field')}>
                        <input
                          value={value.value}
                          name={`filter.option.${variant.name}`}
                          hidden
                          type="checkbox"
                          id={`filter__${variant.name}-${value.value}-${indexValue}`}
                        />
                        <label
                          htmlFor={`filter__${variant.name}-${value.value}-${indexValue}`}
                          className={cx('inline-block h-[30px] w-[30px] cursor-pointer rounded-full border p-[2px]')}
                          title={value.value}
                        >
                          <span style={{ background: value.value }} className="block h-full w-full rounded-full"></span>
                        </label>
                      </li>
                    );
                  }
                  return (
                    <li key={indexValue} className={cx('field')}>
                      <input
                        name={`filter.option.${variant.name}`}
                        hidden
                        value={value.value}
                        type="checkbox"
                        id={`filter__${variant.name}-${value.value}-${indexValue}`}
                      />
                      <label
                        htmlFor={`filter__${variant.name}-${value.value}-${indexValue}`}
                        className={cx('inline-block h-[30px] w-[30px] cursor-pointer border p-[2px]')}
                        title={value.value}
                      >
                        <span className="flex h-full w-full items-center justify-center text-[12px]">
                          {value.value}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleBlock>
          ))}
        </>
      );
    }
  };

  return (
    <form onChange={handleFormChange} className={cx('sidebar-wrapper')}>
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
                <input
                  id={`filter-availability-${index}`}
                  type="radio"
                  name="filter.availability"
                  value={index == 0 ? '1' : 0}
                />
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
                      name={`filter.price.${type}`}
                      type="number"
                      className="w-[90%] opacity-[0.8]"
                      value={type === 'minVal' ? minVal : maxVal}
                      onChange={(e) =>
                        type === 'minVal'
                          ? setMinVal(Math.min(parseInt(e.target.value, 10)))
                          : setMaxVal(Math.max(parseInt(e.target.value, 10)))
                      }
                    />
                  </div>
                </>
              ))}
            </div>
            <div className="filter_price-slide group">
              <div className="progress"></div>
              <div className="range-input">
                <input
                  className="range-min"
                  type="range"
                  min="20"
                  max={maxPrice}
                  value={minVal}
                  onChange={handleRangeChange}
                />
                <input
                  className="range-max"
                  type="range"
                  min="20"
                  max={maxPrice}
                  value={maxVal}
                  onChange={handleRangeChange}
                />
              </div>
            </div>
          </div>
        </CollapsibleBlock>
        {renderVariantFilter()}
      </div>
    </form>
  );
});

export default SidebarComponent;
