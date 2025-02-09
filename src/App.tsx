import { ConfigProvider, theme as themeAntd } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import DefaultLayout, { pageHeaderType } from './layouts/DefaultLayout/DefaultLayout';
import NotFoundPage from './pages/ExceptionPage/NotFoundPage';
import {
  setCartSidebarState,
  setFilterSidebarState,
  setAccountSidebarState,
  setMenuSidebarState,
  setQuickViewPopup,
  setSearchPopupState,
  THEME,
  setPoliciesPopupState,
  setOrderDetailsPopupInfo
} from '@/redux/slice/app/app.slice';
import { PRIVATE_ROUTES, PUBLIC_ROUTES, RouteType } from './routes/routes';
import { useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';
import { useDispatch } from 'react-redux';
import { AccountSidebar, SearchPopup } from './components/header';
import CartSidebar from './components/header/components/sidebar/cart';
import QuickViewComponent from './components/products/quickView';
import { CloseIcon } from './utils/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PoliciesPopupComponent from './components/policies';
import OrderDetailComponent from './components/order/popup/orderDetail';
import { useGetCartMutation } from './apis/cart/cart.api';
import { setCart } from './redux/slice/cart/cart.slice';
import { useGetInfoMutation } from './apis/user/user.api';
import { setUser } from './redux/slice/user/user.slice';

function App() {
  const location = window.location;
  const dispatch = useDispatch();
  const [pathname, setPathname] = useState(location?.pathname?.split('/')[1]);
  const theme = useSelector((state: any) => state.app.theme);
  const { user } = useSelector((state: any) => state.user);
  const searchPopupState = useSelector((state: any) => state.app.searchPopupState);
  const accountSidebarState = useSelector((state: any) => state.app.accountSidebarState);
  const filterSidebarState = useSelector((state: any) => state.app.filterSidebarState);
  const cartSidebarState = useSelector((state: any) => state.app.cartSidebarState);
  const menuSidebarState = useSelector((state: any) => state.app.menuSidebarState);
  const quickViewInfo = useSelector((state: any) => state.app.quickViewInfo);
  const policiesPopupState = useSelector((state: any) => state.app.policiesPopupState);
  const orderDetailsPopupInfo = useSelector((state: any) => state.app.orderDetailsPopupInfo);
  const [getCart] = useGetCartMutation();
  const [fetchUserInfo] = useGetInfoMutation();
  const pageInfo = useSelector((state: any) => state.app.pageInfo);
  useEffect(() => {
    setPathname(location?.pathname?.split('/')[1]);
  }, [location.pathname]);

  useEffect(() => {
    const bodyClass = theme === THEME.DARK ? 'dark-mode' : 'light-mode';
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(bodyClass);
  }, [theme]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const updateUser = await fetchUserInfo().unwrap();
        dispatch(setUser(updateUser.data));
      } catch (error) {
        console.log(error);
      }
    };

    const handleSmoothLink = () => {
      const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])') as NodeListOf<HTMLElement>;
      anchors.forEach((anchor) => {
        anchor.addEventListener('click', function (e: Event) {
          e.preventDefault();
          const targetAnchor = e.currentTarget as HTMLElement | null;
          if (targetAnchor) {
            const target = document.querySelector(targetAnchor.getAttribute('href')!) as HTMLElement | null;
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }
        });
      });
    };
    const handleGetCart = async () => {
      try {
        const response = await getCart({}).unwrap();
        dispatch(setCart(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    setTimeout(() => {
      handleSmoothLink();
    }, 2000);
    if (user) {
      handleGetCart();
      getUserInfo();
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#21a1d3',
          fontFamily: 'Inter, sans-serif',
          colorBgBase: theme === THEME.DARK ? 'rgb(26, 27, 28)' : '#ffffff', // Background color
          colorTextBase: theme === THEME.DARK ? '#ffffff' : '#000000', // Text color
          colorBgContainer: theme === THEME.DARK ? 'rgb(40, 40, 40)' : '#ffffff', // Card background
          colorBorder: theme === THEME.DARK ? 'rgb(48, 48, 48)' : '#d9d9d9' // Border color,
        },

        algorithm: theme === THEME.DARK ? themeAntd.darkAlgorithm : themeAntd.defaultAlgorithm
      }}
    >
      <ToastContainer />
      {(searchPopupState ||
        accountSidebarState ||
        filterSidebarState ||
        cartSidebarState ||
        menuSidebarState ||
        quickViewInfo.isShowed ||
        orderDetailsPopupInfo.isShowed ||
        policiesPopupState) && (
        <div
          onClick={() => {
            if (searchPopupState) {
              dispatch(setSearchPopupState(false));
            }
            if (accountSidebarState) {
              dispatch(setAccountSidebarState(false));
            }
            if (filterSidebarState) {
              dispatch(setFilterSidebarState(false));
            }
            if (cartSidebarState) {
              dispatch(setCartSidebarState(false));
            }
            if (menuSidebarState) {
              dispatch(setMenuSidebarState(false));
            }
            if (quickViewInfo.isShowed) {
              dispatch(setQuickViewPopup({ product: null, isShowed: false }));
            }
            if (policiesPopupState) {
              dispatch(setPoliciesPopupState(false));
            }
            if (orderDetailsPopupInfo.isShowed) {
              dispatch(setOrderDetailsPopupInfo({ order: null, isShowed: false }));
            }
          }}
          className="background-overlay cursor-pointer"
        ></div>
      )}

      <Helmet>
        <title>{`Ecommerce-${pathname}`}</title>
      </Helmet>
      {searchPopupState && <SearchPopup />}
      {accountSidebarState && <AccountSidebar />}
      {cartSidebarState && <CartSidebar />}
      {(quickViewInfo.isShowed && quickViewInfo.product) ||
      policiesPopupState ||
      (orderDetailsPopupInfo.isShowed && orderDetailsPopupInfo.items) ? (
        <div className="modal overflow-hidden">
          {/* QuickView Modal */}
          {quickViewInfo.isShowed && quickViewInfo.product && (
            <div className="modal-content quickView-modal flex h-full overflow-y-scroll phone:flex-col">
              <QuickViewComponent product={quickViewInfo.product} />
            </div>
          )}

          {/* Policies Modal */}
          {policiesPopupState && (
            <div className="modal-content policies-modal flex phone:flex-col">
              <PoliciesPopupComponent />
            </div>
          )}
          {/* Order Details Modal */}
          {orderDetailsPopupInfo.isShowed && (
            <div className="modal-content order-detail__modal flex h-full phone:flex-col">
              <OrderDetailComponent />
            </div>
          )}

          {/* Close Button */}
          <div
            onClick={() => {
              if (quickViewInfo.isShowed) {
                dispatch(setQuickViewPopup({ product: null, isShowed: false }));
              }
              if (policiesPopupState) {
                dispatch(setPoliciesPopupState(false));
              }
              if (orderDetailsPopupInfo.isShowed) {
                dispatch(setOrderDetailsPopupInfo({ items: null, isShowed: false }));
              }
            }}
            className="popup-close-wrapper rotate absolute right-[5px] top-[5px] z-[4] cursor-pointer p-[10px]"
          >
            <CloseIcon style={{ float: 'right' }} />
          </div>
        </div>
      ) : null}

      <main>
        <Router>
          <Routes>
            {PUBLIC_ROUTES.map((route: RouteType, index: number) => {
              let Layout: any = DefaultLayout;
              if (route?.layout) Layout = route.layout;
              else if (route.layout === null) Layout = Fragment;
              let pageHeader: pageHeaderType = {};
              let container = 'container';
              pageHeader = {
                breadcrumb: pageInfo.breadcrumb,
                title: pageInfo.title,
                description: pageInfo.description
              };
              if (route.path == '/pages/contact-us' || route.path == '/pages/faq') {
                container = 'container-1200';
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout
                      {...(container && { container })}
                      {...(pageHeader && { pageHeader })}
                      pageHeader={pageHeader}
                      useHeader={route.useHeader}
                      useSidebar={route.useSidebar}
                      useFooter={route.useFooter}
                    >
                      {route.element}
                    </Layout>
                  }
                ></Route>
              );
            })}
            {user &&
              PRIVATE_ROUTES.map((route: RouteType, index: number) => {
                let Layout: any = DefaultLayout;
                if (route?.layout) Layout = route.layout;
                else if (route.layout === null) Layout = Fragment;
                let pageHeader: pageHeaderType = {};
                let container = 'container';
                pageHeader = {
                  breadcrumb: pageInfo.breadcrumb,
                  title: pageInfo.title,
                  description: pageInfo.description
                };
                if (route.path == '/pages/contact-us' || route.path == '/pages/faq' || route.path == '/checkout') {
                  container = 'container-1200';
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout
                        {...(container && { container })}
                        {...(pageHeader && { pageHeader })}
                        pageHeader={pageHeader}
                        useHeader={route.useHeader}
                        useSidebar={route.useSidebar}
                        useFooter={route.useFooter}
                      >
                        {route.element}
                      </Layout>
                    }
                  ></Route>
                );
              })}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </main>
    </ConfigProvider>
  );
}

export default App;
