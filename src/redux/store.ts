import { configureStore } from '@reduxjs/toolkit';
import { TestAPi } from '../apis';
import rootReducer from './app/app.slice';

export const store = configureStore({
  reducer: {
    [TestAPi.reducerPath]: TestAPi.reducer,
    app: rootReducer.app
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(TestAPi.middleware)
});
