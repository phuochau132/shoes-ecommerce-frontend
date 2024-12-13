import React, { memo, CSSProperties } from 'react';
import styles from './product-variant.module.scss';
import { ProductType, VariantType } from '@/types/product';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductVariantEnum } from '@/types/enum/products';

interface ProductBlockProps {
  style?: CSSProperties;
  product: ProductType;
  className?: string;
  isCard?: boolean;
}

const cx = bindClassNames(styles);

const ProductVariantComponent: React.FC<ProductBlockProps> = memo(({ product, className, isCard = false }) => {
  return (
    <>
      {product.variants?.map((variant, index) => {
        return (
          <fieldset
            key={index}
            data-variant-type={variant.type}
            className={cx('product__form-input', 'mt-[10px]', className, {
              hidden: variant.type != ProductVariantEnum.swatch && isCard
            })}
          >
            {!isCard && (
              <legend className={cx('form__label', 'font-[500]')}>
                {variant.name}: <span className={cx('current-value', 'font-[300]')}>{variant.values[0].name}</span>
              </legend>
            )}
            <div className={cx('values', 'row flex gap-[10px]', { 'justify-center': isCard, 'mt-[10px]': !isCard })}>
              {variant.values.map((option, optionIndex) => {
                return (
                  <div key={optionIndex}>
                    <input
                      id={`option-${product.id}-${variant.name}-${option.id}`}
                      data-variant-id={variant.id}
                      type="radio"
                      name={variant.name}
                    />
                    <label
                      className={cx('product__form-label', { 'w-[30px]': isCard, 'h-[30px]': isCard })}
                      htmlFor={`option-${product.id}-${variant.name}-${option.id}`}
                    >
                      <span
                        className={cx(variant.type)}
                        style={{ '--variant-background': option.name } as React.CSSProperties}
                      >
                        {variant.type == 'Rectangle' && option.name}
                      </span>
                    </label>
                  </div>
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
