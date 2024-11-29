import BreadcrumbComponent from '@/components/commons/breadcrumb';
import styles from './product.module.scss';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Swiper as SwiperInstance } from 'swiper'; // Import Swiper type
import Fancybox from '@/utils/helpers/fancybox';
import { Product } from '@/types/product';
import ProductVariantComponent from '@/components/products/productVariant';
import { ButtonComponent } from '@/components/commons';
import { ArrowIcon, MinusIcon, PlusIcon, WishListIcon } from '@/utils/icons';
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

    const updateQuantity = (event: any) => {
      const target = event.currentTarget;
      const parent = target.parentElement;
      const quantityInput = parent.querySelector('input');
      let currentQuantity = parseInt(quantityInput.value);
      let newQuantity = currentQuantity;
      if (target.classList.contains('plus')) {
        newQuantity += 1;
      } else {
        newQuantity -= 1;
      }
      if (newQuantity < 1) {
        return;
      }
      quantityInput.value = newQuantity;
    };
    const quantity_action = document.querySelectorAll('[data-quantity-change]');
    quantity_action.forEach((item) => {
      item.addEventListener('click', updateQuantity);
    });
    return () => {
      tabs.forEach((item) => {
        item.removeEventListener('click', handleClick);
      });
      quantity_action.forEach((item) => {
        item.removeEventListener('click', updateQuantity);
      });
    };
  }, []);
  return (
    <div className={cx('container', 'product-page')}>
      <div className={cx('breadcrumb')}>
        <BreadcrumbComponent
          path={[
            { link: '#', title: 'Home' },
            { link: '#', title: 'Product' },
            { link: '#', title: product.title }
          ]}
        />
      </div>
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
        <div className={cx('productView-right', 'phone:mt-[30px]')}>
          <h1 className={cx('productView__right-item', 'title')}>
            <span className={cx('text', 'text-[30px] font-[600] italic phone:text-[25px]')}>{product.title}</span>
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
          <div className={cx('productView__right-item', 'product-quantity', 'mt-[20px]')}>
            <label className={cx('quantity-label')} htmlFor="">
              Quantity:
            </label>
            <div className={cx('form-action', 'mt-[10px]')}>
              <button data-quantity-change className={cx('minus', 'quantity-action')}>
                <MinusIcon></MinusIcon>
              </button>
              <input
                data-inventory="100"
                value="1"
                type="number"
                className={cx('quantity-input', 'text-center')}
                pattern="[0-9]*"
              ></input>
              <button data-quantity-change data-target-input="quantity-input" className={cx('plus', 'quantity-action')}>
                <PlusIcon></PlusIcon>
              </button>
            </div>
          </div>
          <div className={cx('productView__right-item', 'sub-total', 'mt-[20px] font-[400]')}>
            Subtotal: <span className="sub-total-value font-[900]">123213</span>
          </div>
          <div className={cx('productView__right-item', 'product-action', 'mt-[20px] flex items-center gap-[10px]')}>
            <ButtonComponent className={cx('mt-[unset] w-[100%]')}>Add to cart</ButtonComponent>
            <div
              className={cx('wish-list', 'cursor-pointer rounded-[50%] border border-solid border-[#c7c7c7] p-[10px]')}
            >
              <WishListIcon />
            </div>
          </div>
          <div className={cx('productView__right-item', 'product-tabs', 'mt-[40px]')}>
            <div id="description-tab" className="tab border-t-solid border-t-[1px] border-[#232323] p-[10px]">
              <div className={cx('tab-title', 'collapsed', 'text-[16px] font-[600]')}>
                Product Details
                <ArrowIcon className="arrow-icon h-[20px] w-[20px]" />
              </div>
              <div className={cx('tab-content', 'collapsed-content', 'mt-[20px] text-[12px] font-[400]')}>
                {product.description}
              </div>
            </div>
            <div
              id="additional-information-tab"
              className="tab border-t-solid border-t-[1px] border-[#232323] p-[10px]"
            >
              <div className={cx('tab-title', 'collapsed', 'text-[16px] font-[600]')}>
                Additional Information
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
  );
};

export default ProductPage;
