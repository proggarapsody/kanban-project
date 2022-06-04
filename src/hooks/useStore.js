import { useContext } from 'react';
import { StoreContext } from './../index';

export function useStore() {
  return useContext(StoreContext);
}
