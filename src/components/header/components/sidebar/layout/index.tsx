// AnnouncementBar.tsx
import React, { HTMLAttributes, memo } from 'react';
import styles from './sidebarLayout.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { CloseIcon } from '@/utils/icons';

const cx = bindClassNames(styles);

interface SidebarLayoutType extends HTMLAttributes<HTMLDivElement> {
  title: string;
  callback: Function;
  className?: string;
}

const SidebarLayout: React.FC<SidebarLayoutType> = memo(({ children, title, callback, className }) => {
  return (
    <div
      className={cx(
        'sidebar',
        'fixed bottom-0 right-0 top-0 z-[3] w-full max-w-[350px] bg-[white] px-[24px] py-[25px]',
        className
      )}
    >
      <div
        className={cx(
          'login__sidebar-header',
          'h-[auto]',
          'text-right',
          'flex',
          'justify-between',
          'items-center',
          'mb-[10px]'
        )}
      >
        <span className={cx('sidebar-header-title', 'text-[18px]', 'italic', 'font-bold')}>{title}</span>
        <div
          onClick={() => {
            callback();
          }}
          className={cx('sidebar-close-wrapper rotate', 'py-[10px]', 'cursor-pointer')}
        >
          <CloseIcon style={{ float: 'right' }} />
        </div>
      </div>
      {children}
    </div>
  );
});

export default SidebarLayout;
