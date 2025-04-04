import React, { memo, CSSProperties, useEffect, useState, useRef } from 'react';
import styles from './product-block.module.scss';
import ProductCardComponent from '../card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import { useGetCollectionMutation } from '@/apis/collection/collection.api';
import ProductCardLoadingComponent from '../cardLoading';
import { Currency } from '@/utils/helpers/currenciesFormat';
import PaginatorComponent from '@/components/commons/paginator';
import { useGetProductsByIdsMutation } from '@/apis/product/product.api';

interface ProductBlockProps {
  style?: CSSProperties;
  collectionHandle?: string;
  title?: string;
  viewAllButton?: boolean;
  limit?: number;
  titleClass?: string;
  sectionClass?: string;
  useHeader?: boolean;
  layout?: string;
  type?: string;
}

const cx = bindClassNames(styles);
const ProductBlockComponent: React.FC<ProductBlockProps> = memo(
  ({
    collectionHandle = '',
    title,
    viewAllButton = false,
    useHeader = true,
    sectionClass,
    style,
    limit = 8,
    titleClass,
    layout = 'slider',
    type = 'normal'
  }) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [getCollection, { isLoading }] = useGetCollectionMutation();
    const [fetchProducts] = useGetProductsByIdsMutation();
    const [page, setPage] = useState(1);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const handleGetProducts = async () => {
      let query = `limit=${Number.MAX_SAFE_INTEGER}`;
      if (layout == 'grid') {
        query = `page=${page}&limit=${limit}`;
      }
      try {
        if (type == 'normal') {
          const response = await getCollection({
            handle: collectionHandle,
            query: query
          }).unwrap();
          setNumberOfPage(Math.ceil(parseInt(response.data.total) / limit));
          setProducts(response.data.products);
        }
        if (type == 'recently-viewed') {
          const storedItems = localStorage.getItem('recently-viewed');
          const recentlyViewedIds: string[] = storedItems ? JSON.parse(storedItems) : [];
          const response = await fetchProducts({ ids: recentlyViewedIds }).unwrap();
          setProducts(response.data.products);
        }
      } catch (error) {}
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
    const handleShowMore = async () => {
      try {
        const response = await getCollection({
          handle: collectionHandle,
          query: `page=${page + 1}&limit=${limit}`
        }).unwrap();
        setPage(page + 1);
        setProducts((prev) => [...prev, ...response.data.products]);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <section ref={sectionRef} style={style} className={cx('section-product-block', sectionClass && sectionClass)}>
        {useHeader && (
          <div className={cx('section-header', 'mb-[30px]')}>
            <h3 className={cx('title')}>
              <span className={cx('text', titleClass && titleClass)}>{title}</span>
            </h3>
            {viewAllButton && (
              <div className="view-all">
                <a className={cx('link')} href={`/collections/${collectionHandle}`} title="View all">
                  View all
                </a>
              </div>
            )}
          </div>
        )}
        <div className={cx('section-content')}>
          {layout == 'slider' ? (
            products && products.length > 0 ? (
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
                {Array.from({ length: 5 }).map(() => {
                  return (
                    <ProductCardLoadingComponent className="mediumDesktop:min-w-[25%] w-full p-[10px] phone:min-w-[50%] tablet:min-w-[33%] largeDesktop:min-w-[20%]" />
                  );
                })}
              </div>
            )
          ) : (
            <div className="product-grid relative min-h-[200px]">
              {products && products.length > 0 ? (
                <>
                  <div className="products flex-column flex flex-wrap">
                    {products?.map((item: ProductType, index: number) => {
                      return (
                        <ProductCardComponent
                          key={index}
                          className="mediumDesktop:max-w-[25%] w-full p-[10px] phone:max-w-[50%] tablet:max-w-[33%] mobileTabletUp:max-w-[25%]"
                          product={item}
                        />
                      );
                    })}
                  </div>
                  {numberOfPage != page && (
                    <PaginatorComponent isLoading={isLoading} handleShowMore={handleShowMore} className="mt-[30px]" />
                  )}
                </>
              ) : (
                <div className="products flex flex-wrap">
                  {Array.from({ length: 4 }).map(() => {
                    return (
                      <ProductCardLoadingComponent className="mediumDesktop:max-w-[25%] w-full p-[10px] phone:max-w-[50%] tablet:max-w-[33%] mobileTabletUp:max-w-[25%]" />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }
);

export default ProductBlockComponent;
