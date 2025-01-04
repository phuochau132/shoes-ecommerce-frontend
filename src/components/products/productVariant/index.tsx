import React, { memo, CSSProperties, useCallback, ChangeEvent } from 'react';
import styles from './product-variant.module.scss';
import { ProductType, VariantType } from '@/types/product';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductVariantEnum } from '@/types/enum/products';
import { getParentsByClass } from '@/utils/helpers/$.parents';

interface ProductBlockProps {
  style?: CSSProperties;
  product: ProductType;
  className?: string;
  isCard?: boolean;
}

const cx = bindClassNames(styles);

const ProductVariantComponent: React.FC<ProductBlockProps> = memo(({ product, className, isCard = false }) => {
  const handleChangingVariant = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLElement;
    const parent = getParentsByClass(target, 'form-AddToCart');
    if (parent) {
      const btn_addToCart = parent.querySelector('button[data-btn-addToCart]');
    }
  }, []);
  const groupedOptions: Record<string, { name: string; values: Record<string, any>[]; type: string }> = {};
  product.variants?.forEach((variant) => {
    variant.options?.forEach((optionsValue) => {
      const optionName = optionsValue.option.name;
      const optionValue = optionsValue.value;
      const valueId = optionsValue.id;
      if (!groupedOptions[optionName]) {
        groupedOptions[optionName] = { name: optionName, values: [], type: optionsValue.option.type };
      }
      groupedOptions[optionName].values.push({
        id: valueId,
        value: optionValue
      });
    });
  });

  return (
    <>
      {groupedOptions &&
        Object.values(groupedOptions)?.map((option, index) => {
          return (
            <fieldset
              key={index}
              data-variant-type={option.type}
              className={cx('product__form-input', 'mt-[10px]', className, {
                hidden: option.type != ProductVariantEnum.swatch && isCard
              })}
            >
              {!isCard && (
                <legend className={cx('form__label', 'font-[500]')}>
                  {option.name}: <span className={cx('current-value', 'font-[300]')}>{option.values[0].value}</span>
                </legend>
              )}
              <div className={cx('values', 'row flex gap-[10px]', { 'justify-center': isCard, 'mt-[10px]': !isCard })}>
                {option.values.map((optionValue, optionIndex) => {
                  return (
                    <div key={optionIndex}>
                      <input
                        onChange={(e) => handleChangingVariant(e)}
                        id={`option-${product.id}-${optionValue.id}`}
                        data-variant-id={optionValue}
                        type="radio"
                        name={option.name}
                      />
                      <label
                        className={cx('product__form-label', { 'w-[30px]': isCard, 'h-[30px]': isCard })}
                        htmlFor={`option-${product.id}-${optionValue.id}`}
                      >
                        <span
                          className={cx(option.type)}
                          style={{ '--variant-background': optionValue.value } as React.CSSProperties}
                        >
                          {option.type != ProductVariantEnum.swatch && optionValue.value}
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
