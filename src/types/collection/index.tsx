import { ProductType } from '../product';

export type CollectionType = {
  products: ProductType[];
  description?: string;
  image?: string;
  link: string;
  name: string;
};
