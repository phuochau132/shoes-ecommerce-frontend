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
<<<<<<< HEAD
const LazyContactUsPage = LazyLoadComponent(() => import('../pages/Public/ContactUs/ContactUsPage'))(true);
const LazyFaq = LazyLoadComponent(() => import('../pages/Public/FAQ/FaqPage'))(true);
const LazyWishlistPage = LazyLoadComponent(() => import('../pages/Public/Wishlist/WishlistPage'))(true);
const LazyBlogsPage = LazyLoadComponent(() => import('../pages/Public/Blogs/BlogsPage'))(true);
=======

>>>>>>> bfcdc125da075e20b95b86ddbaa96f506f3cced4

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
<<<<<<< HEAD
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
    path: paths.faq,
    element: <LazyFaq />,
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
    path: paths.blogs,
    element: <LazyBlogsPage />,
    layout: DefaultLayout,
    private: 'public',
    useHeader: true,
    useSidebar: true,
    useFooter: true
  }
=======
>>>>>>> bfcdc125da075e20b95b86ddbaa96f506f3cced4
];
