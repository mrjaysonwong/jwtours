import { createContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavWrapper, LogoWrapper } from './styled';
import { NavRoutes } from '@src/routes/navRoutes';
import SideMenuBar from '../SideMenuBar';
import ProfileMenuBar from '../ProfileMenuBar';
import { useDrawerStore } from 'stores/drawerStore';
import { useMenuStore } from 'stores/menuStore';

export const ProfileContext = createContext();

export function Logo() {
  return (
    <LogoWrapper>
      <Link href="/" passHref>
        <a>
          <Image
            src={'/assets/logo.png'}
            width={55}
            height={30}
            priority
            alt="logo"
          />
        </a>
      </Link>
    </LogoWrapper>
  );
}

export default function Navbar(props) {
  const { user } = props;
  const router = useRouter();
  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const { toggleDrawer } = useDrawerStore();
  const { handleMenu } = useMenuStore();

  const navLinks = NavRoutes.map((route) => {
    return (
      <li
        key={route.path}
        className={router.pathname === route.path ? 'active' : ''}
      >
        <Link href={route.path}>
          <a>
            <Typography variant="body2">{route.pathName}</Typography>
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
          background: isLightTheme ? 'var(--bg-color4)' : '',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open menu"
            onClick={() => toggleDrawer('left', true)}
            sx={{ display: { md: 'none' }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Logo />

          <NavWrapper sx={{ display: { xs: 'none', md: 'flex' } }}>
            <nav>
              <ul>{navLinks}</ul>
            </nav>
          </NavWrapper>

          <Box
            sx={{
              ml: 'auto',
              display: 'flex',
              cursor: 'pointer',
            }}
          >
            {user ? (
              <Avatar
                alt="avatar"
                src={user.image}
                referrerPolicy="no-referrer"
                onClick={
                  !mobile ? handleMenu : () => toggleDrawer('right2', true)
                }
              />
            ) : (
              <AccountCircleIcon
                onClick={
                  !mobile ? handleMenu : () => toggleDrawer('right2', true)
                }
                sx={{ width: 40, height: 40 }}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <SideMenuBar isLightTheme={isLightTheme} />

      <ProfileContext.Provider value={{ user, mobile }}>
        <ProfileMenuBar />
      </ProfileContext.Provider>
    </>
  );
}
