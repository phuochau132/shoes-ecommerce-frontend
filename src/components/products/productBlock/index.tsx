import React, { memo, CSSProperties, useEffect, useState, useRef } from 'react';
import styles from './product-block.module.scss';
import ProductCardComponent from '../card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import { useGetCollectionMutation } from '@/apis/collection/collection.api';
import ProductCardLoadingComponent from '../cardLoading';
import { Currency } from '@/utils/helpers/CurrenciesFormat';

interface ProductBlockProps {
  style?: CSSProperties;
  collectionHandle: string;
  title?: string;
  viewAllButton?: boolean;
  limit?: number;
  titleClass?: string;
  sectionClass?: string;
  useHeader?: boolean;
}

const cx = bindClassNames(styles);

const ProductBlockComponent: React.FC<ProductBlockProps> = memo(
  ({
    collectionHandle,
    title,
    viewAllButton = false,
    useHeader = true,
    sectionClass,
    style,
    limit = 20,
    titleClass
  }) => {
    const [products, setProduct] = useState([]);
    const [getCollection] = useGetCollectionMutation();
    const sectionRef = useRef<HTMLDivElement>(null);

    const handleGetProducts = async () => {
      const response = await getCollection({
        handle: collectionHandle
      }).unwrap();
      setProduct(response.data.products);
    };

    useEffect(() => {
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains('is-loaded')) {
            handleGetProducts();
            entry.target.classList.add('is-loaded');
          }
        }
      };
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5
      });
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
    useEffect(() => {
      Currency.initializeCurrency();
    }, [products]);
    return (
      <section ref={sectionRef} style={style} className={cx('section-product-block', sectionClass && sectionClass)}>
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
          {products && products.length > 0 ? (
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
          ) : (
            <div className="products flex">
              {Array.from({ length: 4 }).map(() => {
                return (
                  <ProductCardLoadingComponent className="phone::min-w-[50%] w-full mobileTablet:min-w-[33%] mobileTabletUp:min-w-[25%]" />
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }
);

export default ProductBlockComponent;
