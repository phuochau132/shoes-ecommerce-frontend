import { ProductType } from '../product';

export type CollectionType = {
  products: ProductType[];
  title: string;
  description?: string;
  image?: string;
  link: string;
};
