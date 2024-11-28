import { ImageComponent } from '@/components/commons';
import styles from './home.module.scss';
import ProductBlockComponent from '@/components/products/productBlock';
import { Collection } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';

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
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Elegant leather loafers perfect for formal occasions.',
      link: '/product/leather-loafers',
      vendor: 'Clarks'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    },
    {
      title: 'High-Top Sneakers',
      price: 89.99,
      images: [
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-3_940x.jpg',
        'https://new-ella-demo.myshopify.com/cdn/shop/products/shoes-product-image-5_940x.jpg'
      ],
      description: 'Trendy high-top sneakers with durable soles.',
      link: '/product/high-top-sneakers',
      vendor: 'Adidas'
    }
  ]
};

const HomePage = () => {
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
