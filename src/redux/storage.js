import { configureStore } from '@reduxjs/toolkit';

import { filterReducer } from './reducer';
import {Api } from '../serviceApi/Api';

export const storage = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(Api.middleware),
});