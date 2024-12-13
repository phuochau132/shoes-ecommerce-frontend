// AnnouncementBar.tsx
import React, { memo, useState } from 'react';
import styles from './search.module.scss';
import { CloseIcon, SearchIcon } from '@/utils/icons';
import { useDispatch } from 'react-redux';
import { setSearchPopupState } from '@/redux/app/app.slice';
import { bindClassNames } from '@/utils/helpers/cx';
import ProductBlockComponent from '@/components/products/productBlock';
import { sampleProducts } from '../../sidebar/cart';

const cx = bindClassNames(styles);
let isChecked = false;
const listTrendingSearch = [
  { link: '#', title: 'dempus' },
  { link: '#', title: 'sample' },
  { link: '#', title: 'magnis' },
  { link: '#', title: 'loremous saliduar' }
];
const SearchPopup: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [showSearchBlock, setShowSearchBlock] = useState<boolean>(false);
  const [showPredictResult, setShowPredictResult] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div
      className={cx(
        'search-popup',
        'fixed left-0 right-0 top-0 z-[3] w-full bg-[white] phone:px-[10px] phoneUp:px-[15%]'
      )}
    >
      <div className={cx('search__popup-close', 'h-[auto]', 'cursor-pointer', 'text-right')}>
        <div
          onClick={() => {
            dispatch(setSearchPopupState(false));
          }}
          className={cx('search__popup-close-wrapper rotate', 'float-right', 'py-[10px]')}
        >
          <CloseIcon style={{ float: 'right' }} />
        </div>
      </div>
      <div className={cx('search__popup-inputSearch', 'flex', 'gap-[20px]', 'py-[20px]', 'w-full', 'items-center')}>
        <input
          onFocus={() => {
            if (!isChecked) {
              setShowSearchBlock(true);
            }
            setIsChecked(true);
          }}
          onChange={(event) => {
            if (event.target.value) {
              setShowPredictResult(true);
              setShowSearchBlock(false);
            } else {
              setShowPredictResult(false);
              setShowSearchBlock(true);
            }
          }}
          type="text"
          placeholder="Search for a product..."
          className="flex-1 border-x-0 border-b border-t-0 border-[#333] p-[10px] outline-none"
        />
        <SearchIcon style={{ cursor: 'pointer' }} />
      </div>
      {(showSearchBlock || showPredictResult) && (
        <div
          style={{ maxHeight: 'calc(80vh - 130px)' }}
          className={cx(
            'search__popup-predictSearch',
            'margin absolute top-[100%] w-full animate-slide overflow-y-auto border-t bg-white px-[15px] py-[18px] phone:left-[0] phoneUp:max-w-[70vw]'
          )}
        >
          {showSearchBlock && (
            <div className="quickSearch-block">
              <div className="quickSearch__block-header">
                <div className="title font-bold">Trending Now</div>
                <div className="line my-[10px]"></div>
                <ul className="list-trending-search flex gap-[10px]">
                  {listTrendingSearch.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="item inline-block rounded-[5px] bg-[#e5e5e5] px-[10px] py-[5px] opacity-[0.5] duration-300 hover:opacity-[1]"
                      >
                        <a className="link flex items-center gap-[5px]" href="/search?q=dempus*&amp;type=product">
                          <SearchIcon className="h-[15px] w-[15px] rotate-[270deg]" />
                          <span className="text text-[12px]">{item.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="line"></div>
              <div className="quickSearch-productBlock my-[10px]">
                <ProductBlockComponent
                  sectionClass="pt-[0]"
                  titleClass="text-[14px] font-bold not-italic block text-start"
                  limit={4}
                  title="Popular Products"
                  collection={sampleProducts}
                ></ProductBlockComponent>
              </div>
            </div>
          )}
          {showPredictResult && (
            <div className="quickSearch-results">
              <div className="title font-bold">Product Results</div>
              <div className="line"></div>
              <ProductBlockComponent
                sectionClass="pt-[0]"
                titleClass="text-[14px] font-bold not-italic block text-start"
                limit={4}
                title="Popular Products"
                collection={sampleProducts}
                useHeader={false}
              ></ProductBlockComponent>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default SearchPopup;
