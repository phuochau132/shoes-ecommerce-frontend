import styles from './cart.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LinkIcon, RemoveIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';
import QuantityBoxComponent from '@/components/products/quantity';
import { ButtonComponent, InputComponent } from '@/components/commons';
import ProductBlockComponent from '@/components/products/productBlock';
import FreeShippingComponent from '@/components/cart/freeshipping';
import { useDispatch } from 'react-redux';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import { useGetCartMutation, useRemoveItemMutation, useUpdateItemMutation } from '@/apis/cart/cart.api';
import { setCart } from '@/redux/slice/cart/cart.slice';
import { useSelector } from 'react-redux';
import { cartState } from '@/types/cart';
import { Currency } from '@/utils/helpers/currenciesFormat';
import TermAndConditionComponent from '@/components/cart/termAndConditionButton';
import LoaderComponent from '@/components/commons/loader';

const cx = bindClassNames(styles);

const CartPage = () => {
  const dispatch = useDispatch();
  const [removeItem] = useRemoveItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const { cart } = useSelector((state: cartState) => state.cart);
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const [getCart, { isLoading, isSuccess }] = useGetCartMutation();
  const noteElement = useRef(null);

  const getCartFc = async () => {
    try {
      const response = await getCart({}).unwrap();
      dispatch(setCart(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Cart' }
        ],
        title: 'Shopping Cart',
        description: 'Review your selected items before purchase. Enjoy a seamless shopping experience!'
      })
    );
    getCartFc();
  }, []);
  useEffect(() => {
    if (cart) {
      Currency.initializeCurrency();
    }
  }, [cart]);
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
    window.location.href = '/checkout';
  }, [noteElement]);
  return (
    <div className={cx('cart-page')}>
      {isLoading ? (
        <LoaderComponent />
      ) : cart && cart.items.length > 0 ? (
        <>
          <div className={cx('previewCart-free-shipping mb-[20px]')}>
            <FreeShippingComponent />
          </div>
          <div className={cx('cart-content', 'flex mobileTablet:flex-col')}>
            <div className={cx('cart_content-left', 'pr-[50px] mobileTablet:max-w-[100%] mobileTablet:pr-[0]')}>
              <table className={cx('cart__content-items', 'w-[100%] table-auto')}>
                <thead className={cx('cart-header')}>
                  <tr className={cx('bg-grey-bg')}>
                    <th className={cx('text-left', 'px-4', 'w-2/5')}>Product</th>
                    <th className={cx('text-left', 'px-4', 'w-1/5')}>Price</th>
                    <th className={cx('text-left', 'px-4', 'w-1/5')}>Quantity</th>
                    <th className={cx('text-left', 'px-4', 'w-1/5')}>Total</th>
                    <th className={cx('text-left', 'px-4', 'w-1/5')}>Action</th>
                  </tr>
                </thead>
                <tbody className={cx('cart-list')}>
                  {cart &&
                    cart.items.length > 0 &&
                    cart.items.map((cartItem) => {
                      return (
                        <tr className={cx('item')}>
                          <td className={cx('px-4', 'flex gap-[10px]')}>
                            <div className={cx('cart-item-image', 'w-[100%] max-w-[80px]')}>
                              <a
                                className={cx('relative block max-w-[80px] pb-[100%]')}
                                href={`/products/${cartItem.product.handle}`}
                              >
                                <div className={cx('linked-icon', 'z-[1] h-[20px] w-[20px]')}>
                                  <LinkIcon />
                                </div>
                                <img
                                  className={cx('absolute')}
                                  src={cartItem.product.images[0].url}
                                  alt="Error"
                                  loading="lazy"
                                />
                              </a>
                            </div>
                            <div className={cx('cart-item-info')}>
                              <h4 className={cx('cart-item-title', 'italic')}>
                                <a href={`/products/${cartItem.product.handle}`}>
                                  <span className={cx('main-color')}>{cartItem.product.title}</span>
                                </a>
                              </h4>
                              <div className={cx('cart-item-variant', 'text-[12px] text-grey-color')}>
                                {cartItem.product.variant &&
                                  cartItem.product.variant.option_values.map((item, index) => {
                                    return `${item.option_value.value}${index !== (cartItem.product.variant?.option_values?.length ?? 0) - 1 ? '/' : ''}`;
                                  })}
                              </div>
                              <div className={cx('cart-item-vendor', 'text-[12px] text-grey-color')}>
                                {cartItem.product.vendor}
                              </div>
                            </div>
                          </td>
                          <td className={cx('px-4')}>
                            <span data-currency-value={cartItem.price} className={cx('money')}>
                              {cartItem.price}
                            </span>
                          </td>
                          <td className={cx('px-4')}>
                            <div className={cx('form-action', 'mt-[10px]')}>
                              <QuantityBoxComponent cartItem={cartItem} handleUpdateItem={handleUpdateItem} />
                            </div>
                          </td>
                          <td className={cx('px-4')}>
                            <span data-currency-value={cartItem.price * cartItem.quantity} className={cx('money')}>
                              {cartItem.price}
                            </span>
                          </td>
                          <td className={cx('px-4')}>
                            <button
                              onClick={() => {
                                handleRemoveItem(cartItem.id);
                              }}
                              className={cx(
                                'product__action-edit',
                                'mt-[5px] block cursor-pointer p-[5px] text-[12px]'
                              )}
                            >
                              <RemoveIcon />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div
              className={cx(
                'cart_content-right',
                'h-[max-content] flex-1 rounded-[10px] bg-grey-bg p-[10px] mobileTablet:mt-[20px]'
              )}
            >
              <div className={cx('cart-total')}>
                <div className={cx('cart__totals-title', 'text-[20px] font-[800] text-[#232323] after:bg-[#232323]')}>
                  Order Summary
                </div>
                <div className={cx('sub-total', 'mt-[50px] flex justify-between')}>
                  <span className={cx('font-label')}>Subtotal:</span>
                  <div className={cx('sub__total-label')}></div>
                  <div className={cx('sub__total-value', 'font-bold text-red-color')}>
                    <span data-currency-value={cart.total_price} className={cx('money')}>
                      {cart.total_price}
                    </span>
                  </div>
                </div>
                <div className={cx('comment', 'mt-[20px]')}>
                  <label className={cx('comment-label')}>
                    <span className={cx('font-label')}>Add Order Note:</span>
                  </label>
                  <div className={cx('comment-value', 'mt-[10px]')}>
                    <textarea
                      ref={noteElement}
                      className="min-h-[12rem] w-full rounded-[10px] border p-[10px] outline-none"
                      name="note"
                      form="cart"
                      id="Cart-note"
                      placeholder="Add Order Note"
                      data-listener-added_e50af269="true"
                    ></textarea>
                  </div>
                </div>
                <div className={cx('total', 'mt-[20px] flex justify-between')}>
                  <span className={cx('font-label')}>Subtotal:</span>
                  <div className={cx('total-label')}></div>
                  <div className={cx('total-value', 'font-bold text-red-color')}>
                    <span data-currency-value={cart.total_price} className={cx('money')}>
                      {cart.total_price}
                    </span>
                  </div>
                </div>
                <div className={cx('action', 'mt-[20px]')}>
                  <TermAndConditionComponent
                    callback={(state) => {
                      setIsTermsChecked(state);
                    }}
                  />
                  <ButtonComponent className="mt-[10px]" disabled={!isTermsChecked} onClick={handleAddOrderNote}>
                    Checkout
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('productView__right-item', 'related-product')}>
            <ProductBlockComponent viewAllButton={false} title="Relate Product" collectionHandle="new-in" />
          </div>
        </>
      ) : (
        <>
          {isSuccess && (
            <div>
              <p className="text-center text-[30px] font-bold text-red-color">Your Cart is empty!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
