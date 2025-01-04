import styles from './product.module.scss';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperInstance } from 'swiper';
import Fancybox from '@/utils/helpers/fancybox';
import { ProductType } from '@/types/product';
import ProductVariantComponent from '@/components/products/productVariant';
import { ButtonComponent, InputComponent } from '@/components/commons';
import { DeliveryIcon, EyeIcon, WishListIcon } from '@/utils/icons';
import ProductBlockComponent from '@/components/products/productBlock';
import { CollectionType } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';
import QuantityBoxComponent from '@/components/products/quantity';
import { useDispatch } from 'react-redux';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import CollapsibleBlock from '@/components/commons/collapse';
import { calTotalReview } from '@/utils/helpers/review';
import { Currency } from '@/utils/helpers/CurrenciesFormat';
import { Image, Rate, Upload, UploadFile, UploadProps } from 'antd';
import { FileType, getBase64 } from '@/utils/helpers/base64';
import { PlusOutlined } from '@ant-design/icons';
import AddToCartComponent from '@/components/products/addToCart';
import { useAddReviewMutation, useGetProductMutation, useRemoveReviewMutation } from '@/apis/product/product.api';
import { useNavigate, useParams } from 'react-router-dom';
import { paths } from '@/routes/paths';
import ReviewItemComponent from '@/components/products/reviewItem';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useValidation, { useForm } from '@/utils/hooks/form';
import { productSchema } from '@/validations/product.validation';
import { useAddWishlistMutation, useGetInfoMutation, useRemoveWishlistMutation } from '@/apis/user/user.api';
import { setUser } from '@/redux/slice/user/user.slice';
import { UserType } from '@/types/user';
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
const patternProduct: ProductType = {
  title: 'Classic Running Shoes',
  price: 99.99,
  reviews: [],
  images: [],
  description: 'Comfortable and lightweight running shoes.',
  link: '/product/classic-running-shoes',
  vendor: 'Nike',
  variants: []
};
const initialReview = {
  title: '',
  content: '',
  rating: 1,
  product_id: 1
};

