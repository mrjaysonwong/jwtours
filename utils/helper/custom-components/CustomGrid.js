import { Grid, useMediaQuery } from '@mui/material';
import { customBreakpoints } from '@components/Layout/Styles/theme';

export const CustomGrid = (props) => {
  const { children } = props;
  const isScreenSmall = useMediaQuery(customBreakpoints.breakpoints.down('sm')); // You can adjust the breakpoint as needed

  return (
    <Grid item xs={isScreenSmall ? 12 : 6}>
      {children}
    </Grid>
  );
};
