import { ProductFormatType } from '../cart';
import { UserType } from '../user';

export type OrderType = {
  id: number;
  user: UserType;
  cart_id: number;
  items: OrderItemType[];
  status: 'pending' | 'paid' | 'failed';
  payment_method: 'cash_on_delivery' | 'paypal';
  is_paid: boolean;
  total_amount: number;
  detail_address: string;
  note: string;
  city: string;
  postal_code: string;
  country: string;
  created_at: Date;
  updated_at: Date;
};
export type OrderItemType = {
  id: number;
  order_id: number;
  product: ProductFormatType;
  variant_id?: number;
  quantity: number;
  price: number;
};
