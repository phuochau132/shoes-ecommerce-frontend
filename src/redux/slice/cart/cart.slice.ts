import { CartType } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const initialState: { cart: CartType | null } = {
  cart: null
};

export const cartSlice = createSlice({
  initialState: initialState,
  name: 'cart',
  reducers: {
    setCart: (state, action: PayloadAction<CartType>) => {
      const { items, ...rest } = action.payload;
      const reversedItems = [...items].reverse();
      state.cart = {
        ...rest,
        items: reversedItems
      };
    }
  }
});

export const { setCart } = cartSlice.actions;

const cartReducer = {
  cart: cartSlice.reducer
};

export default cartReducer;
