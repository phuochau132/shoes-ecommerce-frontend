import { ReviewType } from '../review';

export type ProductType = {
  flatMap(arg0: (product: any) => any[]): unknown;
  id: number;
  title: string;
  price: string;
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
  price: string;
  id: number;
  stock: number;
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
  value: string;
};
type VariantValue = {
  id: string | number;
  value: string;
};
type FormatVariantType = {
  name: string;
  values: VariantValue[];
  type: 'swatch' | 'rectangle' | string;
};
export type FormatVariantsType = Record<string, FormatVariantType>;
