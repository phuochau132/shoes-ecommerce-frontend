import React, { memo } from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import { AnnouncementBar } from './components/';
import MainHeader from './components/menu';
const cx = classNames.bind(styles);

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
