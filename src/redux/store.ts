import { configureStore } from '@reduxjs/toolkit';
import { AuthApi, UserApi, CartApi, SearchApi, CollectionApi, ProductApi, OrderApi } from '@/apis';
import rootReducer from './slice/app/app.slice';
import userReducer from './slice/user/user.slice';
import cartReducer from './slice/cart/cart.slice';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [CollectionApi.reducerPath]: CollectionApi.reducer,
    [SearchApi.reducerPath]: SearchApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    app: rootReducer.app,
    user: userReducer.user,
    cart: cartReducer.cart
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthApi.middleware,
      UserApi.middleware,
      ProductApi.middleware,
      CollectionApi.middleware,
      SearchApi.middleware,
      CartApi.middleware,
      OrderApi.middleware
    )
});
