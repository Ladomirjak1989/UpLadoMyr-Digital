import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store'; // Імпортуйте ваш store

// Використовуйте useDispatch з типізацією
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Використовуйте useSelector з автоматичною типізацією
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
