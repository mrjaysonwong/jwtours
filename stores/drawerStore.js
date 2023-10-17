import { create } from 'zustand';

export const useNavDrawerStore = create((set) => ({
  state: {
    left: false,
  },

  toggleNavDrawer: (anchor, open) => {
    set((state) => ({ state: { ...state, [anchor]: open } }));
  },
}));

export const useProfileDrawerStore = create((set) => ({
  state: {
    left: false,
    right: false,
  },

  toggleProfileDrawer: (anchor, open) => {
    set((state) => ({ state: { ...state, [anchor]: open } }));
  },
}));

export const useSettingsDrawerStore = create((set) => ({
  state: {
    right: false,
  },

  toggleDrawer: (anchor, open) => {
    set((state) => ({ state: { ...state, [anchor]: open } }));
  },
}));
