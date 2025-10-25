import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './converterSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer
  },
});
