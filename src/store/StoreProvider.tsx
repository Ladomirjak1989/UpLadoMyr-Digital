'use client';
import React, { type ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import type { AppStore } from './store';
import { makeStore } from './store';

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
