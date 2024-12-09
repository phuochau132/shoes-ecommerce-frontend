import BreadcrumbComponent from '@/components/commons/breadcrumb';
import styles from './cart.module.scss';
import { useEffect } from 'react';
import { ProductType } from '@/types/product';
import { LinkIcon, MinusIcon, PlusIcon } from '@/utils/icons';
import { CollectionType } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';
import QuantityBoxComponent from '@/components/products/quantity';
import { ButtonComponent, InputComponent } from '@/components/commons';
import ProductBlockComponent from '@/components/products/productBlock';
import FreeShippingComponent from '@/components/cart/freeshipping';
import { useDispatch } from 'react-redux';
import { setPageInfo } from '@/redux/app/app.slice';
import path from 'path';

const cx = bindClassNames(styles);
const sampleProducts: CollectionType = {
  products: [
    {
      title: 'Classic Running Shoes',
      price: 99.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Comfortable and lightweight running shoes.',
      link: '/product/classic-running-shoes',
      vendor: 'Nike'
    },
    {
      title: 'Leather Loafers',
      price: 120.0,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-1_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-2_940x.jpg'
      ],
      description: 'Elegant leather loafers perfect for formal occasions.',
      link: '/product/leather-loafers',
      vendor: 'Clarks'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-12_2bc82ceb-f16e-42b2-97a1-44d767d1275c_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-8_7f3fb24f-a041-41c0-aa66-cd73f71a7cdc_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-9_772ea725-8e5f-4190-8ebc-604b18f41d3b_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-8_dfc1255d-7379-43a0-8ca2-54954ff8ca9b_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-6_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_b24edfdf-07ec-4e3a-b914-09ff3b48a316_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-17_f6e9a66a-791f-4cd0-80e6-41cb3b58d180_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-19_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    }
  ]
};
const product: ProductType = {
  title: 'Classic Running Shoes',
  price: 99.99,
  images: [
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
  ],
  description: 'Comfortable and lightweight running shoes.',
  link: '/product/classic-running-shoes',
  vendor: 'Nike',
  variants: [
    {
      id: 1,
      name: 'Color',
      values: [
        {
          id: 54545454,
          price: 20,
          name: 'White'
        },
        {
          id: 123123123,
          price: 30,
          name: 'Red'
        }
      ],
      type: 'swatch'
    },
    {
      id: 2,
      name: 'Size',
      values: [
        {
          id: 1,
          price: 20,
          name: 'X'
        },
        {
          id: 2,
          price: 30,
          name: 'XL'
        }
      ],
      type: 'Rectangle'
    }
  ]
};

const CartPage = () => {
  const dispatch = useDispatch();
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
  }, []);
  return (
    <div className={cx('cart-page')}>
      <div className={cx('cart-content', 'flex mobileTablet:flex-col')}>
        <div className={cx('cart_content-left', 'pr-[50px] mobileTablet:max-w-[100%] mobileTablet:pr-[0]')}>
          <table className={cx('cart__content-items', 'w-[100%] table-auto')}>
            <thead className={cx('cart-header')}>
              <tr className={cx('bg-[#fafafa]')}>
                <th className={cx('text-left', 'px-4', 'w-2/5')}>Product</th>
                <th className={cx('text-left', 'px-4', 'w-1/5')}>Price</th>
                <th className={cx('text-left', 'px-4', 'w-1/5')}>Quantity</th>
                <th className={cx('text-left', 'px-4', 'w-1/5')}>Total</th>
              </tr>
            </thead>
            <tbody className={cx('cart-list')}>
              {sampleProducts.products.map((item) => {
                return (
                  <tr className={cx('item')}>
                    <td className={cx('px-4', 'flex gap-[10px]')}>
                      <div className={cx('cart-item-image', 'w-[100%] max-w-[80px]')}>
                        <a className={cx('relative block max-w-[80px] pb-[100%]')} href={item.link}>
                          <div className={cx('linked-icon', 'z-[1] h-[20px] w-[20px]')}>
                            <LinkIcon />
                          </div>
                          <img className={cx('absolute')} src={item.images[0]} alt="Error" loading="lazy" />
                        </a>
                      </div>
                      <div className={cx('cart-item-info')}>
                        <h4 className={cx('cart-item-title', 'italic')}>
                          <a href={item.link}>
                            <span className={cx('main-color')}>{item.title}</span>
                          </a>
                        </h4>
                        <div className={cx('cart-item-variant', 'text-[12px] text-grey-color')}>Black / S</div>
                        <div className={cx('cart-item-vendor', 'text-[12px] text-grey-color')}>{item.vendor}</div>
                      </div>
                    </td>
                    <td className={cx('px-4')}>{item.price}</td>
                    <td className={cx('px-4')}>
                      <div className={cx('form-action', 'mt-[10px]')}>
                        <QuantityBoxComponent />
                      </div>
                    </td>
                    <td className={cx('px-4')}>{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className={cx(
            'cart_content-right',
            'h-[max-content] flex-1 rounded-[10px] bg-[#fafafa] p-[10px] mobileTablet:mt-[20px]'
          )}
        >
          <div className={cx('cart-total')}>
            <div className={cx('cart__totals-title', 'text-[20px] font-[800] text-[#232323] after:bg-[#232323]')}>
              Order Summary
            </div>
            <div className={cx('sub-total', 'mt-[50px] flex justify-between')}>
              <span className={cx('font-label')}>Subtotal:</span>
              <div className={cx('sub__total-label')}></div>
              <div className={cx('sub__total-value')}>
                <span className="money">$418.99</span>
              </div>
            </div>
            <div className={cx('comment', 'mt-[20px]')}>
              <label className={cx('comment-label')}>
                <span className={cx('font-label')}>Add Order Note:</span>
              </label>
              <div className={cx('comment-value', 'mt-[10px]')}>
                <textarea
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
              <div className={cx('total-value')}>
                <span className="money">$418.99</span>
              </div>
            </div>
            <div className={cx('action', 'mt-[20px] flex justify-between')}>
              <ButtonComponent>Checkout</ButtonComponent>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('productView__right-item', 'related-product')}>
        <ProductBlockComponent viewAllButton={false} title="Relate Product" collection={sampleProducts} />
      </div>
    </div>
  );
};

export default CartPage;
