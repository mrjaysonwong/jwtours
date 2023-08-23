import { create } from 'zustand';

export const useDrawerStore = create((set) => ({
  state: {
    top: false,
    left: false,
    right: false,
    right2: false,
  },

  toggleDrawer: (anchor, open) => {
    set((state) => ({ state: { ...state, [anchor]: open } }));
  },
}));
