// AnnouncementBar.tsx
import React, { memo, useCallback, useRef, useState } from 'react';
import styles from './cart.module.scss';
import './cart.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarLayout from '../layout';
import { useDispatch } from 'react-redux';
import { setCartSidebarState } from '@/redux/app/app.slice';
import FreeShippingComponent from '@/components/cart/freeshipping';
import { CollectionType } from '@/types/collection';
import { EditingIcon, GiftIcon, LinkIcon, NoteIcon, RemoveIcon } from '@/utils/icons';
import QuantityBoxComponent from '@/components/products/quantity';
import { ButtonComponent } from '@/components/commons';
import TermAndConditionComponent from '@/components/cart/termAndConditionButton';

const cx = bindClassNames(styles);
export const sampleProducts: CollectionType = {
  title: 'Skincare',
  description: 'Optimal skincare with serums, creams, and masks for a radiant complexion.',
  products: [
    {
      id: 1,
      title: 'Classic Running Shoes',
      price: 99.99,
      images: [
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
      ],
      reviews: []
    },
    {
      id: 2,
      title: 'Leather Loafers',
      price: 120.0,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-1_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-2_940x.jpg'
      ],
      description: 'Elegant leather loafers perfect for formal occasions.',
      link: '/product/leather-loafers',
      vendor: 'Clarks',
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
      ],
      reviews: []
    },
    {
      id: 3,
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-12_2bc82ceb-f16e-42b2-97a1-44d767d1275c_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-8_7f3fb24f-a041-41c0-aa66-cd73f71a7cdc_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas',
      reviews: []
    },
    {
      id: 4,
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-9_772ea725-8e5f-4190-8ebc-604b18f41d3b_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-8_dfc1255d-7379-43a0-8ca2-54954ff8ca9b_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas',
      reviews: []
    },
    {
      id: 5,
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-6_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_b24edfdf-07ec-4e3a-b914-09ff3b48a316_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas',
      reviews: []
    },
    {
      id: 6,
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-17_f6e9a66a-791f-4cd0-80e6-41cb3b58d180_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-19_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas',
      reviews: []
    }
  ]
};
const CartSidebar: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const handleClickAddon = useCallback((event: React.MouseEvent<HTMLElement>, className: string) => {
    if (wrapper.current) {
      wrapper.current.classList.add(className);
    }
  }, []);
  const handleClickCancel = useCallback(() => {
    if (wrapper.current) {
      wrapper.current.classList.remove('note-activation');
      wrapper.current.classList.remove('giftWrap-activation');
    }
  }, []);
  return (
    <SidebarLayout
      className="!max-w-[500px]"
      callback={() => {
        dispatch(setCartSidebarState(false));
      }}
      title="Shopping Cart (2)"
    >
      <div ref={wrapper} className="previewCart-wrapper h-[100%]">
        <div className={cx('previewCart-free-shipping')}>
          <FreeShippingComponent />
        </div>
        <div className={cx('previewCart-items', 'mt-[10px] max-h-[50%] overflow-y-auto')}>
          {sampleProducts.products.map((product) => {
            return (
              <div className={cx('item', 'relative mb-[40px] mt-[40px] flex gap-[10px]')}>
                <div className={cx('product-image', 'w-[100%] max-w-[80px]')}>
                  <a className={cx('relative block max-w-[80px] pb-[100%]')} href={product.link}>
                    <div className={cx('linked-icon', 'z-[1] h-[20px] w-[20px]')}>
                      <LinkIcon />
                    </div>
                    <img className={cx('absolute')} src={product.images[0]} alt="Error" loading="lazy" />
                  </a>
                </div>
                <div className={cx('product-info')}>
                  <h4 className={cx('product-title', 'italic')}>
                    <a href={product.link}>
                      <span className={cx('main-color')}>{product.title}</span>
                    </a>
                  </h4>
                  <div className={cx('product-variant', 'text-[12px] text-grey-color')}>Black / S</div>
                  <div className={cx('product-price', 'text-[12px]')}>{product.price}</div>
                  <div className={cx('product-quantity', 'mt-[5px] text-[12px]')}>
                    <QuantityBoxComponent />
                  </div>
                </div>
                <div className={cx('product-action', 'absolute bottom-[10%] right-[0] mt-[5px] text-[12px]')}>
                  <button className={cx('product__action-remove', 'mt-[5px] block cursor-pointer p-[5px] text-[12px]')}>
                    <EditingIcon />
                  </button>
                  <button className={cx('product__action-edit', 'mt-[5px] block cursor-pointer p-[5px] text-[12px]')}>
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
                onClick={(event) => {
                  handleClickAddon(event, 'note-activation');
                }}
              >
                <NoteIcon />
              </button>
            </div>
            <div className={cx('cart-gift')}>
              <button
                onClick={(event) => {
                  handleClickAddon(event, 'giftWrap-activation');
                }}
              >
                <GiftIcon />
              </button>
            </div>
          </div>
          <div className={cx('previewCart-info')}>
            <div className={cx('subtotal', 'my-[10px] flex justify-between')}>
              <div className={cx('subtotal-label', 'font-label')}>SUBTOTAL:</div>
              <div className={cx('subtotal-value')}>
                <span className="money">$189.04</span>
              </div>
            </div>
            <div className={cx('total', 'my-[10px] flex justify-between')}>
              <div className={cx('total-label', 'font-label')}>TOTAL:</div>
              <div className={cx('total-value')}>
                <span className="money">$189.04</span>
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
              link="/cart"
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
            className="mt-[10px] min-h-[12rem] w-full rounded-[10px] border p-[10px] outline-none"
            name="note"
            form="cart"
            id="Cart-note"
            placeholder="How can we help you?"
            data-listener-added_e50af269="true"
          ></textarea>
          <ButtonComponent>Save</ButtonComponent>
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
    </SidebarLayout>
  );
});

export default CartSidebar;
