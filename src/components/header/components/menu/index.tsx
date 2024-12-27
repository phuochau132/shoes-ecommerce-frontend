// AnnouncementBar.tsx
import React, { memo, useEffect, useState, lazy, Suspense, useCallback, useRef } from 'react';
import styles from './mainHeader.module.scss';
import ReactDOMServer from 'react-dom/server';
import { CartIcon, CurrenciesIcon, HamburgerIcon, LoggedInIcon, SearchIcon, SignInIcon } from '@/utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAccountSidebarState,
  setCartSidebarState,
  setMenuSidebarState,
  setSearchPopupState
} from '@/redux/slice/app/app.slice';
import LoadingPage from '@/pages/commons/LoadingPage';
import { bindClassNames } from '@/utils/helpers/cx';
import { Currency } from '@/utils/helpers/CurrenciesFormat';
import { paths } from '@/routes/paths';
import { useGetInfoMutation } from '@/apis/auth/auth.api';

export type Navigation = {
  name: string;
  link: string;
  style?: string;
  children?: Navigation[];
};

const cx = bindClassNames(styles);

const currencies = [{ isoCode: 'USD' }, { isoCode: 'EUR' }, { isoCode: 'GBP' }, { isoCode: 'CHF' }];

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
          { name: 'Blog Default 4', link: '#' },
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
  const { user } = useSelector((state: any) => state.user);
  const [isMobile, setIsMobile] = useState(false);
  const currenciesToggleEl = useRef<HTMLDivElement>(null);
  const currentlyCurrencyEl = useRef<HTMLDivElement>(null);
  const menuSidebarState = useSelector((state: any) => state.app.menuSidebarState);
  const [getInfo] = useGetInfoMutation();

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);
  const renderCurrencies = useCallback(() => {
    return currencies.map((currency, index) => {
      return (
        <div key={index} data-currency={currency.isoCode} className={cx('currency')}>
          <div className={cx('icon', 'pointer-events-none')}>{CurrenciesIcon({ currency: currency.isoCode })}</div>
          <div className="isoCode pointer-events-none">{currency.isoCode}</div>
        </div>
      );
    });
  }, []);

  const handleCurrencyChange = useCallback(() => {
    const $currencies = document.querySelectorAll(`.${styles.currency}`);

    const handleClick = (event: Event, index: number) => {
      const $target = event.target as HTMLElement;
      const isoCode = $target.querySelector('.isoCode') as HTMLElement;
      $currencies.forEach((item, i) => {
        if (index != i) {
          item.classList.remove('is-activated');
        }
      });
      $target.classList.add('is-activated');
      if (isoCode) {
        const selectedIsoCode = isoCode.textContent || 'USD';
        Currency.convertAll('.money', 'USD', selectedIsoCode);
        localStorage.setItem('currency', selectedIsoCode);
        currenciesToggleEl.current?.classList.remove('is-toggled');
        const currencyContainer = currentlyCurrencyEl.current as HTMLElement;
        // change content
        const iconElement = currencyContainer?.querySelector(`.${styles.icon}`);
        const isoCodeElement = currencyContainer.querySelector('.isoCode');
        if (iconElement && isoCodeElement) {
          iconElement.innerHTML = ReactDOMServer.renderToStaticMarkup(
            React.createElement(CurrenciesIcon, { currency: selectedIsoCode })
          );
          isoCodeElement.innerHTML = selectedIsoCode;
        }
      }
    };

    $currencies.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        handleClick(event, index);
      });
    });

    return () => {
      $currencies.forEach((item, index) => {
        item.addEventListener('click', (event) => {
          handleClick(event, index);
        });
      });
    };
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    const removeEvent = handleCurrencyChange();
    return () => {
      removeEvent();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={cx('navigation', 'align-center container flex justify-between py-[10px] phone:pr-[15px]')}>
      {isMobile && (
        <div className={cx('header-mobile-left', 'flex items-center gap-[10px] phone:min-w-[97px]')}>
          <button
            onClick={() => dispatch(setMenuSidebarState(true))}
            type="button"
            className={cx('mobileMenu-hamburger', 'flex h-[auto] w-[auto]')}
            aria-label="menu"
          >
            <HamburgerIcon className={cx('h-[26px] w-[26px]')} />
          </button>
          <div
            onClick={() => {
              dispatch(setSearchPopupState(true));
            }}
            className={cx('header__icon-item', 'header__icon--search', '-rotate-90')}
          >
            <SearchIcon className={cx('h-[22px] w-[22px]', 'fade-in-up')} />
          </div>
        </div>
      )}
      <div
        className={cx('header-logo header-item flex items-center phoneUp:w-full phoneUp:max-w-[165px]', {
          'flex-1': isMobile,
          'justify-center': isMobile
        })}
      >
        <div className={cx('header__heading')}>
          <a href="/" className={cx('header__heading-link')}>
            <img
              src="https://res.cloudinary.com/dvgjegefi/image/upload/v1734491076/logo_usfwfm.png"
              loading="lazy"
              className={cx('header__heading-logo', 'rounded-none')}
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
      <div className={cx('header-icons header-item my-auto flex items-center gap-[20px] phone:gap-[15px]')}>
        <div
          onClick={() => {
            dispatch(setSearchPopupState(true));
          }}
          className={cx('header__icon-item', 'header__icon--search', '-rotate-90')}
        >
          {!isMobile && <SearchIcon className={cx('icon', 'fade-in-up')} />}
        </div>
        {user ? (
          <div
            className={cx('header__icon-item', 'header__icon--account')}
            onClick={() => {
              if (window.location.pathname != paths.account) window.location.pathname = paths.account;
            }}
          >
            <LoggedInIcon className={cx('icon', 'fade-in-up')} />
          </div>
        ) : (
          <div
            className={cx('header__icon-item', 'header__icon--login')}
            onClick={() => {
              dispatch(setAccountSidebarState(true));
            }}
          >
            <SignInIcon className={cx('icon', 'fade-in-up')} />
          </div>
        )}
        <div
          onClick={() => {
            dispatch(setCartSidebarState(true));
          }}
          className={cx('header__icon-item', 'header__icon--cart')}
        >
          <CartIcon className={cx('icon', 'fade-in-up')} />
        </div>
        <div className={cx('header__icon-item', 'header__icon--currency', 'relative')}>
          <div
            onClick={() => {
              currenciesToggleEl.current?.classList.toggle('is-toggled');
            }}
            ref={currentlyCurrencyEl}
            className={cx('icon', 'currently-currency', 'flex min-h-[70px] w-[100%] items-center p-[0px]')}
          >
            <div className={cx('icon', 'h-[16px] w-[16px]')}>{CurrenciesIcon({ currency: 'USD' })}</div>
            <div className="isoCode min-w-[35px] text-end phone:hidden">USD</div>
          </div>
          <div
            ref={currenciesToggleEl}
            className="currency-dropdown invisible absolute right-[0] top-[100%] z-[2] bg-[white] opacity-[0] shadow-custom duration-300"
          >
            {renderCurrencies()}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MainHeader;
