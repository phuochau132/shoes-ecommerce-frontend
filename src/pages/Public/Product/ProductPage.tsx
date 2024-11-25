import BreadcrumbComponent from '@/components/commons/breadcrumb';
import styles from './product.module.scss';
import classNames from 'classnames/bind';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Swiper as SwiperInstance } from 'swiper'; // Import Swiper type
import Fancybox from '@/utils/helpers/fancybox';
import { Variants } from 'antd/es/config-provider';
import { Product } from '@/types/product';
import ProductVariantComponent from '@/components/products/productVariant';
import { ButtonComponent } from '@/components/commons';
import { ArrowIcon, WishListIcon } from '@/utils/icons';
import ProductBlockComponent from '@/components/products/productBlock';

const cx = classNames.bind(styles);
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
const product: Product = {
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
const ProductPage = () => {
  const [mainSwiper, setMainSwiper] = useState<SwiperInstance | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperInstance | null>(null);

  const handleThumbnailClick = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
    }
  };
  useEffect(() => {
    const tabs = document.querySelectorAll('.tab .collapsed');
    const handleClick = (event: any) => {
      const target = event.currentTarget;
      const parent = target.parentElement;
      parent.classList.toggle('is-activated');
    };

    tabs.forEach((item) => {
      item.addEventListener('click', handleClick);
    });

    return () => {
      tabs.forEach((item) => {
        item.removeEventListener('click', handleClick);
      });
    };
  }, []);
  return (
    <div className={cx('container')}>
      <div className={cx('breadcrumb')}>
        <BreadcrumbComponent
          path={[
            { link: '#', title: 'Home' },
            { link: '#', title: 'Product' },
            { link: '#', title: 'Product Test' }
          ]}
        />
        <div className={cx('productView-top', 'mb-[50px]')}>
          <div className={cx('productView-left', 'pr-[20px]')}>
            <div className={cx('productImage-wrapper')}>
              <Fancybox
                options={{
                  Carousel: {
                    infinite: false
                  }
                }}
              >
                <div className={cx('productView-nav')}>
                  {product && (
                    <Swiper
                      modules={[Controller, Pagination]}
                      spaceBetween={10}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      onSwiper={setMainSwiper}
                      controller={{ control: thumbSwiper }}
                      className={cx('swiper-container')}
                    >
                      {product.images.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className={cx('media')}>
                            <img data-fancybox="gallery" className={cx('h-[100%] w-[100%]')} src={item} alt="error" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              </Fancybox>
              <div className={cx('productView-thumbnail', 'mt-[50px]')}>
                {product && (
                  <Swiper
                    modules={[Controller, Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation
                    onSwiper={setThumbSwiper}
                    controller={{ control: mainSwiper }}
                    className={cx('swiper-container')}
                  >
                    {product.images.map((item, index) => (
                      <SwiperSlide key={index} onClick={() => handleThumbnailClick(index)}>
                        <div className={cx('media')}>
                          <img
                            className={cx('h-[100%] w-[100%]', 'cursor-pointer')}
                            src={item}
                            alt={`Thumbnail ${index}`}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
          <div className={cx('productView-right')}>
            <h1 className={cx('productView__right-item', 'title')}>
              <span className={cx('text', 'text-[20px] font-[600] italic phone:text-[18px]')}>{product.title}</span>
            </h1>
            <div className={cx('productView__right-item', 'price')}>
              <div className={cx('price-item', 'price__item-regular')}>
                <span className={cx('money')}>{product.price}</span>
              </div>
            </div>
            <div className={cx('productView__right-item', 'description', 'text-[12px] font-[400] opacity-80')}>
              {product.description}
            </div>
            {product.variants && (
              <div className={cx('productView__right-item', 'product-variant')}>
                <ProductVariantComponent variants={product.variants} />
              </div>
            )}
            <div className={cx('productView__right-item', 'product-action', 'mt-[20px] flex items-center gap-[10px]')}>
              <ButtonComponent className={cx('mt-[unset] w-[100%]')}>Add to cart</ButtonComponent>
              <div
                className={cx(
                  'wish-list',
                  'cursor-pointer rounded-[50%] border border-solid border-[#c7c7c7] p-[10px]'
                )}
              >
                <WishListIcon />
              </div>
            </div>
            <div className={cx('productView__right-item', 'product-tabs')}>
              <div id="description-tab" className="tab border-t-solid border-t-[1px] border-[#232323] p-[10px]">
                <div className={cx('tab-title', 'collapsed', 'text-[16px] font-[600]')}>
                  Product Details
                  <ArrowIcon className="arrow-icon h-[20px] w-[20px]" />
                </div>
                <div className={cx('tab-content', 'collapsed-content', 'mt-[20px] text-[12px] font-[400]')}>
                  {product.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('productView__right-item', 'related-product')}>
          <ProductBlockComponent viewAllButton={false} title="Relate Product" collection={sampleProducts} />
        </div>
        <div className={cx('productView__right-item', 'recently-viewed-product')}>
          <ProductBlockComponent viewAllButton={false} title="Recently Viewed Products" collection={sampleProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;