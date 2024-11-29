import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './collection.module.scss';
import { Collection } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarComponent from './component/sidebar';
import BreadcrumbComponent from '@/components/commons/breadcrumb';
import ProductCardComponent from '@/components/products/card';
import { GridModeIcon2, GridModeIcon3, GridModeIcon4 } from '@/utils/icons';

const cx = bindClassNames(styles);
const sampleProducts: Collection = {
  title: 'Skincare',
  description: 'Optimal skincare with serums, creams, and masks for a radiant complexion.',
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
      ]
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

const CollectionPage: React.FC = () => {
  const gridModeRefs = useRef<HTMLDivElement[]>([]);
  const productGridRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const modeIsActivated = gridModeRefs.current.find((item) => item.classList.contains('is-activated'));
    modeIsActivated?.classList.remove('is-activated');
    target.classList.add('is-activated');

    if (productGridRef.current) {
      productGridRef.current.className = productGridRef.current.className
        .split(' ')
        .filter((cls) => !cls.startsWith('col-'))
        .join(' ');

      const col = target.getAttribute('data-grid');
      if (col) {
        productGridRef.current.classList.add(`col-${col}`);
      }
    }
  }, []);

  useEffect(() => {
    gridModeRefs.current[2]?.click();
  }, []);
  return (
    <div className={cx('container', 'collection-page')}>
      <div className={cx('collection-heading', 'mb-[50px] pt-[40px]')}>
        <div className={cx('breadcrumb', 'flex justify-center')}>
          <BreadcrumbComponent
            path={[
              { link: '#', title: 'Home' },
              { link: '#', title: 'Collection' },
              { link: '#', title: sampleProducts.title }
            ]}
          />
        </div>
        <h1 className={cx('title', 'mb:text-[30px] text-center text-[35px] font-[700]')}>{sampleProducts.title}</h1>
        <p className={cx('description', 'text-center text-[15px] font-[500] text-[bold]')}>
          <span className={cx('text', 'font-[400]')}>{sampleProducts.description}</span>
        </p>
      </div>
      <div className={cx('collection-content', 'flex')}>
        <div className={cx('collection__content-sidebar')}>
          <SidebarComponent products={sampleProducts.products} />
        </div>
        <div className={cx('collection__content-grid', 'pl-[50px]')}>
          <div className={cx('toolbar', 'flex justify-between')}>
            <div className={cx('result')}>
              <p className={cx('text font-[400] text-[#444444]')}>There are 18 results in total</p>
            </div>
            <div className={cx('grid-mode', 'flex gap-[10px]')}>
              {[2, 3, 4].map((grid, index) => (
                <div
                  key={grid}
                  ref={(el) => (gridModeRefs.current[index] = el!)}
                  data-grid={grid}
                  className={cx('grid_mode-item')}
                  onClick={handleClick}
                >
                  {grid === 2 ? <GridModeIcon2 /> : grid === 3 ? <GridModeIcon3 /> : <GridModeIcon4 />}
                </div>
              ))}
            </div>
          </div>
          <div ref={productGridRef} className={cx('product-grid', 'mt-[50px] flex flex-wrap')}>
            {sampleProducts.products.map((product, index) => (
              <div key={index} className={cx('product', 'p-[10px]')}>
                <ProductCardComponent product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
