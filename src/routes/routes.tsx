/* eslint-disable react-refresh/only-export-components */
import LazyLoadComponent from '../components/commons/LazyComponent';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import { paths } from './paths';
export type RouteType = {
  element: React.ReactNode;
  layout?: any;
  useHeader?: boolean;
  useSidebar?: boolean;
  useFooter?: boolean;
  path: string;
  private?: 'public' | 'auth' | 'admin';
  children?: RouteType[];
};
const LazyHomePage = LazyLoadComponent(() => import('../pages/Public/Home/HomePage'))(true);
const LazyProductPage = LazyLoadComponent(() => import('../pages/Public/Product/ProductPage'))(true);
const LazyCollectionPage = LazyLoadComponent(() => import('../pages/Public/Collection/CollectionPage'))(true);
const LazyCartPage = LazyLoadComponent(() => import('../pages/Public/Cart/CartPage'))(true);
const LazyCollectionListPage = LazyLoadComponent(() => import('../pages/Public/CollectionList/CollectionListPage'))(
  true
);
const LazyContactUsPage = LazyLoadComponent(() => import('../pages/Public/ContactUs/ContactUsPage'))(true);
const LazyFaqPage = LazyLoadComponent(() => import('../pages/Public/FAQ/FaqPage'))(true);
const LazyWishlistPage = LazyLoadComponent(() => import('../pages/Public/Wishlist/WishlistPage'))(true);
// Account
const LazyAccountPage = LazyLoadComponent(() => import('../pages/Public/Account/AccountPage'))(true);

export const PUBLIC_ROUTES: RouteType[] = [
  {
    path: paths.home,
    element: <LazyHomePage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  },
  {
    path: paths.product,
    element: <LazyProductPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  },
  {
    path: paths.collection,
    element: <LazyCollectionPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  },
  {
    path: paths.cart,
    element: <LazyCartPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  },
  {
    path: paths.collectionsList,
    element: <LazyCollectionListPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  },
  {
    path: paths.contact,
    element: <LazyContactUsPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  },
  {
    path: paths.wishlist,
    element: <LazyWishlistPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  },
  {
    path: paths.faq,
    element: <LazyFaqPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  },
  {
    path: paths.account,
    element: <LazyAccountPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  }
];
