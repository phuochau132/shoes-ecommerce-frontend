import { Product } from '../product';

export type Collection = {
  products: Product[];
  title: string;
  description?: string;
  image?: string;
  link: string;
};
