'use client';

import { atom, useAtom } from 'jotai';
import { DrawerPlacements } from '.';

type DrawerTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  placement?: DrawerPlacements;
  containerClassName?: string;
};

const drawerAtom = atom<DrawerTypes>({
  isOpen: false,
  view: null,
  placement: 'right',
  containerClassName: '',
});

export function useDrawer() {
  const [state, setState] = useAtom(drawerAtom);

  const openDrawer = ({
    view,
    placement,
    containerClassName,
  }: {
    view: React.ReactNode;
    placement: DrawerPlacements;
    containerClassName?: string;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      placement,
      containerClassName,
    });
  };

  const closeDrawer = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openDrawer,
    closeDrawer,
  };
}
