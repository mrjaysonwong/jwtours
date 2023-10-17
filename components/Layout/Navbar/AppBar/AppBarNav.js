import { useContext } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavWrapper } from '../styled';
import Logo from '../Logo';
import AvatarProfile from '../AvatarProfile';
import { navRoutes } from '@src/routes/navRoutes';
import { useNavDrawerStore } from 'stores/drawerStore';
import SidebarNavMenu from '../SidebarMenu';
import { AppBarContext } from '..';
import { appBarHeight } from '@utils/helper/navigation';

export default function AppBarNav() {
  const { isLightTheme, router } = useContext(AppBarContext);
  const { state, toggleNavDrawer } = useNavDrawerStore();

  const navLinks = navRoutes.map((e, idx) => {
    return (
      <li key={idx} className={router.pathname === e.path ? 'active' : null}>
        <Link href={e.path}>
          <a>
            <Typography variant="body2">{e.pathName}</Typography>
          </a>
        </Link>
      </li>
    );
  });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          background: isLightTheme ? 'var(--light)' : '',
          minHeight: appBarHeight,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            aria-label="open menu"
            onClick={() => toggleNavDrawer('left', true)}
            sx={{ display: { md: 'none' } }}
          >
            {state.left ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <Logo />

          <NavWrapper sx={{ display: { xs: 'none', md: 'flex' } }}>
            <nav>
              <ul>{navLinks}</ul>
            </nav>
          </NavWrapper>

          <AvatarProfile />
        </Toolbar>
      </AppBar>

      <SidebarNavMenu />
    </>
  );
}
