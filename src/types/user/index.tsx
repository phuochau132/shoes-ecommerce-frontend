import { ProductType } from '../product';

export type UserType = {
  id: string;
  full_name: string;
  email: string;
  address: Number;
  telephone: string;
  image: string;
  role: string;
  orders?: [];
  wishlists: WishlistType[];
};
export type WishlistType = {
  id: number;
  product_id: number;
};
export type WishlistDetailType = {
  id: number;
  product: ProductType;
};

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export type UserRegisterDto = {
  full_name?: string;
  telephone: string;
  address: string;
  email: string;
  role?: UserRole;
  password: string;
};
export type UserLoginDto = {
  email: string;
  password: string;
};
