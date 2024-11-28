import React, { memo } from 'react';
import styles from './header.module.scss';
import { AnnouncementBar } from './components/';
import MainHeader from './components/menu';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const HeaderComponent: React.FC = memo(() => {
  return (
    <div className="w-screen">
      <div className={cx('header-top')}>
        <AnnouncementBar />
      </div>
      <MainHeader />
    </div>
  );
});

export default HeaderComponent;
