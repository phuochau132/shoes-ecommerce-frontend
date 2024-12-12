import { ImageComponent } from '@/components/commons';
import styles from './home.module.scss';
import ProductBlockComponent from '@/components/products/productBlock';
import { CollectionType } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';
import { useEffect } from 'react';
import { Currency } from '@/utils/helpers/CurrenciesFormat';

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
      reviews: [
        {
          author: { name: 'hautest', age: 34 },
          createAt: new Date(Date.now()),
          rating: 3,
          title: 'test',
          text: 'testasdasdas'
        },
        {
          author: { name: 'Riven', age: 34 },
          createAt: new Date(Date.now()),
          rating: 5,
          title: 'test',
          text: 'testasdasdas'
        }
      ]
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

const HomePage = () => {
  useEffect(() => {
    Currency.initializeCurrency();
  }, []);
  return (
    <div className={cx('container')}>
      <div className={cx('slide-show')}>
        <ImageComponent src="//new-ella-demo.myshopify.com/cdn/shop/files/home-shoes-slider-01.jpg?v=1655787469" />
      </div>
      <section className={cx('section-image-banner', 'flex gap-[27px]')}>
        <div className={cx('image__banner-item', 'larger-banner', 'w-[50%]')}>
          <div className={cx('image-box')}>
            <ImageComponent
              aspect_ratio="82.75862068965517%"
              src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-image-1_870x.jpg"
            />
          </div>
        </div>
        <div className={cx('image__banner-item', 'small-banner', 'flex w-[50%] flex-col justify-between')}>
          <div className={cx('row')}>
            <div className={cx('image-box')}>
              <ImageComponent src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-image-2_870x.jpg" />
            </div>
          </div>

          <div className={cx('row flex gap-[20px]')}>
            <div className={cx('w-[50%]')}>
              <div className={cx('image-box')}>
                <ImageComponent
                  aspect_ratio="82%"
                  src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-image-3_420x.jpg"
                />
              </div>
            </div>
            <div className={cx('w-[50%]')}>
              <div className={cx('image-box')}>
                <ImageComponent
                  aspect_ratio="82%"
                  src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-image-4_420x.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductBlockComponent collection={sampleProducts}></ProductBlockComponent>
    </div>
  );
};

export default HomePage;
