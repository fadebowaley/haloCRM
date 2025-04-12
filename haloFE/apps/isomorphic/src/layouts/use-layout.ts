'use client';

import { LAYOUT_OPTIONS } from '@/config/enums';
import { atom, useAtom } from 'jotai';

// 1. set initial atom for isomorphic layout
const isomorphicLayoutAtom = atom(LAYOUT_OPTIONS.BERYLLIUM);

const isomorphicLayoutAtomWithPersistence = atom(
  (get) => get(isomorphicLayoutAtom),
  (get, set) => {
    set(isomorphicLayoutAtom, LAYOUT_OPTIONS.BERYLLIUM);
    localStorage.setItem('isomorphic-layout', LAYOUT_OPTIONS.BERYLLIUM);
  }
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
  const [layout] = useAtom(isomorphicLayoutAtomWithPersistence);
  return {
    layout,
    setLayout: () => {}, // No-op since only BERYLLIUM is used
  };
}
