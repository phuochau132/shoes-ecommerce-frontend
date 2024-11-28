import React, { memo, CSSProperties } from 'react';
import styles from './product-card.module.scss';
import { Collection } from '@/types/collection';
import ProductCardComponent from '../card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bindClassNames } from '@/utils/helpers/cx';

interface ProductBlockProps {
  style?: CSSProperties;
  collection: Collection;
  title: string;
  viewAllButton?: boolean;
}

const cx = bindClassNames(styles);

const ProductBlockComponent: React.FC<ProductBlockProps> = memo(
  ({ collection, title, viewAllButton = false, style }) => {
    return (
      <section style={style} className={cx('section-product-block')}>
        <div className={cx('section-header', 'mb-[30px]')}>
          <h3 className={cx('title')}>
            <span className={cx('text')}>{title ? title : ' New Arrivals'}</span>
          </h3>
          {viewAllButton && (
            <div className="view-all">
              <a className={cx('link')} href="/collections/collections-home-shoes-new-arrivals" title="View all">
                View all
              </a>
            </div>
          )}
        </div>
        <div className={cx('section-content')}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            slidesPerGroup={2}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              1024: { slidesPerView: 5 },
              768: { slidesPerView: 3 },
              0: { slidesPerView: 2 }
            }}
          >
            {collection.products?.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCardComponent product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }
);

export default ProductBlockComponent;
