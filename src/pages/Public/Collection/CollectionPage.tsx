import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './collection.module.scss';
import { CollectionType } from '@/types/collection';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarComponent from './component/sidebar';
import ProductCardComponent from '@/components/products/card';
import { FilterIcon, GridModeIcon1, GridModeIcon2, GridModeIcon3, GridModeIcon4 } from '@/utils/icons';
import { useDispatch } from 'react-redux';
import { setFilterSidebarState, setPageInfo } from '@/redux/slice/app/app.slice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetCollectionMutation } from '@/apis/collection/collection.api';
import LoaderComponent from '@/components/commons/loader';
import { Currency } from '@/utils/helpers/currenciesFormat';
import PaginatorComponent from '@/components/commons/paginator';

const cx = bindClassNames(styles);

const CollectionPage: React.FC = () => {
  const gridModeRefs = useRef<HTMLDivElement[]>([]);
  const productGridRef = useRef<HTMLDivElement>(null);
  const filterSidebarState = useSelector((state: any) => state.app.filterSidebarState);
  const [getCollection, { isLoading }] = useGetCollectionMutation();
  const [collection, setCollection] = useState<CollectionType>();
  const [firstCollection, setFirstCollection] = useState<CollectionType>();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { handle } = useParams();
  const [numberOfPage, setNumberOfPage] = useState(1);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const modeIsActivated = gridModeRefs.current.find((item) => item.classList.contains('is-activated'));
    modeIsActivated?.classList.remove('is-activated');
    target.classList.add('is-activated');

    if (productGridRef.current) {
      productGridRef.current.className = productGridRef.current.className
        .split(' ')
        .filter((cls) => !cls.startsWith('col-'))
        .join(' ');

      const col = target.getAttribute('data-grid');
      if (col) {
        productGridRef.current.classList.add(`col-${col}`);
      }
    }
  }, []);

  const handleGetProducts = useCallback(async () => {
    if (handle) {
      try {
        const response = await getCollection({
          handle: handle,
          query: window.location.search ? window.location.search.split('?')[1] : ''
        }).unwrap();
        setPage(1);
        setCollection(response.data);
        setFirstCollection(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [handle]);

  const handleShowMore = async () => {
    if (!handle) return;
    try {
      const newPage = page + 1;
      await handleFilter(newPage);
      setPage(newPage);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (collection) {
      if (window.innerWidth < 768) {
        gridModeRefs.current[0]?.click();
      } else {
        gridModeRefs.current[2]?.click();
      }
      dispatch(
        setPageInfo({
          breadcrumb: [
            { path: '/', title: 'Home' },
            { path: '#', title: collection.name }
          ],
          title: 'Products'
        })
      );
    }
    setNumberOfPage(Math.ceil(parseInt(collection?.total as any) / 8));
  }, [collection]);

  useEffect(() => {
    handleGetProducts();
  }, []);
  useEffect(() => {
    if (collection) {
      Currency.initializeCurrency();
    }
  }, [collection]);
  const handleFilter = async (page?: number) => {
    const searchParams = await getSearchParams();
    window.history.pushState({}, '', `${handle}?${searchParams}`);
    if (handle) {
      const response = await getCollection({
        handle: handle,
        query: `${searchParams}${page ? `&page=${page}` : ''}`
      }).unwrap();
      if (!page) {
        setCollection(response.data);
        setPage(1);
      } else {
        // @ts-ignore
        setCollection((prev: CollectionType) => ({
          ...prev,
          products: [...prev.products, ...response.data.products]
        }));
      }
    }
  };
  const getSearchParams = async () => {
    const form = document.querySelector('.sidebar-wrapper') as HTMLFormElement;
    const formData = new FormData(form);
    let searchParams = new URLSearchParams(formData as any).toString();
    return searchParams;
  };
  return (
    <div className={cx('collection-page', 'relative min-h-[400px]')}>
      {isLoading && page == 0 && <LoaderComponent></LoaderComponent>}
      {collection && (
        <div className={cx('collection-content', 'flex items-start')}>
          <div
            className={cx(
              'collection__content-sidebar',
              {
                'phone:opacity-[1]': filterSidebarState,
                'phone:translate-x-[0%]': filterSidebarState,
                'phone:-translate-x-full': !filterSidebarState
              },
              'top-[0] bg-[white] phone:fixed phone:bottom-[0] phone:left-[0] phone:z-[3] phone:p-[20px] phone:opacity-[0]'
            )}
          >
            {firstCollection && <SidebarComponent callback={handleFilter} products={firstCollection.products} />}
          </div>
          <div className={cx('collection__content-grid', 'relative pl-[50px] phone:pl-[0]')}>
            <div className={cx('collection-heading', 'mb-[20px] pl-[10px] pr-[10px]')}>
              <h1 className={cx('title', 'heading font-[700]')}>{collection.name}</h1>
              <p className={cx('description', 'mt-[10px] text-[15px]')}>
                <span className={cx('text', 'font-normal italic')}>{collection.description}</span>
              </p>
            </div>
            <div className={cx('toolbar', 'flex justify-between pl-[10px] pr-[10px]')}>
              <div className={cx('result', 'phone:hidden')}>
                <p className={cx('text font-normal text-[#444444]')}>
                  There are <span className="font-bold">{collection.total} results</span> in total
                </p>
              </div>
              <button
                onClick={() => {
                  dispatch(setFilterSidebarState(true));
                }}
                className={cx(
                  'hidden items-center gap-[6px] rounded-[3px] bg-primary-color p-[5px] pl-[10px] pl-[10x] pr-[10px] text-[white] phone:flex'
                )}
              >
                <FilterIcon />
                Filter
              </button>
              <div className={cx('grid-mode', 'flex gap-[10px]')}>
                {[2, 3, 4].map((grid, index) => (
                  <div
                    key={grid}
                    ref={(el) => {
                      if (el) {
                        gridModeRefs.current[index] = el;
                      }
                    }}
                    data-grid={grid}
                    className={cx('grid_mode-item', { 'phone:hidden': grid == 3 || grid == 4 })}
                    onClick={handleClick}
                  >
                    {grid === 2 ? <GridModeIcon2 /> : grid === 3 ? <GridModeIcon3 /> : <GridModeIcon4 />}
                  </div>
                ))}
                <div
                  ref={(el) => {
                    if (el) {
                      gridModeRefs.current[3] = el;
                    }
                  }}
                  data-grid={1}
                  className={cx('grid_mode-item', 'hidden phone:block')}
                  onClick={handleClick}
                >
                  <GridModeIcon1 />
                </div>
              </div>
            </div>
            <div ref={productGridRef} className={cx('product-grid', 'mt-[30px] flex flex-wrap')}>
              {collection.products.map((product, index) => (
                <div key={index} className={cx('product', 'p-[10px]')}>
                  <ProductCardComponent product={product} />
                </div>
              ))}
              {numberOfPage != page && numberOfPage > 1 && (
                <PaginatorComponent
                  isLoading={isLoading}
                  handleShowMore={handleShowMore}
                  className="m-auto mt-[30px] w-full max-w-[300px]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
