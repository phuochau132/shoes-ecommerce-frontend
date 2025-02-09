import styles from './checkout.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import { ButtonComponent, InputComponent } from '@/components/commons';
import { LinkIcon, PaypalIcon, ShippingIcon } from '@/utils/icons';
import { cartState } from '@/types/cart';
import { useSelector } from 'react-redux';
import { setCart } from '@/redux/slice/cart/cart.slice';
import { useGetCartMutation } from '@/apis/cart/cart.api';
import { Currency } from '@/utils/helpers/currenciesFormat';
import useValidation, { useForm } from '@/utils/hooks/form';
import { orderSchema } from '@/validations/order.validation';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { baseURL } from '@/base/BaseQuery';
import { useCreateOrderMutation } from '@/apis/order/order.api';
import LoaderComponent from '@/components/commons/loader';

const cx = bindClassNames(styles);
export enum EPaymentMethod {
  cash_on_delivery = 'cash_on_delivery',
  paypal = 'paypal'
}

const initialCheckoutData = {
  country: '',
  city: '',
  detailAddress: '',
  paymentMethod: EPaymentMethod.cash_on_delivery,
  note: ''
};
interface PayPalOrderData {
  orderID: string;
}

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: cartState) => state.cart);
  const [paypalBtnIsDisabled, setPaypalBtnIsDisabled] = useState(true);
  const [getCart, { isLoading, isSuccess }] = useGetCartMutation();
  const [createNewOrder, { isLoading: createOrderIsLoading }] = useCreateOrderMutation();
  const { errors: checkoutErrors, validate: validateCheckoutForm } = useValidation(orderSchema);
  const {
    formData: checkoutFormData,
    handleChange: handleCheckoutChange,
    setFormData: setCheckoutFormData
  } = useForm(initialCheckoutData);
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
          { path: '#', title: 'Checkout' }
        ],
        title: 'Checkout Page'
      })
    );
    getCartFc();
    setCheckoutFormData((prev) => {
      return {
        ...prev,
        note: localStorage.getItem('order-note') ?? ''
      };
    });
  }, []);
  useEffect(() => {
    if (cart) {
      Currency.initializeCurrency();
    }
  }, [cart]);

  const handleCheckout = useCallback(
    async (values: Record<string, string>) => {
      const errors: any = await validateCheckoutForm(values);
      if (Object.keys(errors).length === 0) {
        try {
          await createNewOrder(values).unwrap();
          localStorage.setItem('order-item', '');
          dispatch(setCart(null));
        } catch (error) {
          console.error(error);
        }
      }
    },
    [checkoutFormData]
  );
  const createOrder = useCallback(() => {
    return axios
      .post(`${baseURL}/paypal/create-order`, {
        total_price: cart.total_price
      })
      .then((response) => {
        return response.data.data.id;
      });
  }, [cart]);

  const onApprove = useCallback(
    (data: PayPalOrderData) => {
      if (!data?.orderID) return Promise.resolve();
      return axios.get(`${baseURL}/paypal/capture-payment/${data.orderID}`).then(async () => {
        try {
          await createNewOrder(checkoutFormData);
          localStorage.setItem('order-item', '');
          dispatch(setCart(null));
        } catch (error) {
          console.error(error);
        }
      });
    },
    [checkoutFormData]
  );
  const checkCondition = useCallback(
    async (values: any) => {
      const errors: any = await validateCheckoutForm(values, false);
      if (Object.keys(errors).length === 0) {
        return false;
      }
      return true;
    },
    [checkoutFormData]
  );

  useEffect(() => {
    const checkErrors = async () => {
      const isDisabled = await checkCondition(checkoutFormData);
      setPaypalBtnIsDisabled(isDisabled);
    };
    checkErrors();
  }, [checkoutFormData]);
  return (
    <div className={cx('container mx-[auto]', 'checkout-page relative')}>
      {isLoading ? (
        <LoaderComponent />
      ) : cart && cart.items.length > 0 ? (
        <div className={cx('page-content', 'flex items-start gap-[50px]')}>
          <div className={cx('page-left', 'w-full phoneUp:max-w-[50%]')}>
            <div className={cx('delivery-section')}>
              <div className={cx('heading')}>
                <h2>Delivery</h2>
              </div>
              <div className={cx('fields')}>
                <div className={cx('field', 'country')}>
                  <div className={cx('field-header', 'mb-[10px]')}>
                    <label htmlFor="country-payment">
                      Your Country <small>*</small>
                    </label>
                    {checkoutErrors.country && <span className="error">{checkoutErrors.country}</span>}
                  </div>
                  <InputComponent
                    id="country-payment"
                    name="country"
                    value={checkoutFormData.country}
                    onChange={handleCheckoutChange}
                    className={cx('rounded-[10px] p-[10px]')}
                    placeholder="Country/Region"
                  />
                </div>
                <div className={cx('flex')}>
                  <div className={cx('field', 'city', 'w-full max-w-[50%]')}>
                    <div className={cx('field-header', 'mb-[10px]')}>
                      <label htmlFor="postalCode-payment">Postal Code</label>
                    </div>
                    <InputComponent
                      id="postalCode-payment"
                      name="postalCode"
                      onChange={handleCheckoutChange}
                      className={cx('rounded-[10px] p-[10px]')}
                      placeholder="Postal code"
                    />
                  </div>
                  <div className={cx('field', 'postal-code', 'w-full max-w-[50%] pl-[10px]')}>
                    <div className={cx('field-header', 'mb-[10px] block')}>
                      <label htmlFor="city-payment">
                        Your City <small>*</small>
                      </label>
                      {checkoutErrors.city && <span className="error">{checkoutErrors.city}</span>}
                    </div>
                    <InputComponent
                      name="city"
                      id="city-payment"
                      value={checkoutFormData.city}
                      onChange={handleCheckoutChange}
                      className={cx('rounded-[10px] p-[10px]')}
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className={cx('field', 'detail-address')}>
                  <div className={cx('field-header', 'mb-[10px] block')}>
                    <label htmlFor="detailAddress-payment">
                      Your Detail Address <small>*</small>
                    </label>
                    {checkoutErrors.detailAddress && <span className="error">{checkoutErrors.detailAddress}</span>}
                  </div>
                  <InputComponent
                    name="detailAddress"
                    value={checkoutFormData.detailAddress}
                    onChange={handleCheckoutChange}
                    className={cx('rounded-[10px] p-[10px]')}
                    placeholder="Detail Address"
                  />
                </div>
              </div>
            </div>
            <div className={cx('payment-section')}>
              <div className={cx('heading')}>
                <h2>Payment Method</h2>
              </div>
              <label htmlFor="ship-option" className={cx('option')}>
                <div>
                  <input
                    value={EPaymentMethod.cash_on_delivery}
                    onChange={handleCheckoutChange}
                    checked={checkoutFormData.paymentMethod === EPaymentMethod.cash_on_delivery}
                    id="ship-option"
                    name="paymentMethod"
                    type="radio"
                  />
                  <span>Cash On Delivery</span>
                </div>
                <div className={cx('icon')}>
                  <ShippingIcon className="w-[full]" />
                </div>
              </label>
              <label htmlFor="paypal-option" className={cx('option')}>
                <div>
                  <input
                    value={EPaymentMethod.paypal}
                    onChange={handleCheckoutChange}
                    checked={checkoutFormData.paymentMethod === EPaymentMethod.paypal}
                    id="paypal-option"
                    name="paymentMethod"
                    type="radio"
                  />
                  <span>Paypal</span>
                </div>
                <div className={cx('icon')}>
                  <PaypalIcon className="w-[full]" />
                </div>
              </label>
              <div className={cx('payment-button')}>
                {checkoutFormData.paymentMethod == EPaymentMethod.cash_on_delivery ? (
                  <ButtonComponent
                    isLoading={createOrderIsLoading}
                    onClick={() => {
                      handleCheckout(checkoutFormData);
                    }}
                  >
                    Pay now
                  </ButtonComponent>
                ) : (
                  <PayPalButtons
                    style={{ layout: 'horizontal' }}
                    fundingSource="paypal"
                    onError={(error) => {
                      console.error(error);
                    }}
                    onApprove={onApprove}
                    createOrder={createOrder}
                    className="mt-[20px]"
                    disabled={paypalBtnIsDisabled}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={cx('page-right', 'w-full rounded-[5px] bg-grey-bg px-[20px] pb-[20px] phoneUp:max-w-[50%]')}>
            <div className={cx('items')}>
              {cart.items.map((cartItem, index) => {
                return (
                  <div key={index} className={cx('item', 'relative my-[20px] flex gap-[10px]')}>
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
            <div className={cx('row')}>
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
      ) : (
        <>
          {isSuccess && (
            <div>
              <p className="text-center text-[30px] font-bold text-red-color">
                There are no products in the cart to check out!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
