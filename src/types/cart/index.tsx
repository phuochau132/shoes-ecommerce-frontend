import { OptionType, ProductImageType, VariantType } from '../product';
import { ReviewType } from '../review';

export type CartType = {
  id: number;
  total_price: number;
  items: CartItemType[];
};
export type CartItemType = {
  id: number;
  quantity: number;
  price: number;
  product: ProductCartType;
};
export type ProductCartType = {
  id: number;
  title: string;
  price: string;
  images: ProductImageType[];
  quantity: number;
  description: string;
  handle: string;
  vendor: string;
  variant?: VariantNoFormatType;
  reviews: ReviewType[];
};
export type VariantNoFormatType = {
  price: string;
  id: number;
  stock: number;
  option_values: OptionValueNoFormatType[];
};

export type OptionValueNoFormatType = {
  id: number;
  option_value: OptionType;
  value: string;
};
export type cartState = {
  cart: { cart: CartType };
};
