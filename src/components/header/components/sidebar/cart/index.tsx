// AnnouncementBar.tsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './cart.module.scss';
import './cart.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarLayout from '../layout';
import { useDispatch } from 'react-redux';
import { setCartSidebarState } from '@/redux/slice/app/app.slice';
import FreeShippingComponent from '@/components/cart/freeshipping';
import { GiftIcon, LinkIcon, NoteIcon, RemoveIcon } from '@/utils/icons';
import QuantityBoxComponent from '@/components/products/quantity';
import { ButtonComponent } from '@/components/commons';
import TermAndConditionComponent from '@/components/cart/termAndConditionButton';
import { useSelector } from 'react-redux';
import { cartState } from '@/types/cart';
import { Currency } from '@/utils/helpers/currenciesFormat';
import { useGetCartMutation, useRemoveItemMutation, useUpdateItemMutation } from '@/apis/cart/cart.api';
import { setCart } from '@/redux/slice/cart/cart.slice';
import LoaderComponent from '@/components/commons/loader';

const cx = bindClassNames(styles);

const CartSidebar: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const { cart } = useSelector((state: cartState) => state.cart);
  const [removeItem, { isLoading: removingIsLoading }] = useRemoveItemMutation();
  const [updateItem, { isLoading: updatingIsLoading }] = useUpdateItemMutation();

  const noteElement = useRef(null);
  const [getCart, { isLoading: isGetCartLoading }] = useGetCartMutation();
  const handleClickAddon = useCallback((className: string) => {
    if (wrapper.current) {
      wrapper.current.classList.add(className);
    }
  }, []);
  useEffect(() => {
    Currency.initializeCurrency();
  }, [cart]);
  useEffect(() => {
    handleSidebarOpening();
  }, []);
  const handleClickCancel = useCallback(() => {
    if (wrapper.current) {
      wrapper.current.classList.remove('note-activation');
      wrapper.current.classList.remove('giftWrap-activation');
    }
  }, []);
  const handleRemoveItem = useCallback(
    async (id: number) => {
      try {
        const response = await removeItem({ id: id }).unwrap();
        dispatch(setCart(response.data));
      } catch (error) {
        console.error(error);
      }
    },
    [cart]
  );
  const handleUpdateItem = useCallback(
    async ({ id, newQuantity, itemId }: { id: number; newQuantity: number; itemId: string }) => {
      try {
        const response = await updateItem({ id: id, quantity: newQuantity, itemId: itemId as any }).unwrap();
        dispatch(setCart(response.data));
      } catch (error) {
        console.error(error);
      }
    },
    [cart]
  );
  const handleAddOrderNote = useCallback(() => {
    const target = noteElement.current;
    if (!target) {
      return;
    }
    // @ts-ignore
    const value = target.value;
    if (value) {
      localStorage.setItem('order-note', value);
    }
  }, [noteElement]);
  const handleSidebarOpening = async () => {
    try {
      const response = await getCart({}).unwrap();
      dispatch(setCart(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SidebarLayout
      className="!max-w-[500px]"
      callback={() => {
        dispatch(setCartSidebarState(false));
      }}
      title={`Shopping Cart (${cart && cart.items.length})`}
    >
      {isGetCartLoading && <LoaderComponent />}
      {updatingIsLoading && <LoaderComponent />}
      {removingIsLoading && <LoaderComponent />}
      {cart && cart.items.length > 0 ? (
        <div ref={wrapper} className="previewCart-wrapper h-[100%]">
          <div className={cx('previewCart-free-shipping')}>
            <FreeShippingComponent />
          </div>
          <div className={cx('previewCart-items', 'relative mt-[10px] max-h-[39%] overflow-y-auto')}>
            {cart.items.map((cartItem) => {
              return (
                <div className={cx('item', 'relative my-[20px] flex gap-[10px]')}>
                  <div className={cx('product-image', 'w-[100%] max-w-[64px]')}>
                    <a className={cx('relative block pb-[100%]')} href={`/products/${cartItem.product.handle}`}>
                      <div className={cx('linked-icon', 'z-[1] h-[20px] w-[20px]')}>
                        <LinkIcon />
                      </div>
                      <img className={cx('absolute')} src={cartItem.product.images[0].url} alt="Error" loading="lazy" />
                    </a>
                  </div>
                  <div className={cx('product-info')}>
                    <h4 className={cx('product-title', 'italic')}>
                      <a href={`/products/${cartItem.product.handle}`}>
                        <span className={cx('main-color')}>{cartItem.product.title}</span>
                      </a>
                    </h4>
                    <div className={cx('product-variant', 'text-[12px] text-grey-color')}>
                      {cartItem.product.variant &&
                        cartItem.product.variant.option_values.map((item, index) => {
                          return `${item.option_value.value}${index !== (cartItem.product.variant?.option_values?.length ?? 0) - 1 ? '/' : ''}`;
                        })}
                    </div>
                    <div className={cx('product-price', 'text-[12px]')}>
                      <span data-currency-value={cartItem.price} className={cx('money')}>
                        {cartItem.price}
                      </span>
                    </div>
                    <div className={cx('product-quantity', 'mt-[10px] text-[12px]')}>
                      <QuantityBoxComponent handleUpdateItem={handleUpdateItem} cartItem={cartItem} />
                    </div>
                  </div>
                  <div className={cx('product-action', 'absolute bottom-[10%] right-[0] mt-[5px] text-[12px]')}>
                    <button
                      onClick={() => {
                        handleRemoveItem(cartItem.id);
                      }}
                      className={cx('product__action-edit', 'mt-[5px] block cursor-pointer p-[5px] text-[12px]')}
                    >
                      <RemoveIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-[0] left-[0] right-[0] bg-[white] px-[24px] pb-[25px]">
            <div className={cx('previewCart-addons', 'flex min-h-[50px] items-center justify-center gap-[10px]')}>
              <div className="cart-note">
                <button
                  onClick={() => {
                    handleClickAddon('note-activation');
                  }}
                >
                  <NoteIcon />
                </button>
              </div>
              <div className={cx('cart-gift')}>
                <button
                  onClick={() => {
                    handleClickAddon('giftWrap-activation');
                  }}
                >
                  <GiftIcon />
                </button>
              </div>
            </div>
            <div className={cx('previewCart-info')}>
              <div className={cx('subtotal', 'my-[10px] flex justify-between')}>
                <div className={cx('subtotal-label', 'font-label')}>SUBTOTAL:</div>
                <div className={cx('subtotal-value', 'font-bold text-red-color')}>
                  <span data-currency-value={cart.total_price} className={cx('money')}>
                    {cart.total_price}
                  </span>
                </div>
              </div>
              <div className={cx('total', 'my-[10px] flex justify-between')}>
                <div className={cx('total-label', 'font-label')}>TOTAL:</div>
                <div className={cx('total-value', 'font-bold text-red-color')}>
                  <span data-currency-value={cart.total_price} className={cx('money')}>
                    {cart.total_price}
                  </span>
                </div>
              </div>
              <TermAndConditionComponent
                callback={(state) => {
                  setIsTermsChecked(state);
                }}
              />
              <ButtonComponent
                disabled={!isTermsChecked}
                aria-disabled={isTermsChecked}
                className={`rounded-[5px] bg-white text-black ${!isTermsChecked ? 'pointer-events-none cursor-not-allowed opacity-50' : 'pointer-events-auto'}`}
                as="a"
                link="/checkout"
              >
                Checkout
              </ButtonComponent>
              <ButtonComponent className="rounded-[5px]" as="a" link="/cart">
                View Cart
              </ButtonComponent>
            </div>
          </div>
          <div className={cx('note-popup', 'absolute bottom-[0] left-[0] right-[0] z-[2] bg-grey-bg p-[30px]')}>
            <div className={cx('note__popup-label', 'flex items-center gap-[5px] font-bold')}>
              <NoteIcon />
              <label className="text-[15px] font-bold phone:text-[14px]" htmlFor="Cart-note">
                Add Order Note
              </label>
            </div>
            <textarea
              ref={noteElement}
              className="mt-[10px] min-h-[12rem] w-full rounded-[10px] border p-[10px] outline-none"
              name="note"
              form="cart"
              id="Cart-note"
              placeholder="How can we help you?"
              data-listener-added_e50af269="true"
            ></textarea>
            <ButtonComponent onClick={handleAddOrderNote}>Save</ButtonComponent>
            <ButtonComponent
              onClick={() => {
                handleClickCancel();
              }}
              className="bg-[white] text-[black]"
            >
              Cancel
            </ButtonComponent>
          </div>
          <div className={cx('giftWrap-popup', 'absolute bottom-[0] left-[0] right-[0] z-[2] bg-grey-bg p-[30px]')}>
            <div className={cx('giftWrap__popup-icon', 'flex justify-center gap-[5px] font-bold')}>
              <GiftIcon className="h-[30px] w-[30px]" />
            </div>
            <div className="text-[15px] font-bold phone:text-[14px]">
              <p className="text-center">Please wrap the product carefully. Fee is only</p>
              <p className="text-center"> $10.00. (You can choose or not)</p>
            </div>
            <ButtonComponent>Add A Gift Wrap</ButtonComponent>
            <ButtonComponent
              onClick={() => {
                handleClickCancel();
              }}
              className="bg-[white] text-[black]"
            >
              Cancel
            </ButtonComponent>
          </div>
        </div>
      ) : (
        <div>
          <p className="mt-[50%] text-center text-[30px] font-bold text-red-color">Your Cart is empty!</p>
        </div>
      )}
    </SidebarLayout>
  );
});

export default CartSidebar;
