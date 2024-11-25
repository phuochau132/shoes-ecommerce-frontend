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
  }
];
