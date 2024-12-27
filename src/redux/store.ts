import { configureStore } from '@reduxjs/toolkit';
import { AuthApi } from '@/apis';
import rootReducer from './slice/app/app.slice';
import userReducer from './slice/user/user.slice';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    app: rootReducer.app,
    user: userReducer.user
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware)
});
