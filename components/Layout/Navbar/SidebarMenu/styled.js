import { Drawer, List } from '@mui/material';
import { styled } from '@mui/system';
import { appBarHeight } from '@utils/helper/navigation';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '100%',
    background: theme.palette.mode === 'light' ? 'var(--light)' : 'var(--dark)',
    marginTop: `calc(${appBarHeight}px + 0px)`,
    boxShadow: 'none',
  },

  '& .MuiModal-backdrop': {
    background: 'none',
  },
}));

export const StyledList = styled(List)({
  ' & .active': {
    background: 'var(--active-link-color-three)',
    borderRadius: '14px',
  },
});
