import React, { memo, CSSProperties } from 'react';
import styles from './product-variant.module.scss';
import { Variant } from '@/types/product';
import { bindClassNames } from '@/utils/helpers/cx';

interface ProductBlockProps {
  style?: CSSProperties;
  variants?: Variant[];
}

const cx = bindClassNames(styles);

const ProductVariantComponent: React.FC<ProductBlockProps> = memo(({ variants = [] }) => {
  return (
    <>
      {variants.map((variant) => {
        return (
          <fieldset className={cx('product__form-input', 'mt-[10px]')}>
            <legend className={cx('form__label', 'font-[500]')}>
              {variant.name}: <span className={cx('current-value', 'font-[300]')}>{variant.values[0].name}</span>
            </legend>

            <div className={cx('values')}>
              {variant.values.map((option) => {
                return (
                  <>
                    <input
                      id={`option-${variant.name}-${option.id}`}
                      data-variant-id={variant.id}
                      type="radio"
                      name={variant.name}
                    />
                    <label
                      data-variant-type={variant.type}
                      className={cx('product__form-label')}
                      htmlFor={`option-${variant.name}-${option.id}`}
                    >
                      <span
                        className={cx(variant.type)}
                        style={{ '--variant-background': option.name } as React.CSSProperties}
                      >
                        {variant.type == 'Rectangle' && option.name}
                      </span>
                    </label>
                  </>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </>
  );
});

export default ProductVariantComponent;
