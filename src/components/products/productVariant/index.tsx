import React, { memo, CSSProperties, useCallback, ChangeEvent, useId } from 'react';
import styles from './product-variant.module.scss';
import { ProductType, VariantType } from '@/types/product';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductVariantEnum } from '@/types/enum/products';
import { getParentsByClass } from '@/utils/helpers/$.parents';
import { groupedOptionsFc } from '@/utils/helpers/groupOptions';
import { Currency } from '@/utils/helpers/currenciesFormat';

interface ProductBlockProps {
  style?: CSSProperties;
  product: ProductType;
  className?: string;
  isCard?: boolean;
  isQuickView?: boolean;
  callback: (variantId: number, isAllVariantSelected: boolean, quantityInStock: number, canPurchase: boolean) => void;
}

const cx = bindClassNames(styles);

const ProductVariantComponent: React.FC<ProductBlockProps> = memo(
  ({ callback, product, className, isCard = false, isQuickView = false }) => {
    const uniqueId = useId();

    const handleChangingVariant = useCallback(
      (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const currentValue = getParentsByClass(target, 'product__form-input')?.querySelector('.current-value');
        if (currentValue) {
          currentValue.textContent = target.value;
        }
        const currentVariant = getCurrentVariant();
        if (currentVariant) {
          callback(
            parseInt(currentVariant.id as any),
            true,
            parseInt(currentVariant.stock as any),
            parseInt((document.querySelector('.product-quantity input') as HTMLInputElement)?.value) <=
              parseInt(currentVariant.stock as any)
          );
          const priceElements = isQuickView
            ? document.querySelector('.quickView-modal')?.querySelectorAll('.money')
            : document.querySelector('.productView_right-custom')?.querySelectorAll('.money');
          priceElements?.forEach((item) => {
            item.setAttribute('data-currency-value', currentVariant.price);
          });
        } else {
          callback(null as any, false, null as any, false);
        }
        Currency.initializeCurrency();
      },
      [product]
    );

    const groupedOptions = groupedOptionsFc([product]);

    const getCurrentVariant = (): VariantType | undefined => {
      const selector = isQuickView ? '.quickView-modal .product-variant' : '.product-page .product-variant';
      const inputsIsChecked = Array.from(document.querySelector(selector)?.querySelectorAll('input:checked') || []);

      if (inputsIsChecked.length) {
        const values = inputsIsChecked.map((input) => (input as HTMLInputElement).value);
        return product.variants?.find((variant) =>
          values.every((value) => variant.options.some((option) => option.value === value))
        );
      }
    };

    return (
      <>
        {groupedOptions &&
          Object.values(groupedOptions).map((option, index) => (
            <fieldset
              key={index}
              data-variant-type={option.type}
              className={cx('product__form-input', 'mt-[10px]', className, {
                hidden: option.type !== ProductVariantEnum.swatch && isCard
              })}
            >
              {!isCard && (
                <legend className={cx('form__label', 'font-[500]')}>
                  {option.name}: <span className={cx('current-value', 'font-[300]')}>{option.values[0].value}</span>
                </legend>
              )}
              <div className={cx('values', 'row flex gap-[10px]', { 'justify-center': isCard, 'mt-[10px]': !isCard })}>
                {option.values.map((optionValue, optionIndex) => {
                  const inputId = `${uniqueId}-option-${product.id}-${optionValue.id}`;
                  return (
                    <div className="field" key={optionIndex}>
                      <input
                        value={optionValue.value}
                        onChange={handleChangingVariant}
                        id={inputId}
                        data-variant-id={optionValue.id}
                        type="radio"
                        name={option.name}
                      />
                      <label
                        className={cx('product__form-label', { 'w-[30px]': isCard, 'h-[30px]': isCard })}
                        htmlFor={inputId}
                      >
                        <span
                          className={cx(option.type)}
                          style={{ '--variant-background': optionValue.value } as React.CSSProperties}
                        >
                          {option.type !== ProductVariantEnum.swatch && optionValue.value}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
      </>
    );
  }
);

export default ProductVariantComponent;
