// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './input.module.scss';
import path from 'path';
import { ArrowIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);
export type ComType = {
  link: string;
  title: string;
};
export type BreadcrumbType = {
  path: ComType[];
};
const BreadcrumbComponent: React.FC<BreadcrumbType> = memo(({ path }) => {
  return (
    <div className={cx('wrapper')}>
      {path?.map((item, index) => {
        return (
          <div key={index} className={cx('breadcrumb-item')}>
            <a className={cx('link')} href={item.link}>
              {item.title}
            </a>
            {index != path.length - 1 && (
              <span className={cx('icon')}>
                <ArrowIcon />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default BreadcrumbComponent;