const liveViewCount = [10, 25, 30];
const ProductPage = () => {
  const { handle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user }: { user: UserType } = useSelector((state: any) => state.user);
  const [product, setProduct] = useState(patternProduct);
  const [mainSwiper, setMainSwiper] = useState<SwiperInstance | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperInstance | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [showWritingReviewSection, setShowWritingReviewSection] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [getProduct, { isLoading: getProductIsLoading }] = useGetProductMutation();
  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
  const [removeReview, { isloading }] = useRemoveReviewMutation();
  const {
    formData: reviewFormData,
    handleChange: handleReviewChange,
    setFormData: setReviewFormData
  } = useForm(initialReview);

  const { errors: reviewErrors, validate: reviewValidate } = useValidation(productSchema.review);
  const refLiveViewCount = useRef<HTMLSpanElement>(null);
  let totalReview = calTotalReview({ product: product });

  const randomShowLiveView = useCallback(() => {
    const interval = setInterval(() => {
      if (refLiveViewCount.current) {
        const randomValue = liveViewCount[Math.floor(Math.random() * liveViewCount.length)];
        refLiveViewCount.current.innerText = String(randomValue);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  const renderStar = useCallback((total: number): JSX.Element => {
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
  }, []);

  const renderHistogram = useCallback(() => {
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
  }, [product]);
  const handleThumbnailClick = useCallback((index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
    }
  }, []);
  // write review
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const getProductInfo = useCallback(async () => {
    if (handle) {
      try {
        const res = await getProduct({ handle }).unwrap();
        setProduct(res.data.product);
        setReviewFormData({
          ...reviewFormData,
          product_id: res.data.product.id
        });
      } catch (error) {
        navigate(paths.error);
      }
    }
  }, []);
  useEffect(() => {
    Currency.initializeCurrency();
  }, [product]);
  useEffect(() => {
    getProductInfo();

    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: product.title }
        ]
      })
    );
    const cleanupInterval = randomShowLiveView();
    return () => {
      cleanupInterval();
    };
  }, []);
  const [addWishlist, { isLoading: addWishlistIsLoading }] = useAddWishlistMutation();
  const [removeWishlist, { isLoading: removeWishlistIsLoading }] = useRemoveWishlistMutation();
  const [getUserInfo] = useGetInfoMutation();

  const handleAddWishList = useCallback(async () => {
    if (user) {
      try {
        await addWishlist({
          product_id: product.id
        }).unwrap();
        const updateUser = await getUserInfo().unwrap();
        dispatch(setUser(updateUser.data));
      } catch (error) {}
    }
  }, [user, product]);
  const wishlist =
    user &&
    user.wishlists?.filter((item: any) => {
      return item.product_id == product.id;
    });

  const handleRemoveWishList = useCallback(
    async (id: number) => {
      if (user && id) {
        try {
          await removeWishlist({
            id: id
          }).unwrap();
          const updateUser = await getUserInfo().unwrap();
          dispatch(setUser(updateUser.data));
        } catch (error) {}
      }
    },
    [user, product]
  );
  const handleSubmitReview = useCallback(async () => {
    const errors: any = await reviewValidate(reviewFormData);
    if (Object.keys(errors).length === 0) {
      try {
        const res = await addReview({ handle: product.handle, data: reviewFormData }).unwrap();
        setReviewFormData(initialReview);
        const newReviews = [res.data.review, ...product.reviews];

        setProduct((prev: any) => {
          return {
            ...prev,
            reviews: newReviews
          };
        });
      } catch (error) {}
    }
  }, [reviewFormData]);

  const handleRemoveReview = useCallback(
    async (id: number) => {
      try {
        await removeReview({
          handle: product.handle,
          data: {
            id: id
          }
        }).unwrap();
        const updatedReviews = product.reviews.filter((review) => review.id !== id);
        setProduct((prev) => {
          return {
            ...prev,
            reviews: updatedReviews
          };
        });
      } catch (error) {}
    },
    [product]
  );

  return (
    <div className={cx('product-page')}>
      <div className={cx('page-content')}>
        <div className={cx('productView-top', 'mb-[50px]')}>
          <div className={cx('productView-left', 'phoneUp:pr-[20px]')}>
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
                            <img
                              data-fancybox="gallery"
                              className={cx('h-[100%] w-[100%]')}
                              src={item.url}
                              alt="error"
                            />
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
                            src={item.url}
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
            <div className={cx('productView__right-item', 'reviews-badge')}>
              <a href="#section-reviews" className="flex w-[fit-content] items-center gap-[5px]">
                <div className={cx('reviews-star')}>{renderStar(totalReview)}</div>
                <p className={cx('text-start')}>{product.reviews.length} reviews</p>
              </a>
            </div>

            <div className={cx('productView__right-item', 'price')}>
              <div className={cx('price-item', 'price__item-regular')}>
                <span data-currency-value={product.price} className={cx('money')}>
                  {product.price}
                </span>
              </div>
            </div>
            <div className={cx('productView__right-item', 'description', 'font-normal opacity-80')}>
              {product.description}
            </div>
            <div className="form-AddToCart">
              {product.variants && (
                <div className={cx('productView__right-item', 'product-variant')}>
                  <ProductVariantComponent product={product} />
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
                Subtotal:
                <span className="sub-total-value ml-[5px] font-[900]">
                  <span data-currency-value="10000" className="money">
                    10000
                  </span>
                </span>
              </div>
              <div
                className={cx('productView__right-item', 'product-action', 'mt-[20px] flex items-center gap-[10px]')}
              >
                <AddToCartComponent product={product} className={cx('mt-[unset] w-[100%]')} />
                <div
                  className={cx(
                    'wish-list',
                    'cursor-pointer rounded-[50%] border border-solid border-[#c7c7c7] p-[10px]',
                    user && wishlist.length > 0 && 'is-activated'
                  )}
                  onClick={() => {
                    if (!user) {
                      toast.warning('Please log in to continue');
                      return;
                    }
                    user && !(wishlist.length > 0)
                      ? handleAddWishList()
                      : handleRemoveWishList(wishlist && wishlist[0]?.id);
                  }}
                >
                  <WishListIcon />
                </div>
              </div>
            </div>
            <div className={cx('productView__right-item', 'delivery-return', 'mt-[20px] flex items-center gap-[20px]')}>
              <div className={cx('icon', 'max-w-[25px]')}>
                <DeliveryIcon />
              </div>
              <p>
                Estimate delivery times:<strong> 3-5 days International.</strong>
              </p>
            </div>
            <div className={cx('productView__right-item', 'live-view', 'mt-[20px] flex items-center gap-[20px]')}>
              <div className={cx('icon', 'max-w-[25px]')}>
                <EyeIcon />
              </div>
              <p>
                <span ref={refLiveViewCount}>25</span> peoples are viewing this right now
              </p>
            </div>
            <div className={cx('productView__right-item', 'product-tabs', 'mt-[40px]')}>
              <div id="description-tab" className="tab py-[10px]">
                <CollapsibleBlock className="text-[16px] font-bold" title="Product Details">
                  <p className="pb-[20px]">{product.description}</p>
                </CollapsibleBlock>
              </div>
              <div id="additional-information-tab" className="tab py-[10px]">
                <CollapsibleBlock className="text-[16px] font-bold" title="Additional Information">
                  <p className="pb-[20px]">{product.description}</p>
                </CollapsibleBlock>
              </div>
            </div>
          </div>
        </div>
        <div id="section-reviews" className={cx('section-reviews')}>
          <div className={cx('section-header')}>
            <h3 className="title">
              <span className="text">Customer Reviews</span>
            </h3>
            <div className={cx('section__header-top', 'mt-[40px] flex items-center justify-between phone:flex-col')}>
              <div className={cx('stars-summary', 'phone:w-full')}>
                <div className={cx('stars__summary-star')}>Base on 5 reviews</div>
                <div className={cx('stars__summary-star')}>{renderStar(totalReview)}</div>
              </div>
              <div className={cx('stars', 'phone:w-full')}>{renderHistogram()}</div>
              <div className={cx('review-action', 'min-w-[240px] phone:mt-[20px]')}>
                {showWritingReviewSection ? (
                  <ButtonComponent
                    className="bg-white text-black"
                    onClick={() => {
                      setShowWritingReviewSection(false);
                    }}
                  >
                    Cancel Review
                  </ButtonComponent>
                ) : (
                  <ButtonComponent
                    onClick={() => {
                      if (user) {
                        setShowWritingReviewSection(true);
                      } else {
                        toast.warning('Please log in before writing a review');
                      }
                    }}
                  >
                    Write a review
                  </ButtonComponent>
                )}
              </div>
            </div>
          </div>
          {showWritingReviewSection && (
            <div className={cx('review-form')}>
              <div className="line"></div>
              <div className={cx('field')}>
                <label htmlFor="rating-review">
                  <span>Rating</span>
                  {reviewErrors.rating && <span className="error">{reviewErrors.rating}</span>}
                </label>
                <Rate
                  id="rating-review"
                  onChange={(value) => {
                    setReviewFormData({ ...reviewFormData, rating: value });
                  }}
                  value={reviewFormData.rating}
                />
              </div>
              <div className={cx('field')}>
                <label htmlFor="">
                  <span>Review Title</span>
                  {reviewErrors.title && <span className="error">{reviewErrors.title}</span>}
                </label>
                <InputComponent
                  onChange={handleReviewChange}
                  name="title"
                  className={cx('mt-[0]')}
                  placeholder="Give your review a title"
                  value={reviewFormData.title}
                />
              </div>
              <div className={cx('field')}>
                <label htmlFor="">
                  <span>Review</span>
                  {reviewErrors.content && <span className="error">{reviewErrors.content}</span>}
                </label>
                <textarea
                  onChange={handleReviewChange}
                  value={reviewFormData.content}
                  name="content"
                  className="min-h-[12rem] w-full rounded-[10px] border p-[10px] outline-none"
                  form="cart"
                  id="Cart-note"
                  placeholder="Write your comment here"
                  data-listener-added_e50af269="true"
                ></textarea>
              </div>
              <div className={cx('field')}>
                <label htmlFor="">Picture(optional)</label>
                <div>
                  <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
                    {fileList.length >= 2 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: 'none' }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage('')
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
              </div>
              <div className={cx('form-action', 'flex gap-[10px]')}>
                <ButtonComponent
                  onClick={() => {
                    setShowWritingReviewSection(false);
                  }}
                  className="bg-[white] text-black"
                >
                  Cancel Review
                </ButtonComponent>
                <ButtonComponent isLoading={isAddReviewLoading} onClick={handleSubmitReview}>
                  Submit review
                </ButtonComponent>
              </div>
              <div className="line"></div>
            </div>
          )}

          {product.reviews.length > 0 && (
            <div className={cx('review-list mt-[50px]')}>
              {product.reviews.map((review, index) => {
                return (
                  <div key={index}>
                    <ReviewItemComponent
                      callback={renderStar}
                      review={review}
                      handleRemoveReview={handleRemoveReview}
                    ></ReviewItemComponent>
                    {index != product.reviews?.length - 1 && <div className="line my-[30px]"></div>}
                  </div>
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
