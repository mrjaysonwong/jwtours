import Link from 'next/link';
import { useRouter } from 'next/router';
import { Typography, IconButton, Drawer, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavRoutes } from '@src/routes/navRoutes';
import { SideMenuWrapper } from './styled';
import { StyledDrawerList } from '../Styles/globals';
import { Logo } from '../Navbar';
import { useDrawerStore } from 'stores/drawerStore';

export default function SideMenuBar({ isLightTheme }) {
  const { state, toggleDrawer } = useDrawerStore();
  const router = useRouter();

  const navLinks = NavRoutes.map((route) => {
    return (
      <li
        key={route.path}
        className={router.pathname === route.path ? 'active' : ''}
      >
        <Link href={route.path}>
          <a onClick={() => toggleDrawer('left', false)}>
            <Typography variant="body2">{route.pathName}</Typography>
          </a>
        </Link>
      </li>
    );
  });

  const list = (anchor) => (
    <StyledDrawerList sx={{ p: 0, overflow: 'auto' }}>
      <Toolbar
        sx={{
          background: isLightTheme ? 'var(--color)' : 'var(--dark)',
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="close menu"
          onClick={() => toggleDrawer(anchor, false)}
          sx={{ color: '#fff', mr: 2 }}
        >
          <CloseIcon />
        </IconButton>

        <Logo />
      </Toolbar>

      <SideMenuWrapper>
        <nav>
          <ul>{navLinks}</ul>
        </nav>
      </SideMenuWrapper>
    </StyledDrawerList>
  );

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={state['left']}
      onClose={() => toggleDrawer('left', false)}
    >
      {list('left')}
    </Drawer>
  );
}
