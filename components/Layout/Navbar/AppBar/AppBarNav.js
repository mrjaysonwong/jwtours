import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavWrapper } from '../styled';
import Logo from '../Logo/Logo';
import AvatarProfile from '../AvatarProfile/AvatarProfile';
import { navRoutes } from '@src/routes/navRoutes';
import { useNavDrawerStore } from 'stores/drawerStore';
import SidebarNavMenu from '../SidebarMenu/SidebarMenu';
import { AppBarContext } from '../Navbar';
import { appBarHeight } from '@utils/helper/functions/navigation';

export default function AppBarNav() {
  const { isLightTheme, router } = useContext(AppBarContext);
  const { state, toggleNavDrawer } = useNavDrawerStore();
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrollPosition > 90 ? 1 : 0}
        sx={{
          // background: isLightTheme ? 'var(--light)' : '',
          background:
            state.left || scrollPosition > 90
              ? isLightTheme
                ? 'var(--light)'
                : ''
              : 'transparent',
          minHeight: appBarHeight,
          display: 'flex',
          justifyContent: 'center',
          backdropFilter: state.left ? '' : 'blur(0px)',
          transition: 'background 0.3s ease',
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
