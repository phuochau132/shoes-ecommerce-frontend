import React, { memo, CSSProperties } from 'react';
import styles from './product-block.module.scss';
import { CollectionType } from '@/types/collection';
import ProductCardComponent from '../card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';

interface ProductBlockProps {
  style?: CSSProperties;
  collection: CollectionType;
  title: string;
  viewAllButton?: boolean;
  limit?: number;
  titleClass?: string;
  sectionClass?: string;
  useHeader?: boolean;
}

const cx = bindClassNames(styles);

const ProductBlockComponent: React.FC<ProductBlockProps> = memo(
  ({ collection, title, viewAllButton = false, useHeader = true, sectionClass, style, limit = 20, titleClass }) => {
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
            {collection.products?.map((item: ProductType, index: number) => {
              if (index < limit) {
                return (
                  <SwiperSlide key={index}>
                    <ProductCardComponent product={item} />
                  </SwiperSlide>
                );
              }
              return null;
            })}
          </Swiper>
        </div>
      </section>
    );
  }
);

export default ProductBlockComponent;
