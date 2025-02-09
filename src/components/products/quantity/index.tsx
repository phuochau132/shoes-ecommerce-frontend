import React, { memo, CSSProperties, useRef, useState } from 'react';
import styles from './quantity.module.scss';
import { MinusIcon, PlusIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';
import { CartItemType } from '@/types/cart';

interface QuantityBoxComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties;
  callback?: (quantity: number) => void;
  cartItem?: CartItemType;
  handleUpdateItem?: ({ id, newQuantity, itemId }: { id: number; newQuantity: number; itemId: string }) => void;
}

const cx = bindClassNames(styles);

const QuantityBoxComponent: React.FC<QuantityBoxComponentProps> = memo(
  ({ callback, onChange, cartItem, handleUpdateItem }) => {
    const quantityInputRef = useRef<HTMLInputElement>(null);
    const [hideIncrementButton, setHideIncrementButton] = useState(false);
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
      if (cartItem) {
        if (cartItem.product.variant) {
          if (newQuantity >= cartItem.product.variant.stock) {
            setHideIncrementButton(true);
          } else {
            setHideIncrementButton(false);
          }
        } else {
          if (newQuantity >= cartItem.product.quantity) {
            setHideIncrementButton(true);
          } else {
            setHideIncrementButton(false);
          }
        }
      }
      input.value = newQuantity.toString();
      if (callback) {
        callback(newQuantity);
      }
      if (handleUpdateItem && cartItem) {
        handleUpdateItem({
          id: cartItem?.id,
          newQuantity: newQuantity,
          itemId: cartItem.id as any
        });
      }
    };

    return (
      <div className={cx('quantity-box')}>
        <button className={cx('minus', 'quantity-action')} onClick={() => updateQuantity('decrement')}>
          <MinusIcon />
        </button>
        <input
          disabled={!!handleUpdateItem}
          value={handleUpdateItem && cartItem?.quantity}
          onChange={onChange}
          ref={quantityInputRef}
          defaultValue="1"
          type="number"
          className={cx('quantity-input', 'border-none text-center')}
          pattern="[0-9]*"
        />
        <button
          disabled={hideIncrementButton}
          className={cx('plus', 'quantity-action')}
          onClick={() => updateQuantity('increment')}
        >
          <PlusIcon />
        </button>
      </div>
    );
  }
);

export default QuantityBoxComponent;
