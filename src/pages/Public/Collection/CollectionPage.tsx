import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './collection.module.scss';
import { CollectionType } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarComponent from './component/sidebar';
import ProductCardComponent from '@/components/products/card';
import { FilterIcon, GridModeIcon1, GridModeIcon2, GridModeIcon3, GridModeIcon4 } from '@/utils/icons';
import { useDispatch } from 'react-redux';
import { setFilterSidebarState, setPageInfo } from '@/redux/app/app.slice';
import { useSelector } from 'react-redux';

const cx = bindClassNames(styles);
const sampleProducts: CollectionType = {
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

const CollectionPage: React.FC = () => {
  const gridModeRefs = useRef<HTMLDivElement[]>([]);
  const productGridRef = useRef<HTMLDivElement>(null);
  const filterSidebarState = useSelector((state: any) => state.app.filterSidebarState);
  const dispatch = useDispatch();
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
    if (window.innerWidth < 768) {
      gridModeRefs.current[0]?.click();
    } else {
      gridModeRefs.current[2]?.click();
    }
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: sampleProducts.title }
        ],
        title: 'Products'
      })
    );
  }, []);
  return (
    <div className={cx('collection-page')}>
      <div className={cx('collection-content', 'flex')}>
        <div
          className={cx(
            'collection__content-sidebar',
            {
              'phone:opacity-[1]': filterSidebarState,
              'phone:translate-x-[0%]': filterSidebarState,
              'phone:-translate-x-full': !filterSidebarState
            },
            'top-[0] bg-[white] phone:fixed phone:bottom-[0] phone:left-[0] phone:z-[3] phone:p-[20px] phone:opacity-[0]'
          )}
        >
          <SidebarComponent products={sampleProducts.products} />
        </div>
        <div className={cx('collection__content-grid', 'pl-[50px] phone:pl-[0]')}>
          <div className={cx('collection-heading', 'mb-[20px] pl-[10px] pr-[10px]')}>
            <h1 className={cx('title', 'heading font-[700]')}>{sampleProducts.title}</h1>
            <p className={cx('description', 'mt-[10px] text-[15px] font-[500] text-[bold]')}>
              <span className={cx('text', 'font-normal')}>{sampleProducts.description}</span>
            </p>
          </div>
          <div className={cx('toolbar', 'flex justify-between pl-[10px] pr-[10px]')}>
            <div className={cx('result', 'phone:hidden')}>
              <p className={cx('text font-normal text-[#444444]')}>There are 18 results in total</p>
            </div>
            <button
              onClick={() => {
                dispatch(setFilterSidebarState(true));
              }}
              className={cx(
                'hidden items-center gap-[6px] rounded-[3px] bg-primary-color p-[5px] pl-[10px] pl-[10x] pr-[10px] text-[white] phone:flex'
              )}
            >
              <FilterIcon />
              Filter
            </button>
            <div className={cx('grid-mode', 'flex gap-[10px]')}>
              {[2, 3, 4].map((grid, index) => (
                <div
                  key={grid}
                  ref={(el) => {
                    if (el) {
                      gridModeRefs.current[index] = el;
                    }
                  }}
                  data-grid={grid}
                  className={cx('grid_mode-item', { 'phone:hidden': grid == 3 || grid == 4 })}
                  onClick={handleClick}
                >
                  {grid === 2 ? <GridModeIcon2 /> : grid === 3 ? <GridModeIcon3 /> : <GridModeIcon4 />}
                </div>
              ))}
              <div
                ref={(el) => {
                  if (el) {
                    gridModeRefs.current[3] = el;
                  }
                }}
                data-grid={1}
                className={cx('grid_mode-item', 'hidden phone:block')}
                onClick={handleClick}
              >
                <GridModeIcon1 />
              </div>
            </div>
          </div>
          <div ref={productGridRef} className={cx('product-grid', 'mt-[30px] flex flex-wrap')}>
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
