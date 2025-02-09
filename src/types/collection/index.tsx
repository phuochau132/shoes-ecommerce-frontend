import { ProductType } from '../product';

export type CollectionType = {
  products: ProductType[];
  description?: string;
  image?: string;
  handle: string;
  name: string;
  total: number;
};
