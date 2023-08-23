import { create } from 'zustand';

export const useMenuStore = create((set) => ({
  anchorEl: null,
  handleMenu: (event) => {
    set({ anchorEl: event.currentTarget });
  },
  handleClose: () => {
    set({ anchorEl: null });
  },
}));
