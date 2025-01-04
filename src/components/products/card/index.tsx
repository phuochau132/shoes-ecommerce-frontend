import React, { memo, CSSProperties, useCallback } from 'react';
import styles from './product-card.module.scss';
import { CloseIcon, QuickViewIcon, WishListIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import ProductVariantComponent from '../productVariant';
import AddToCartComponent from '../addToCart';
import { useDispatch } from 'react-redux';
import { setQuickViewPopup } from '@/redux/slice/app/app.slice';
import ProductReviewComponent from '../productReview';
import { useSelector } from 'react-redux';
import { useAddWishlistMutation, useGetInfoMutation, useRemoveWishlistMutation } from '@/apis/user/user.api';
import { setUser } from '@/redux/slice/user/user.slice';
import { UserType } from '@/types/user';
import { toast } from 'react-toastify';

interface ProductCardComponentProps {
  style?: CSSProperties;
  product: ProductType;
  className?: string;
  callback?: () => Promise<void>;
}
const cx = bindClassNames(styles);
const ProductCardComponent: React.FC<ProductCardComponentProps> = memo(({ product, className, callback }) => {
  const dispatch = useDispatch();
  const { user }: { user: UserType } = useSelector((state: any) => state.user);
  const [addWishlist, { isLoading: addWishlistIsLoading }] = useAddWishlistMutation();
  const [removeWishlist, { isLoading: removeWishlistIsLoading }] = useRemoveWishlistMutation();
  const [getUserInfo] = useGetInfoMutation();

  const handleQuickView = useCallback(() => {
    dispatch(
      setQuickViewPopup({
        product: product,
        isShowed: true
      })
    );
  }, []);
  const handleAddWishList = useCallback(async () => {
    if (user) {
      try {
        await addWishlist({
          product_id: product.id
        }).unwrap();
        const updateUser = await getUserInfo().unwrap();
        dispatch(setUser(updateUser.data));
        if (callback) {
          await callback();
        }
      } catch (error) {}
    }
  }, [user]);
  const wishlist =
    user &&
    user.wishlists?.filter((item) => {
      return item.product_id == product.id;
    });
  const handleRemoveWishList = useCallback(
    async (id: number) => {
      if (user && id) {
        try {
          await removeWishlist({
            id: id
          }).unwrap();
          const updateUser = await getUserInfo().unwrap();
          dispatch(setUser(updateUser.data));
          if (callback) {
            await callback();
          }
        } catch (error) {}
      }
    },
    [user]
  );

  return (
    <div className={cx('card', className)}>
      <div className={cx('card-product', 'rounded-[10px]')}>
        <div className={cx('card-media')}>
          {product.images.length > 0 && (
            <>
              <img className={cx('first-image')} src={product.images[0].url} alt="" />
              <img className={cx('second-image')} src={product.images[1].url} alt="" />
            </>
          )}
          <a href={product.handle} className={cx('card-link', 'cursor-pointer')}></a>
        </div>
        <div className={cx('card-action')}>
          <AddToCartComponent
            className="mt-[10px] p-[5px]"
            isCard={true}
            handleSelectionOption={handleQuickView}
            product={product}
          ></AddToCartComponent>
        </div>
        <div className={cx('card-group')}>
          <div
            onClick={() => {
              if (!user) {
                toast.warning('Please log in to continue');
                return;
              }
              user && !(wishlist.length > 0) ? handleAddWishList() : handleRemoveWishList(wishlist && wishlist[0]?.id);
            }}
            className={cx(
              'card__group-wishlist',
              'cart__group-action',
              'relative p-[10px]',
              {
                loader: removeWishlistIsLoading
              },
              user && wishlist.length > 0 && 'is-activated'
            )}
          >
            <WishListIcon className={`${cx('icon')} fade-in-up`} />
          </div>
          <div
            onClick={handleQuickView}
            className={cx('card__group-quickView', 'cart__group-action', 'mt-[10px] p-[10px]')}
          >
            <QuickViewIcon className={`${cx('icon')} fade-in-up`} />
          </div>
        </div>
        <div className={cx('card-badge')}>
          <div className={cx('sale-badge')}>
            <span className={cx('text')}>Sale</span>
          </div>
        </div>
      </div>
      <div className={cx('card-information', 'mt-[10px]')}>
        <div className={cx('card-vendor', 'text-center')}>
          <a href={product.handle} title={product.vendor}>
            {product.vendor}
          </a>
        </div>
        <div className={cx('card-title', 'text-center')}>
          <a href={product.handle}>{product.title}</a>
        </div>
        <div className={cx('card-review', 'text-center')}>
          <ProductReviewComponent product={product} />
        </div>
        <div className={cx('card-price', 'text-center')}>
          <span data-currency-value={product.price} className="money font-[600]">
            {product.price}
          </span>
        </div>
        {product.variants && (
          <div className={cx('card-variants', 'text-center')}>
            <ProductVariantComponent isCard={true} product={product} />
          </div>
        )}
      </div>
    </div>
  );
});

export default ProductCardComponent;
