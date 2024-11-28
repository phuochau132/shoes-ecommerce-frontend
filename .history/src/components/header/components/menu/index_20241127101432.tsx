// AnnouncementBar.tsx
import React, { memo, useEffect, useState, lazy, Suspense } from 'react';
import styles from './mainHeader.module.scss';
import classNames from 'classnames/bind';
import { CartIcon, HamburgerIcon, SearchIcon, SignInIcon, WishListIcon } from '@/utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginSidebarState, setMenuSidebarState, setSearchPopupState } from '@/redux/app/app.slice';
import LoadingPage from '@/pages/commons/LoadingPage';
import { bindClassNames } from '@/utils/helpers/cx';

export type Navigation = {
  name: string;
  link: string;
  style?: string;
  children?: Navigation[];
};

const cx = bindClassNames(styles);

const menu = [
  {
    name: 'shop',
    link: '/',
    style: 'dropdown',
    children: [
      {
        name: 'Collection List Page',
        link: '#',
        children: [
          { name: 'Collection List 1', link: '#' },
          { name: 'Collection List 2', link: '#' },
          { name: 'Collection List 3', link: '#' },
          { name: 'Collection List 4', link: '#' }
        ]
      },
      {
        name: 'Collection Page',
        link: '#',
        children: [
          { name: 'Collection Page 1', link: '#' },
          { name: 'Collection Page 2', link: '#' },
          { name: 'Collection Page 3', link: '#' },
          { name: 'Collection Page 4', link: '#' }
        ]
      }
    ]
  },
  {
    name: 'blog',
    link: '#',
    style: 'dropdown',
    children: [
      {
        name: 'Blog Default',
        link: '#',
        children: [
          { name: 'Blog Default 1', link: '#' },
          { name: 'Blog Default 2', link: '#' },
          { name: 'Blog Default 3', link: '#' },
          { name: 'Blog Default 4', link: '#' }
        ]
      },
      {
        name: 'Blog Simple',
        link: '#',
        children: [
          { name: 'Blog Simple 1', link: '#' },
          { name: 'Blog Simple 2', link: '#' },
          { name: 'Blog Simple 3', link: '#' },
          { name: 'Blog Simple 4', link: '#' }
        ]
      }
    ]
  }
];

const DesktopNavigation = lazy(() => import('./desktop'));
const MobileNavigation = lazy(() => import('./mobile'));

const MainHeader: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const menuSidebarState = useSelector((state: any) => state.app.menuSidebarState);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="align-center container flex justify-between py-[10px]">
      {isMobile && (
        <div className={cx('header-mobile-left', 'flex', 'gap-[27px]')}>
          <button
            onClick={() => dispatch(setMenuSidebarState(true))}
            type="button"
            className={cx('mobileMenu-hamburger', 'w-[auto]', 'h-[auto]', 'flex', 'p-[5px]')}
            aria-label="menu"
          >
            <HamburgerIcon />
          </button>
          <div
            onClick={() => {
              dispatch(setSearchPopupState(true));
            }}
            className={cx('header__icon-item header__icon--search -rotate-90')}
          >
            <SearchIcon className={cx('icon', 'fade-in-up')} />
          </div>
        </div>
      )}
      <div
        className={cx('header-logo header-item flex items-center', { 'flex-[1]': isMobile, 'justify-center': true })}
      >
        <div className={cx('header__heading')}>
          <a href="#" className={cx('header__heading-link')}>
            <img
              src="https://www.khy.com/cdn/shop/files/KHY-Logo-Dark.png?v=1720636390&width=500"
              loading="lazy"
              className={cx('header__heading-logo')}
              alt="new-ella-demo"
              width="70"
              height="28"
            />
          </a>
        </div>
      </div>
      {menuSidebarState && isMobile && (
        <Suspense fallback={<LoadingPage />}>
          <MobileNavigation menu={menu} />
        </Suspense>
      )}
      {!isMobile && (
        <Suspense fallback={<LoadingPage />}>
          <DesktopNavigation menu={menu} />
        </Suspense>
      )}
      <div className={cx('header-icons header-item my-auto flex items-center gap-[27px]')}>
        <div
          onClick={() => {
            dispatch(setSearchPopupState(true));
          }}
          className={cx('header__icon-item header__icon--search -rotate-90')}
        >
          {!isMobile && <SearchIcon className={cx('icon', 'fade-in-up')} />}
        </div>
        <div
          className={cx('header__icon-item header__icon--signIn')}
          onClick={() => {
            dispatch(setLoginSidebarState(true));
          }}
        >
          <SignInIcon className={cx('icon', 'fade-in-up')} />
        </div>
        <div className={cx('header__icon-item header__icon--wishList')}>
          <WishListIcon className={cx('icon', 'fade-in-up')} />
        </div>
        <div className={cx('header__icon-item header__icon--cart')}>
          <CartIcon className={cx('icon', 'fade-in-up')} />
        </div>
      </div>
    </div>
  );
});

export default MainHeader;
