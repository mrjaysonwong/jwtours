const GetDesignTokens = (mode, font) => ({
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

export default GetDesignTokens;
