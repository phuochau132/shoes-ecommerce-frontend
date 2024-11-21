import React, { memo, CSSProperties } from 'react';
import classNames from 'classnames/bind';
import styles from './product-card.module.scss';
import { Collection } from '@/types/collection';
import ProductCardComponent from '../card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ProductBlockProps {
  style?: CSSProperties;
  collection: Collection;
}

const cx = classNames.bind(styles);

const ProductBlockComponent: React.FC<ProductBlockProps> = memo(({ collection }) => {
  return (
    <section className={cx('section-product-block')}>
      <div className={cx('section-header')}>
        <h3 className={cx('title')}>
          <span className={cx('text')}>New Arrivals</span>
        </h3>
        <div className="view-all">
          <a className={cx('link')} href="/collections/collections-home-shoes-new-arrivals" title="View all">
            View all
          </a>
        </div>
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
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 }
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
});

export default ProductBlockComponent;
