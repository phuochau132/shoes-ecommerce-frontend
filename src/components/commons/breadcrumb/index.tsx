// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './breadcrumb.module.scss';
import { ArrowIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);
export type BreadcrumbItemType = {
  path: string;
  title: string;
};
export type BreadcrumbComponentType = {
  path: BreadcrumbItemType[];
  className?: string;
};
const BreadcrumbComponent: React.FC<BreadcrumbComponentType> = memo(({ path, className }) => {
  return (
    <div className={cx('wrapper', 'flex justify-center gap-[10px] pb-[10px] pt-[20px] text-grey-color')}>
      {path?.map((item, index) => {
        return (
          <div key={index} className={cx('breadcrumb-item', className, { 'text-black': index == path.length - 1 })}>
            <a className={cx('link')} href={item.path}>
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
