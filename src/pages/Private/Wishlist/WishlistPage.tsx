import styles from './wishlist.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import ProductCardComponent from '@/components/products/card';
import ProductBlockComponent from '@/components/products/productBlock';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import { useGetWishlistsMutation } from '@/apis/user/user.api';
import { WishlistDetailType } from '@/types/user';
import ProductCardLoadingComponent from '@/components/products/cardLoading';

const cx = bindClassNames(styles);

const WishlistPage = () => {
  const dispatch = useDispatch();
  const [getWishlists, { isLoading: isGetWishlistLoading }] = useGetWishlistsMutation();
  const [wishlists, setWishlists] = useState<WishlistDetailType[]>();

  const getWishlistsFunc = useCallback(async () => {
    try {
      const response = await getWishlists().unwrap();
      setWishlists(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getWishlistsFunc();
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Wishlist Product' }
        ],
        title: 'Wishlist Product',
        description: "Explore the items you've marked as favorites, ready to be added to your cart and enjoyed."
      })
    );
  }, []);
  return (
    <div className={cx('container mx-[auto]', 'wishlist-page')}>
      <div className={cx('page-content')}>
        <div className={cx('product-grid', 'mt-[40px] flex flex-wrap border-b border-dashed pb-[60px]')}>
          {isGetWishlistLoading
            ? Array.from({ length: 4 }).map(() => {
                return (
                  <ProductCardLoadingComponent className="largeDesktop:max-w-[20%] w-full p-[10px] phone:max-w-[50%] tablet:max-w-[33%]" />
                );
              })
            : wishlists &&
              wishlists?.map((wishlist) => {
                return (
                  <ProductCardComponent
                    className="largeDesktop:max-w-[20%] w-full p-[10px] phone:max-w-[50%] tablet:max-w-[33%]"
                    callback={getWishlistsFunc}
                    product={wishlist.product}
                  />
                );
              })}
        </div>
        <div className={cx('section-recently-viewed')}>
          <ProductBlockComponent title="Best Sellers" collectionHandle="new-in"></ProductBlockComponent>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
