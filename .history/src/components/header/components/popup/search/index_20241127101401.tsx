// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './search.module.scss';
import { CloseIcon, SearchIcon } from '@/utils/icons';
import { useDispatch } from 'react-redux';
import { setSearchPopupState } from '@/redux/app/app.slice';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const SearchPopup: React.FC = memo(() => {
  const dispatch = useDispatch();

  return (
    <div className={cx('search-popup', 'fixed left-0 right-0 top-0 z-[3] w-full bg-[white] px-[15%]')}>
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
      <div className={cx('search__popup-predictive', 'flex', 'gap-[20px]', 'py-[20px]', 'w-full', 'items-center')}>
        <input type="text" placeholder="Search for a product..." className="flex-1" />
        <SearchIcon style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
});

export default SearchPopup;
