import { create } from 'zustand';

export const useCityStore = create((set) => ({
  text: '',
  suggestions: [],
  setSuggestions: (data) => {
    set({ suggestions: data });
  },
  handleChange: (value) => {
    set({ text: value });
  },

}));
