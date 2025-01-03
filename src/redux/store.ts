import { configureStore } from '@reduxjs/toolkit';
import { AuthApi, UserApi } from '@/apis';
import rootReducer from './slice/app/app.slice';
import userReducer from './slice/user/user.slice';
import ProductApi from '@/apis/product/product.api';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    app: rootReducer.app,
    user: userReducer.user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, UserApi.middleware, ProductApi.middleware)
});
