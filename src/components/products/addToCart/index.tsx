import React, { memo, CSSProperties } from 'react';
import styles from './product-card.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { ProductType } from '@/types/product';
import { ButtonComponent } from '@/components/commons';
import { useAddMutation, useGetCartMutation } from '@/apis/cart/cart.api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCart } from '@/redux/slice/cart/cart.slice';

interface AddToCartComponentProps {
  style?: CSSProperties;
  className?: string;
  handleSelectionOption?: React.MouseEventHandler;
  isCard?: boolean;
  dataAddToCart: {
    productId: number;
    variantId?: number;
    quantity: number;
  };
  product: ProductType;
  isAllVariantsSelected?: boolean;
  canPurchase?: boolean;
}
const cx = bindClassNames(styles);
const AddToCartComponent: React.FC<AddToCartComponentProps> = memo(
  ({
    product,
    className,
    handleSelectionOption,
    isCard = false,
    dataAddToCart,
    isAllVariantsSelected,
    canPurchase
  }) => {
    const [addToCart, { isLoading }] = useAddMutation();
    const { user } = useSelector((state: any) => state.user);
    const [getCart] = useGetCartMutation();
    const dispatch = useDispatch<any>();

    const handleAddToCart = async () => {
      try {
        await addToCart({ data: dataAddToCart });
        if (document.querySelector('.cart-page')) {
          try {
            const response = await getCart({}).unwrap();
            dispatch(setCart(response.data));
          } catch (error) {}
        }
      } catch (error) {}
    };

    return (
      <div className={cx('add-to-cart-action', 'flex-1')}>
        {user ? (
          canPurchase ? (
            product.variants && product.variants.length > 0 ? (
              isCard ? (
                <ButtonComponent onClick={handleSelectionOption} animation={false} className={className && className}>
                  Select Options
                </ButtonComponent>
              ) : isAllVariantsSelected ? (
                <ButtonComponent
                  isLoading={isLoading}
                  onClick={handleAddToCart}
                  animation={false}
                  className={className && className}
                >
                  Add To Cart
                </ButtonComponent>
              ) : (
                <ButtonComponent disabled={true} className={className && className}>
                  Select option
                </ButtonComponent>
              )
            ) : (
              <ButtonComponent
                onClick={handleAddToCart}
                className={className && className}
                animation={false}
                isLoading={isLoading}
              >
                Add To Cart
              </ButtonComponent>
            )
          ) : (
            <ButtonComponent className={className && className} disabled={true}>
              Out Of Stock
            </ButtonComponent>
          )
        ) : (
          <ButtonComponent className={className && className} disabled={true}>
            Log in to purchase
          </ButtonComponent>
        )}
      </div>
    );
  }
);

export default AddToCartComponent;
