import Link from 'next/link';
import { useRouter } from 'next/router';
import { Typography, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavRoutes } from '@src/routes/navRoutes';
import { StyledToolbar, SideMenuWrapper } from './styled';
import { StyledDrawerList } from '@components/Layout/Styles/globals';
import { Logo } from '../Navbar';
import { useDrawerStore } from 'stores/drawerStore';

export default function SideMenuBar() {
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
      <StyledToolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="close menu"
          onClick={() => toggleDrawer(anchor, false)}
          sx={{ color: '#fff', mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Logo />
      </StyledToolbar>

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
      sx={{ position: 'relative' }}
    >
      {list('left')}
    </Drawer>
  );
}
