import styles from './product.module.scss';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Swiper as SwiperInstance } from 'swiper';
import Fancybox from '@/utils/helpers/fancybox';
import { ProductType } from '@/types/product';
import ProductVariantComponent from '@/components/products/productVariant';
import { ButtonComponent } from '@/components/commons';
import { WishListIcon } from '@/utils/icons';
import ProductBlockComponent from '@/components/products/productBlock';
import { CollectionType } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';
import QuantityBoxComponent from '@/components/products/quantity';
import { useDispatch } from 'react-redux';
import { setPageInfo } from '@/redux/app/app.slice';
import CollapsibleBlock from '@/components/commons/collapse';
import ReviewItemComponent from '@/components/products/reviewItem';

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
  ],
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
  let totalReview = 0;
  if (product.reviews) {
    totalReview = product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length;
  }

  const renderStar = (total: number): JSX.Element => {
    const stars = [];

    if (total === 0) {
      return <span className="no-rating">No Rating</span>;
    }

    for (let i = 1; i <= 5; i++) {
      if (i <= total) {
        stars.push(
          <span key={i} className={cx('star', 'star-on')}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={cx('star', 'star-off')}>
            ☆
          </span>
        );
      }
    }

    return <div className="stars">{stars}</div>;
  };
  const renderHistogram = () => {
    const ratings = [1, 2, 3, 4, 5];
    const totalReviews = product.reviews?.length;

    return ratings.map((rating) => {
      const count = product.reviews?.filter((review) => review.rating === rating).length;
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

      return (
        <div
          key={rating}
          className={cx(
            'histogram-row',
            'flex cursor-pointer items-center gap-[10px] phoneUp:duration-200 phoneUp:hover:opacity-[0.5]'
          )}
        >
          <div className={cx('histogram__row-star')}>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className={cx('star', index < rating ? 'star-on' : 'star-off')}>
                {index < rating ? '★' : '☆'}
              </span>
            ))}
          </div>
          <div
            className={cx('histogram__row-bar', 'h-[6px] min-w-[200px] overflow-hidden rounded-[30px] bg-color-border')}
          >
            <div style={{ width: `${percentage}%` }} className="h-full bg-[#FF9C05]"></div>
          </div>
          <div className={cx('histogram__row-frequency')}>{count}</div>
        </div>
      );
    });
  };
  const dispatch = useDispatch();
  const handleThumbnailClick = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
    }
  };
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: product.title }
        ]
      })
    );
  }, []);
  return (
    <div className={cx('product-page')}>
      <div className={cx('page-content')}>
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
            <div className={cx('productView__right-item', 'reviews-badge', 'flex items-center gap-[5px]')}>
              <div className={cx('reviews-star')}>{renderStar(totalReview)}</div>
              <p className={cx('text-start')}>{totalReview} reviews</p>
            </div>
            <div className={cx('productView__right-item', 'price')}>
              <div className={cx('price-item', 'price__item-regular')}>
                <span className={cx('money')}>{product.price}</span>
              </div>
            </div>
            <div className={cx('productView__right-item', 'description', 'font-normal opacity-80')}>
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
              <div className={cx('mt-[10px]')}>
                <QuantityBoxComponent />
              </div>
            </div>
            <div className={cx('productView__right-item', 'sub-total', 'mt-[20px] font-normal')}>
              Subtotal: <span className="sub-total-value font-[900]">123213</span>
            </div>
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
            <div className={cx('productView__right-item', 'product-tabs', 'mt-[40px]')}>
              <div id="description-tab" className="tab p-[10px]">
                <CollapsibleBlock className="text-[16px] font-bold" title="Product Details">
                  <p className="pb-[20px]">{product.description}</p>
                </CollapsibleBlock>
              </div>
              <div id="additional-information-tab" className="tab p-[10px]">
                <CollapsibleBlock className="text-[16px] font-bold" title="Additional Information">
                  <p className="pb-[20px]">{product.description}</p>
                </CollapsibleBlock>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('section-reviews')}>
          <div className={cx('section-header')}>
            <h3 className="heading">Customer Reviews</h3>
            <div className={cx('section__header-top', 'mt-[40px] flex items-center justify-between phone:flex-col')}>
              <div className={cx('stars-summary', 'phone:w-full')}>
                <div className={cx('stars__summary-star')}>Base on 5 reviews</div>
                <div className={cx('stars__summary-star')}>{renderStar(totalReview)}</div>
              </div>
              <div className={cx('stars', 'phone:w-full')}>{renderHistogram()}</div>
              <div className={cx('review-action', 'min-w-[240px] phone:mt-[20px]')}>
                <ButtonComponent className={cx('mt-[0]')}>Write a review</ButtonComponent>
              </div>
            </div>
          </div>
          {product.reviews?.length && (
            <div className={cx('review-list mt-[50px]')}>
              {product.reviews.map((review, index) => {
                return (
                  <>
                    <ReviewItemComponent callback={renderStar} review={review}></ReviewItemComponent>
                    {index != product.reviews?.length - 1 && <div className="line my-[30px]"></div>}
                  </>
                );
              })}
            </div>
          )}
        </div>
        <div className="line"></div>
        <div className={cx('section-related-product')}>
          <ProductBlockComponent viewAllButton={false} title="Relate Product" collection={sampleProducts} />
        </div>
        <div className="line"></div>
        <div className={cx('section-recently-viewed-product')}>
          <ProductBlockComponent viewAllButton={false} title="Recently Viewed Products" collection={sampleProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
