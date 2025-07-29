'use client';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSliceReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
