import styles from './wishlist.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { CollectionType } from '@/types/collection';
import ProductCardComponent from '@/components/products/card';
import ProductBlockComponent from '@/components/products/productBlock';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { setPageInfo } from '@/redux/slice/app/app.slice';
import { useGetWishlistsMutation } from '@/apis/user/user.api';
import { WishlistDetailType } from '@/types/user';

const cx = bindClassNames(styles);

const WishlistPage = () => {
  const dispatch = useDispatch();
  const [getWishlists] = useGetWishlistsMutation();
  const [wishlists, setWishlists] = useState<WishlistDetailType[]>();

  const getWishlistsFunc = useCallback(async () => {
    try {
      const response = await getWishlists().unwrap();
      setWishlists(response.data);
    } catch (error) {}
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
          {wishlists &&
            wishlists?.map((wishlist) => {
              return (
                <div className={cx('product', 'w-[100%] max-w-[25%] p-[10px] phone:max-w-[50%] tablet:max-w-[33%]')}>
                  <ProductCardComponent callback={getWishlistsFunc} product={wishlist.product} />
                </div>
              );
            })}
        </div>
        <div className={cx('section-recently-viewed')}>
          <ProductBlockComponent title="Recently Viewed" collectionHandle="new-in"></ProductBlockComponent>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
