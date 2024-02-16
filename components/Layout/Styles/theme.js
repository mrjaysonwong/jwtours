import { createTheme } from '@mui/material';

export const GetDesignTokens = (mode, font) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: 'var(--light)',
            paper: 'var(--light)',
          },
        }
      : undefined),
  },
  typography: {
    fontFamily: `${font}, sans-serif`,
  },
});

export const customBreakpoints = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 540,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
