import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

export type fnAppDispatch = () => AppDispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: fnAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

