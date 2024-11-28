import React, { memo } from 'react';
import styles from './sidebar.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import CollapsibleBlock from '@/components/commons/collapse';
import { CheckedIcon } from '@/utils/icons';

const cx = bindClassNames(styles);

const SidebarComponent: React.FC = memo(() => {
  return (
    <div className={cx('sidebar-wrapper')}>
      <CollapsibleBlock title="Availability">
        <ul className={cx('filter-availability', 'mb-[30px]')}>
          <li className={cx('facets__item', 'mb-[10px]')}>
            <input id="filter-availability-1" type="radio" name="filter.availability" value="1" />
            <label htmlFor="filter-availability-1">
              <span className={cx('content-center', 'h-[20px] w-[20px] border')}>
                <CheckedIcon />
              </span>
              In Stock
            </label>
          </li>
          <li className={cx('facets__item')}>
            <input id="filter-availability-0" type="radio" name="filter.availability" value="0" />
            <label htmlFor="filter-availability-0">
              <span className={cx('content-center', 'h-[20px] w-[20px] border')}>
                <CheckedIcon />
              </span>
              Out Of Stock
            </label>
          </li>
        </ul>
      </CollapsibleBlock>
      <CollapsibleBlock title="test1">
        <span>
          hautest111111111111 1111111111111111 hautest11111 1 111111 1111111111111111 hautest111111
          1111111111111111111111
        </span>
      </CollapsibleBlock>
    </div>
  );
});

export default SidebarComponent;
