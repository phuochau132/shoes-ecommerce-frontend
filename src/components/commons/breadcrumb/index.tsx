// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './breadcrumb.module.scss';
import { ArrowIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);
export type ComType = {
  link: string;
  title: string;
};
export type BreadcrumbType = {
  path: ComType[];
  className?: any;
};
const BreadcrumbComponent: React.FC<BreadcrumbType> = memo(({ path, className }) => {
  return (
    <div className={cx('wrapper', 'flex gap-[10px] pb-[10px] pt-[20px] text-grey-color')}>
      {path?.map((item, index) => {
        return (
          <div key={index} className={cx('breadcrumb-item', className)}>
            <a className={cx('link')} href={item.link}>
              {item.title}
            </a>
            {index != path.length - 1 && (
              <span className={cx('icon', 'ml-[5px] inline-block h-[10px] w-[9px]')}>
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
