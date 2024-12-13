import React, { memo, CSSProperties, useRef } from 'react';
import styles from './quantity.module.scss';
import { MinusIcon, PlusIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';

interface QuantityBoxComponentProps {
  style?: CSSProperties;
}

const cx = bindClassNames(styles);

const QuantityBoxComponent: React.FC<QuantityBoxComponentProps> = memo(() => {
  const quantityInputRef = useRef<HTMLInputElement>(null);

  const updateQuantity = (type: 'increment' | 'decrement') => {
    if (!quantityInputRef.current) return;

    const input = quantityInputRef.current;
    let currentQuantity = parseInt(input.value) || 1;
    let newQuantity = currentQuantity;

    if (type === 'increment') {
      newQuantity += 1;
    } else {
      newQuantity -= 1;
    }

    if (newQuantity < 1) return;

    input.value = newQuantity.toString();
  };

  return (
    <div className={cx('quantity-box')}>
      <button className={cx('minus', 'quantity-action')} onClick={() => updateQuantity('decrement')}>
        <MinusIcon />
      </button>
      <input
        ref={quantityInputRef}
        data-inventory="100"
        defaultValue="1"
        type="number"
        className={cx('quantity-input', 'border-none text-center')}
        pattern="[0-9]*"
      />
      <button className={cx('plus', 'quantity-action')} onClick={() => updateQuantity('increment')}>
        <PlusIcon />
      </button>
    </div>
  );
});

export default QuantityBoxComponent;
