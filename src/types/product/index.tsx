import { ReviewType } from '../review';

export type ProductType = {
  title: string;
  price: number;
  images: string[];
  description: string;
  link: string;
  vendor: string;
  variants?: VariantType[];
  reviews?: ReviewType[];
};

export type VariantType = {
  id: number;
  name: string;
  values: OptionType[];
  type?: string;
};

export type OptionType = {
  id: number;
  price: number;
  name: string;
};
