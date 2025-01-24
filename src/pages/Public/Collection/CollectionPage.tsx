import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

const cx = bindClassNames(styles);

const CollectionPage: React.FC = () => {
  const gridModeRefs = useRef<HTMLDivElement[]>([]);
  const productGridRef = useRef<HTMLDivElement>(null);
  const filterSidebarState = useSelector((state: any) => state.app.filterSidebarState);
  const [getCollection, { isLoading }] = useGetCollectionMutation();
  const [collection, setCollection] = useState<CollectionType>();
  const [firstCollection, setFirstCollection] = useState<CollectionType>();
  const dispatch = useDispatch();
  const { handle } = useParams();
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
      const response = await getCollection({
        handle: handle,
        query: window.location.search ? window.location.search.split('?')[1] : ''
      }).unwrap();
      setCollection(response.data);
      setFirstCollection(response.data);
    }
  }, [handle]);
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
  }, [collection]);
  useEffect(() => {
    handleGetProducts();
  }, []);
  const handleFilter = async (searchParams: string) => {
    window.history.pushState({}, '', `${handle}?${searchParams}`);
    if (handle) {
      const response = await getCollection({
        handle: handle,
        query: searchParams
      }).unwrap();
      setCollection(response.data);
    }
  };
  return (
    <div className={cx('collection-page')}>
      {collection && (
        <div className={cx('collection-content', 'flex')}>
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
          <div className={cx('collection__content-grid', 'pl-[50px] phone:pl-[0]')}>
            <div className={cx('collection-heading', 'mb-[20px] pl-[10px] pr-[10px]')}>
              <h1 className={cx('title', 'heading font-[700]')}>{collection.name}</h1>
              <p className={cx('description', 'mt-[10px] text-[15px] font-[500] text-[bold]')}>
                <span className={cx('text', 'font-normal')}>{collection.description}</span>
              </p>
            </div>
            <div className={cx('toolbar', 'flex justify-between pl-[10px] pr-[10px]')}>
              <div className={cx('result', 'phone:hidden')}>
                <p className={cx('text font-normal text-[#444444]')}>There are 18 results in total</p>
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
            <div ref={productGridRef} className={cx('product-grid', 'relative mt-[30px] flex flex-wrap')}>
              {isLoading && <LoaderComponent />}
              {collection.products.map((product, index) => (
                <div key={index} className={cx('product', 'p-[10px]')}>
                  <ProductCardComponent product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
