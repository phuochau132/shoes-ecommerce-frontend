// AnnouncementBar.tsx
import React, { HTMLAttributes, memo } from 'react';
import styles from './sidebarLayout.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { CloseIcon } from '@/utils/icons';

const cx = bindClassNames(styles);

interface SidebarLayoutType extends HTMLAttributes<HTMLDivElement> {
  title: string;
  callback: () => void;
  className?: string;
}

const SidebarLayout: React.FC<SidebarLayoutType> = memo(({ children, title, callback, className }) => {
  return (
    <div
      className={cx(
        className,
        'sidebar',
        'fixed bottom-0 right-0 top-0 z-[3] w-full max-w-[500px] bg-[white] px-[24px] py-[25px]'
      )}
    >
      <div className={cx('login__sidebar-header', 'mb-[10px] flex h-[auto] items-center justify-between text-right')}>
        <span className={cx('sidebar-header-title', 'heading font-bold')}>{title}</span>
        <div onClick={callback} className={cx('sidebar-close-wrapper rotate', 'py-[10px]', 'cursor-pointer')}>
          <CloseIcon style={{ float: 'right' }} />
        </div>
      </div>
      {children}
    </div>
  );
});

export default SidebarLayout;
