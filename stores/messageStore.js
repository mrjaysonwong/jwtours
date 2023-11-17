import { create } from 'zustand';

export const useMessageStore = create((set) => ({
  success: {
    open: false,
    message: '',
    severity: 'success',
  },
  error: {
    open: false,
    message: '',
    severity: 'error',
  },
  alert: {
    open: false,
    message: '',
    severity: '',
  },
  handleApiMessage: (apiMessage, type = 'successs') => {
    set((state) => ({
      [type]: {
        ...state[type],
        open: true,
        message: apiMessage,
      },
    }));
  },

  handleAlertMessage: (apiMessage, severity) => {
    set((state) => ({
      alert: {
        ...state.alert,
        open: true,
        message: apiMessage,
        severity,
      },
    }));
  },

  handleOnClose: () => {
    set((state) => ({
      alert: {
        ...state.alert,
        open: false,
      },
    }));
  },
}));
