import { ReviewType } from '../review';

export type ProductType = {
  id: number;
  title: string;
  price: number;
  images: ProductImageType[];
  quantity?: number;
  description: string;
  handle: string;
  vendor: string;
  variants?: VariantType[];
  reviews: ReviewType[];
};

export type ProductImageType = {
  id: number;
  url: string;
  is_main: boolean;
};

export type VariantType = {
  id: number;
  options: OptionValueType[];
};

export type OptionValueType = {
  id: number;
  option: OptionType;
  value: string;
};

export type OptionType = {
  id: number;
  name: string;
  type: string;
};
