import React, { memo, CSSProperties, useCallback } from 'react';
import styles from './product-card.module.scss';
import { QuickViewIcon, WishListIcon } from '@/utils/icons';
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
import LoaderComponent from '@/components/commons/loader';

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

  const handleRedirectPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = event.currentTarget;
    const productId = target.dataset.productId;

    if (!productId) return;

    const storedItems = localStorage.getItem('recently-viewed');
    const recentlyViewed: string[] = storedItems ? JSON.parse(storedItems) : [];

    if (!recentlyViewed.includes(productId)) {
      recentlyViewed.push(productId);
    }
    localStorage.setItem('recently-viewed', JSON.stringify(recentlyViewed));
    window.location.href = target.href;
  };

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
        const response = await addWishlist({
          product_id: product.id
        }).unwrap();
        dispatch(
          setUser({
            ...user,
            wishlists: response.data.wishlists
          })
        );
        if (callback) {
          await callback();
        }
      } catch (error) {
        console.error(error);
      }
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
          const response = await removeWishlist({
            id: id
          }).unwrap();
          dispatch(
            setUser({
              ...user,
              wishlists: response.data.wishlists
            })
          );
          if (callback) {
            await callback();
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    [user]
  );
  console.log('', product.label);
  return (
    <div className={cx('card', className)}>
      <div className={cx('card-product', 'rounded-[10px]')}>
        <div className={cx('card-media')}>
          {product.images && product.images.length > 0 && (
            <>
              <img className={cx('first-image')} src={product.images[0].url} alt="" />
              <img className={cx('second-image')} src={product.images[1].url} alt="" />
            </>
          )}
          <a
            onClick={handleRedirectPage}
            data-product-id={product.id}
            href={`/products/${product.handle}`}
            className={cx('card-link', 'cursor-pointer')}
          ></a>
        </div>
        <div className={cx('card-action')}>
          <AddToCartComponent
            dataAddToCart={{
              productId: product.id,
              quantity: 1
            }}
            className="mt-[10px] p-[5px]"
            isCard={true}
            handleSelectionOption={handleQuickView}
            product={product}
            canPurchase={product && product.quantity ? product.quantity > 0 : false}
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
              'relative overflow-hidden p-[10px]',
              user && wishlist.length > 0 && 'is-activated'
            )}
          >
            {removeWishlistIsLoading && <LoaderComponent />}
            {addWishlistIsLoading && <LoaderComponent />}
            <WishListIcon className={`${cx('icon')} fade-in-up`} />
          </div>
          <div
            onClick={handleQuickView}
            className={cx('card__group-quickView', 'cart__group-action', 'mt-[10px] p-[10px]')}
          >
            <QuickViewIcon className={`${cx('icon')} fade-in-up`} />
          </div>
        </div>
        {product.label && (
          <div className={cx('card-badge')}>
            <div
              className={cx('sale-badge', 'capitalize')}
              style={{ backgroundColor: product.label === 'featured' ? 'rgb(50 94 167)' : 'red' }}
            >
              <span className={cx('text')}>{product.label}</span>
            </div>
          </div>
        )}
      </div>
      <div className={cx('card-information', 'mt-[10px]')}>
        <div className={cx('card-vendor', 'text-center')}>
          <a onClick={handleRedirectPage} title={product.vendor}>
            {product.vendor}
          </a>
        </div>
        <div className={cx('card-title', 'text-center')}>
          <a data-product-id={product.id} onClick={handleRedirectPage} href={`/products/${product.handle}`}>
            {product.title}
          </a>
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
            <ProductVariantComponent callback={() => {}} isCard={true} product={product} />
          </div>
        )}
      </div>
    </div>
  );
});

export default ProductCardComponent;
