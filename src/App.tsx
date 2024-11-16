import { ConfigProvider, theme as themeAntd } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import NotFoundPage from './pages/ExceptionPage/NotFoundPage';
import { setLoginSidebarState, setSearchPopupState, THEME } from './redux/app/app.slice';
import { PUBLIC_ROUTES, RouteType } from './routes/routes';
import { useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';
import { useDispatch } from 'react-redux';
import { LoginSidebar, SearchPopup } from './components/header';
function App() {
  const location = window.location;
  const dispatch = useDispatch();
  const [pathname, setPathname] = useState(location?.pathname?.split('/')[1]);
  const theme = useSelector((state: any) => state.app.theme);
  const searchPopupState = useSelector((state: any) => state.app.searchPopupState);
  const loginSidebarState = useSelector((state: any) => state.app.loginSidebarState);
  console.log('searchState:', searchPopupState);

  useEffect(() => {
    setPathname(location?.pathname?.split('/')[1]);
  }, [location.pathname]);

  useEffect(() => {
    const bodyClass = theme === THEME.DARK ? 'dark-mode' : 'light-mode';
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(bodyClass);
  }, [theme]);
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
      {(searchPopupState || loginSidebarState) && (
        <div
          onClick={() => {
            if (searchPopupState) {
              dispatch(setSearchPopupState(false));
            }
            if (loginSidebarState) {
              dispatch(setLoginSidebarState(false));
            }
          }}
          className="background-overlay"
        ></div>
      )}

      <Helmet>
        <title>{`Ecommerce-${pathname}`}</title>
      </Helmet>
      {searchPopupState && <SearchPopup />}
      {loginSidebarState && <LoginSidebar />}

      <main>
        <Router>
          <Routes>
            {PUBLIC_ROUTES.map((route: RouteType, index: number) => {
              let Layout: any = DefaultLayout;
              if (route?.layout) Layout = route.layout;
              else if (route.layout === null) Layout = Fragment;
              if (route.private === 'public')
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout useHeader={route.useHeader} useSidebar={route.useSidebar} useFooter={route.useFooter}>
                        {route.element}
                      </Layout>
                    }
                  ></Route>
                );
              else {
                <span>test</span>;
              }
            })}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </main>
    </ConfigProvider>
  );
}

export default App;
