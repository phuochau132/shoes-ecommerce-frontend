import React, { memo, CSSProperties, useEffect, useState, useRef } from 'react';
import styles from '../productBlock/product-block.module.scss';
import ProductCardComponent from '../card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import { Currency } from '@/utils/helpers/CurrenciesFormat';

interface ProductBlockProps {
  style?: CSSProperties;
  products: ProductType[];
  title?: string;
  viewAllButton?: boolean;
  limit?: number;
  titleClass?: string;
  sectionClass?: string;
  useHeader?: boolean;
}

const cx = bindClassNames(styles);

const NormalProductBlockComponent: React.FC<ProductBlockProps> = memo(
  ({ products, title, viewAllButton = false, useHeader = true, sectionClass, style, limit = 20, titleClass }) => {
    useEffect(() => {
      Currency.initializeCurrency();
    }, [products]);
    return (
      <section style={style} className={cx('section-product-block', sectionClass && sectionClass)}>
        {useHeader && (
          <div className={cx('section-header', 'mb-[30px]')}>
            <h3 className={cx('title')}>
              <span className={cx('text', titleClass && titleClass)}>{title ? title : 'New Arrivals'}</span>
            </h3>
            {viewAllButton && (
              <div className="view-all">
                <a className={cx('link')} href="/collections/collections-home-shoes-new-arrivals" title="View all">
                  View all
                </a>
              </div>
            )}
          </div>
        )}
        <div className={cx('section-content')}>
          {products && products.length > 0 && (
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={4}
              slidesPerGroup={2}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                1200: { slidesPerView: 5 },
                1024: { slidesPerView: 4 },
                768: { slidesPerView: 3 },
                0: { slidesPerView: 2 }
              }}
            >
              {products?.map((item: ProductType, index: number) => {
                if (index < limit) {
                  return (
                    <SwiperSlide key={index}>
                      <ProductCardComponent product={item} />
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          )}
        </div>
      </section>
    );
  }
);

export default NormalProductBlockComponent;
