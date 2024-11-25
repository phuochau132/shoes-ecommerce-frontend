export type Product = {
  title: string;
  price: number;
  images: string[];
  description: string;
  link: string;
  vendor: string;
  variants?: Variant[];
};

export type Variant = {
  id: number;
  name: string;
  values: Option[];
  type?: string;
};

export type Option = {
  id: number;
  price: number;
  name: string;
};
