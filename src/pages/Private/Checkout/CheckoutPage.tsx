import styles from './checkout.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import { ButtonComponent, InputComponent } from '@/components/commons';
import { LinkIcon, PaypalIcon, ShippingIcon } from '@/utils/icons';
import { cartState } from '@/types/cart';
import { useSelector } from 'react-redux';
import { setCart } from '@/redux/slice/cart/cart.slice';
import { useGetCartMutation } from '@/apis/cart/cart.api';
import { Currency } from '@/utils/helpers/CurrenciesFormat';

const cx = bindClassNames(styles);

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: cartState) => state.cart);
  const [getCart, { isLoading }] = useGetCartMutation();
  const getCartFc = async () => {
    try {
      const response = await getCart({}).unwrap();
      dispatch(setCart(response.data));
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Checkout' }
        ],
        title: 'Checkout Page'
      })
    );
    getCartFc();
  }, []);
  useEffect(() => {
    if (cart) {
      Currency.initializeCurrency();
    }
  }, [cart]);
  return (
    <div className={cx('container mx-[auto]', 'checkout-page')}>
      {cart && cart.items.length > 0 && (
        <div className={cx('page-content', 'flex gap-[50px]')}>
          <div className={cx('page-left', 'w-full phoneUp:max-w-[50%]')}>
            <div className={cx('delivery-section')}>
              <div className={cx('heading')}>
                <h2>Delivery</h2>
              </div>
              <div className={cx('fields')}>
                <div className={cx('field', 'country')}>
                  <InputComponent className={cx('rounded-[10px] p-[10px]')} placeholder="Country/Region" />
                </div>
                <div className={cx('flex')}>
                  <div className={cx('field', 'city', 'w-full max-w-[50%]')}>
                    <InputComponent className={cx('rounded-[10px] p-[10px]')} placeholder="Postal code" />
                  </div>
                  <div className={cx('field', 'postal-code', 'w-full max-w-[50%] pl-[10px]')}>
                    <InputComponent className={cx('rounded-[10px] p-[10px]')} placeholder="City" />
                  </div>
                </div>
                <div className={cx('field', 'detail-address')}>
                  <InputComponent className={cx('rounded-[10px] p-[10px]')} placeholder="Detail Address" />
                </div>
              </div>
            </div>
            <div className={cx('payment-section')}>
              <div className={cx('heading')}>
                <h2>Payment Method</h2>
              </div>
              <label htmlFor="ship-option" className={cx('option')}>
                <div>
                  <input checked id="ship-option" name="payment-method" type="radio" />
                  <span>Ship</span>
                </div>
                <div className={cx('icon')}>
                  <ShippingIcon className="w-[full]" />
                </div>
              </label>
              <label htmlFor="paypal-option" className={cx('option')}>
                <div>
                  <input id="paypal-option" name="payment-method" type="radio" />
                  <span>Paypal</span>
                </div>
                <div className={cx('icon')}>
                  <PaypalIcon className="w-[full]" />
                </div>
              </label>
              <div className={cx('payment-button')}>
                <ButtonComponent>Pay now</ButtonComponent>
              </div>
            </div>
          </div>
          <div className={cx('page-right', 'w-full rounded-[5px] bg-grey-bg px-[20px] pb-[20px] phoneUp:max-w-[50%]')}>
            <div className={cx('items')}>
              {cart.items.map((cartItem) => {
                return (
                  <div className={cx('item', 'relative my-[20px] flex gap-[10px]')}>
                    <div className={cx('product-image', 'w-[100%] max-w-[55px] rounded-[5px] border')}>
                      <a className={cx('relative block pb-[100%]')} href={`/products/${cartItem.product.handle}`}>
                        <div className={cx('linked-icon', 'z-[1] h-[20px] w-[20px]')}>
                          <LinkIcon />
                        </div>
                        <img
                          className={cx('absolute')}
                          src={cartItem.product.images[0].url}
                          alt="Error"
                          loading="lazy"
                        />
                        <div className="quantity-bubble absolute -right-[10px] -top-[10px] flex h-[25px] w-[25px] items-center rounded-full bg-[#333]">
                          <span className="m-[auto] text-center text-[12px] text-[white]">{cartItem.quantity}</span>
                        </div>
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
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="line"></div>
            <div className="row">
              <div className="row-heading">
                <span className="text-[18px] font-bold">Total</span>
              </div>
              <div className="row-value">
                <span
                  data-currency-value={cart.total_price}
                  className={cx('money text-[16px] font-bold text-red-color')}
                >
                  {cart.total_price}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
