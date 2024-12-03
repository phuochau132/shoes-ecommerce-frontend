// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './cart.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarLayout from '../layout';
import { useDispatch } from 'react-redux';
import { setCartSidebarState } from '@/redux/app/app.slice';
import FreeShippingComponent from '@/components/cart/freeshipping';
import { Collection } from '@/types/collection';
import { EditingIcon, LinkIcon, RemoveIcon } from '@/utils/icons';
import QuantityBoxComponent from '@/components/products/quantity';

const cx = bindClassNames(styles);
const sampleProducts: Collection = {
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
const CartSidebar: React.FC = memo(() => {
  const dispatch = useDispatch();
  return (
    <SidebarLayout
      className="!max-w-[500px]"
      callback={() => {
        dispatch(setCartSidebarState(false));
      }}
      title="Shopping Cart (2)"
    >
      <div className={cx('free-shipping')}>
        <FreeShippingComponent />
      </div>
      <div className={cx('items', 'max-h-[50%] overflow-y-scroll')}>
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
              <div className={cx('product-action', 'absolute bottom-[0] right-[0] mt-[5px] text-[12px]')}>
                <div className={cx('product__action-remove', 'mt-[5px] cursor-pointer text-[12px]')}>
                  <EditingIcon />
                </div>
                <div className={cx('product__action-edit', 'mt-[5px] cursor-pointer text-[12px]')}>
                  <RemoveIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SidebarLayout>
  );
});

export default CartSidebar;
