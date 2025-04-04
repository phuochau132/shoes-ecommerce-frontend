import React, { memo, CSSProperties, useEffect, useState } from 'react';
import styles from './quickView.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import Fancybox from '@/utils/helpers/fancybox';
import { useSelector } from 'react-redux';
import ProductReviewComponent from '../productReview';
import ProductVariantComponent from '../productVariant';
import QuantityBoxComponent from '../quantity';
import { DeliveryIcon } from '@/utils/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Controller } from 'swiper/modules';
import { Currency } from '@/utils/helpers/currenciesFormat';
import AddToCartComponent from '../addToCart';
import { AddToCartForm } from '@/pages/Public/Product/ProductPage';
interface QuickViewComponentProps {
  style?: CSSProperties;
  product: ProductType;
}
const cx = bindClassNames(styles);
const QuickViewComponent: React.FC<QuickViewComponentProps> = memo(({}) => {
  const product = useSelector((state: any) => state.app.quickViewInfo.product);
  const [canPurchase, setCanPurchase] = useState<boolean>(false);
  const [addToCartForm, setAddToCartForm] = useState<AddToCartForm>({
    productId: parseInt(product.id as any),
    quantity: 1
  });
  useEffect(() => {
    setCanPurchase(product.quantity > 0);
    if (!product.variants.length) {
      setQuantityInStock(product.quantity);
    }
  }, [product]);

  const [quantityInStock, setQuantityInStock] = useState<number>(0);
  const [isAllVariantsSelected, setIsAllVariantsSelected] = useState(false);
  useEffect(() => {
    Currency.initializeCurrency();
  }, []);

  return (
    <>
      <div className={cx('productView-left', 'phoneUp:pr-[20px]', 'phoneUp:max-w-[50%]')}>
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
                  className={cx('swiper-container')}
                >
                  {product.images.map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                      <div className={cx('media')}>
                        <img data-fancybox="gallery" className={cx('h-[100%] w-[100%]')} src={item.url} alt="error" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </Fancybox>
        </div>
      </div>
      <div className={cx('productView-right', 'w-full phone:mt-[30px] phone:px-[20px] phoneUp:max-w-[50%]')}>
        <h1 className={cx('productView__right-item', 'title')}>
          <span className={cx('text', 'text-[30px] font-[600] italic phone:text-[25px]')}>{product.title}</span>
        </h1>
        <div className={cx('productView__right-item', 'reviews-badge')}>
          <a href="#section-reviews" className="flex w-[fit-content] items-center gap-[5px]">
            <div className={cx('reviews-star')}>
              <ProductReviewComponent product={product} />
            </div>
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
        {product.variants && (
          <div className={cx('productView__right-item', 'product-variant')}>
            <ProductVariantComponent
              isQuickView={true}
              callback={(variantId, isAllVariantSelected, quantityInStock, canPurchase) => {
                if (variantId) {
                  setAddToCartForm({
                    ...addToCartForm,
                    variantId
                  });
                }
                setIsAllVariantsSelected(isAllVariantSelected);
                if (quantityInStock) {
                  setQuantityInStock(quantityInStock);
                }
                setCanPurchase(canPurchase);
              }}
              product={product}
            />
          </div>
        )}
        <div className={cx('productView__right-item', 'product-quantity', 'mt-[20px]')}>
          <label className={cx('quantity-label')} htmlFor="">
            Quantity:
          </label>
          <div className={cx('mt-[10px]')}>
            <QuantityBoxComponent
              onChange={(event) => {
                setAddToCartForm({
                  ...addToCartForm,
                  quantity: parseInt(event.target.value)
                });
                setCanPurchase(parseInt(event.target.value) <= quantityInStock);
              }}
              callback={(quantity) => {
                setAddToCartForm({
                  ...addToCartForm,
                  quantity: quantity
                });
                setCanPurchase(quantity <= quantityInStock);
              }}
            />
          </div>
        </div>
        <div className={cx('productView__right-item', 'sub-total', 'mt-[20px] font-normal')}>
          Subtotal:
          <span className="sub-total-value ml-[5px] font-[900]">
            <span data-currency-value="10000" className="money">
              100000
            </span>
          </span>
        </div>
        <div className={cx('productView__right-item', 'product-action', 'mt-[20px] flex items-center gap-[10px]')}>
          <AddToCartComponent
            isAllVariantsSelected={isAllVariantsSelected}
            // @ts-ignore
            dataAddToCart={addToCartForm}
            product={product}
            className={cx('mt-[unset] w-[100%]')}
            canPurchase={canPurchase}
          />
        </div>
        <div className={cx('productView__right-item', 'delivery-return', 'mt-[20px] flex items-center gap-[20px]')}>
          <div className={cx('icon', 'max-w-[25px]')}>
            <DeliveryIcon />
          </div>
          <p>
            Estimate delivery times:<strong> 3-5 days International.</strong>
          </p>
        </div>
      </div>
    </>
  );
});

export default QuickViewComponent;
