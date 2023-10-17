import { Drawer } from '@mui/material';
import { styled } from '@mui/system';
import { drawerWidth } from '@utils/helper/navigation';
import { appBarHeight } from '@utils/helper/navigation';

export const StyledDrawerTemporary = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
    background: theme.palette.mode === 'light' ? 'var(--light)' : 'var(--dark)',
  },
}));

export const StyledDrawerPermanent = styled(Drawer)({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
    border: 'none',
    marginTop: `calc(${appBarHeight}px + 8px)`,
  },
});
